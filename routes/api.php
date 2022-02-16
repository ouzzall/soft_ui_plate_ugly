<?php

use App\Http\Controllers\OrderController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/test-post', function () {
    $shop = User::where('name', 'uglyfoods.myshopify.com')->first();
    $api = $shop->api()->graph('mutation sellingPlanGroupCreate($input: SellingPlanGroupInput!, $resources: SellingPlanGroupResourceInput!) {
        sellingPlanGroupCreate(input: $input, resources: $resources) {
          sellingPlanGroup {
            id
          }
          userErrors {
            field
            message
          }
        }
      }', request()->all());
    //   $api = $shop->api()->graph('mutation {
    //     sellingPlanGroupAddProducts(
    //       id: "gid://shopify/SellingPlanGroup/69795930"
    //       productIds: ["gid://shopify/Product/6694272041050"]
    //     ) {
    //       sellingPlanGroup {
    //         id
    //         productVariantCount
    //         productVariants(first: 10) {
    //           edges {
    //             node {
    //               id
    //               title
    //               inventoryQuantity
    //               product {
    //                 id
    //                 title
    //                 totalInventory
    //               }
    //             }
    //           }
    //         }
    //       }
    //       userErrors {
    //         field
    //         message
    //       }
    //     }
    //   }', request()->all());
    return $api;
});

Route::get('/test-get', function() {
    $shop = User::where('name', 'uglyfoods.myshopify.com')->first();
    $api = $shop->api()->graph('query { sellingPlanGroup(id: "gid://shopify/SellingPlanGroup/70680666") {
        id,
        products(first: 10) {
            edges {
                node {
                    id
                }
            }
        }
     } } ');
    return $api;
});

Route::get('getCustomerOrders', [OrderController::class, 'getCustomerOrders']);
