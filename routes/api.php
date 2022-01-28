<?php

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

Route::post('/test', function(){
    $shop = auth()->user();
    return $shop;
    // $api = $shop->api()->graph('query {
    //     subscriptionContracts(first: 10) {
    //       edges {
    //         node {
    //           id
    //           createdAt
    //           status
    //           nextBillingDate
    //           customer {
    //             firstName
    //             lastName
    //           }
    //           billingPolicy {
    //             interval
    //             intervalCount
    //           }
    //         }
    //       }
    //     }
    //   }');
    //   return $api;
})->middleware(['verify.shopify']);
