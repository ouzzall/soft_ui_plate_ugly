<?php

namespace App\Http\Controllers;

use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CampaignController extends Controller
{

    public function checkCampaignData(Request $request)
    {
        $product_ids = collect($request->products)->pluck('product_id');
        $collection_ids = collect($request->collections)->pluck('product_id');
        $callback = function ($q) use ($product_ids, $collection_ids) {
            $q->where(function ($q) use ($product_ids, $collection_ids) {
                $q->whereIn('product_id', $product_ids)->orWhereIn('product_id', $collection_ids);
            });
        };
        $campaign = Campaign::whereHas('products', $callback)->with('products', $callback)->first();
        if (!$campaign) {
            return response()->json([
                'success' => false,
                'message' => 'All products are unique in this campaign',
                'data' => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Products already exists in some other campaign',
            'data' => $campaign
        ]);
    }
    public function saveCampaign(Request $request)
    {
        DB::beginTransaction();
        try {
            $campaign = Campaign::create($request->all());
            $campaign->products()->createMany($request->collections);
            $campaign->products()->createMany($request->products);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Campaign created successfully',
                'data' => $campaign,
            ], Response::HTTP_CREATED);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage(),
                'data' => null,
            ]);
        }
    }

    public function getCampaign($id)
    {
        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json([
                'success' => false,
                'message' => 'Campaign not found',
                'data' => null,
            ], Response::HTTP_NOT_FOUND);
        }
        $campaign = new CampaignResource($campaign);
        return response()->json([
            'success' => true,
            'message' => 'Campaign retrieved successfully',
            'data' => $campaign,
        ], Response::HTTP_OK);
    }

    public function updateCampaign(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $campaign = Campaign::find($id);
            if (!$campaign) {
                return response()->json([
                    'success' => false,
                    'message' => 'Campaign not found',
                    'data' => null,
                ], Response::HTTP_NOT_FOUND);
            }
            $campaign->update($request->all());

            $collections = collect($request->collections);
            $collection_ids = $collections->pluck('product_id');
            $campaign->products()->whereNotIn('product_id', $collection_ids)->where('type', 'collection')->delete();
            $collections->map(function ($value) use ($campaign) {
                $campaign->products()->updateOrCreate([
                    'product_id' => $value['product_id'],
                    'campaign_id' => $campaign->id,
                    'type' => $value['type']
                ], $value);
            });

            $products = collect($request->products);
            $product_ids = $products->pluck('product_id');
            $campaign->products()->whereNotIn('product_id', $product_ids)->where('type', 'product')->delete();
            $products->map(function ($value) use ($campaign) {
                $campaign->products()->updateOrCreate([
                    'product_id' => $value['product_id'],
                    'campaign_id' => $campaign->id,
                    'type' => $value['type']
                ], $value);
            });
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Campaign updated successfully',
                'data' => $campaign,
            ], Response::HTTP_CREATED);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage(),
                'data' => null,
            ]);
        }
    }

    public function getCampaigns(Request $request)
    {
        $campaigns = Campaign::query();
        $campaigns->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $campaigns->when($request->get('search'), function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('id', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('campaign_name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('loyalty_points', 'LIKE', '%' . $request->search . '%');
            });
        });
        $count = $campaigns->count();
        $campaigns->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $campaigns = $campaigns->orderBy('id', 'DESC')->get();
        $data = [
            'data' => $campaigns,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Campaigns retrieved successfully',
            'data' => $data,
        ]);
    }
}
