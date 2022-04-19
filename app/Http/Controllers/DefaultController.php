<?php

namespace App\Http\Controllers;

use App\Http\Resources\CollectionOptionsResource;
use App\Http\Resources\ProductOptionsResource;
use App\Models\Collection;
use App\Models\Product;
use App\Models\RadeemSetting;
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

    public function getRadeemSetting()
    {
        $radeem_setting = RadeemSetting::first();
        return response()->json([
            'success' => true,
            'message' => 'Radeem settings retrieved successfully!',
            'data' => $radeem_setting,
        ]);
    }

    public function setRadeemSetting(Request $request)
    {
        $radeem_setting = RadeemSetting::first();
        $radeem_setting->update([
            'min_radeem_value' => $request->min_radeem_value,
            'max_radeem_value' => $request->max_radeem_value,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Radeem settings saved successfully!',
            'data' => $radeem_setting,
        ]);
    }
}
