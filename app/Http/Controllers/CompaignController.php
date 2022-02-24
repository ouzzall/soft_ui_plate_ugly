<?php

namespace App\Http\Controllers;

use App\Http\Resources\CampaignResource;
use App\Models\Compaign;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CompaignController extends Controller
{
    public function saveCompaign(Request $request)
    {
        DB::beginTransaction();
        try {
            $compaign = Compaign::create($request->all());
            $compaign->products()->createMany($request->collections);
            $compaign->products()->createMany($request->products);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Compaign created successfully',
                'data' => $compaign,
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
        $compaign = Compaign::find($id);
        if (!$compaign) {
            return response()->json([
                'success' => false,
                'message' => 'Compaign not found',
                'data' => null,
            ], Response::HTTP_NOT_FOUND);
        }
        $compaign = new CampaignResource($compaign);
        return response()->json([
            'success' => true,
            'message' => 'Compaign retrieved successfully',
            'data' => $compaign,
        ], Response::HTTP_OK);
    }

    public function updateCampaign(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $compaign = Compaign::find($id);
            if (!$compaign) {
                return response()->json([
                    'success' => false,
                    'message' => 'Compaign not found',
                    'data' => null,
                ], Response::HTTP_NOT_FOUND);
            }
            $compaign->update($request->all());

            $collections = collect($request->collections);
            $collection_ids = $collections->pluck('product_id');
            $compaign->products()->whereNotIn('product_id', $collection_ids)->where('type', 'collection')->delete();
            $collections->map(function ($value) use ($compaign) {
                $compaign->products()->updateOrCreate([
                    'product_id' => $value['product_id'],
                    'compaign_id' => $compaign->id,
                    'type' => $value['type']
                ], $value);
            });

            $products = collect($request->products);
            $product_ids = $collections->pluck('product_id');
            $compaign->products()->whereNotIn('product_id', $product_ids)->where('type', 'product')->delete();
            $products->map(function ($value) use ($compaign) {
                $compaign->products()->updateOrCreate([
                    'product_id' => $value['product_id'],
                    'compaign_id' => $compaign->id,
                    'type' => $value['type']
                ], $value);
            });
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Compaign updated successfully',
                'data' => $compaign,
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

    public function getCompaigns()
    {
        $compaigns = Compaign::all();
        return response()->json([
            'success' => true,
            'message' => 'Compaigns retrieved successfully',
            'data' => $compaigns,
        ]);
    }
}
