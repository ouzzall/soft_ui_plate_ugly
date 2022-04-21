<?php

namespace App\Http\Controllers;

use App\Http\Resources\CollectionOptionsResource;
use App\Http\Resources\ProductOptionsResource;
use App\Models\Collection;
use App\Models\Product;
use App\Models\RedeemSetting;
use Illuminate\Http\Request;

class DefaultController extends Controller
{
    public function getCollections()
    {
        $collections = Collection::all();
        $collections = CollectionOptionsResource::collection($collections);
        return response()->json([
            'success' => true,
            'message' => 'Collections retrieved successfully!',
            'data' => $collections,
        ]);
    }
    public function getProducts()
    {
        $products = Product::all();
        $products = ProductOptionsResource::collection($products);
        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully!',
            'data' => $products,
        ]);
    }

    public function getRedeemSetting()
    {
        $redeem_setting = RedeemSetting::first();
        return response()->json([
            'success' => true,
            'message' => 'Redeem settings retrieved successfully!',
            'data' => $redeem_setting,
        ]);
    }

    public function setRedeemSetting(Request $request)
    {
        $redeem_setting = RedeemSetting::first();
        $redeem_setting->update([
            'min_redeem_value' => $request->min_redeem_value,
            'max_redeem_value' => $request->max_redeem_value,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Redeem settings saved successfully!',
            'data' => $redeem_setting,
        ]);
    }
}
