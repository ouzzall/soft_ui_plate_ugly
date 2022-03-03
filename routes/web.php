<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/app-install', function () {
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');
Route::get('/getSession', [AuthController::class, 'getSession']);


// redirect if authenticated
Route::middleware(['guest'])->group(function () {
    Route::view('/login', 'index')->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::view('/signup', 'index')->name('signup');
});
// auth middleware
Route::middleware(['auth'])->group(function () {
    // general routes
    Route::get('/', function () {
        return view('index');
    })->name('index');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getTransactions', [TransactionController::class, 'getTransactions']);

    // admin routes
    Route::middleware('can:verify_role,"admin"')->group(function () {
        Route::get('/getUsers', [UserController::class, 'getUsers']);
        Route::get('/getCollections', [DefaultController::class, 'getCollections']);
        Route::get('/getProducts', [DefaultController::class, 'getProducts']);

        Route::get('/getCampaigns', [CampaignController::class, 'getCampaigns']);
        Route::get('/getCampaign/{id}', [CampaignController::class, 'getCampaign']);
        Route::post('/checkCampaignData', [CampaignController::class, 'checkCampaignData']);
        Route::post('/saveCampaign', [CampaignController::class, 'saveCampaign']);
        Route::put('/updateCampaign/{id}', [CampaignController::class, 'updateCampaign']);

        Route::get('/getOrders', [OrderController::class, 'getOrders']);
        Route::get('/getOrderDetail/{id}', [OrderController::class, 'getOrderDetail']);
        Route::post('/refund', [OrderController::class, 'refund']);
    });
    Route::middleware('can:verify_role,"customer"')->group(function() {
        Route::get('/getProfile', [UserController::class, 'getProfile']);
        Route::post('/radeemPoints', [UserController::class, 'radeemPoints']);
    });
    Route::view('/{any}', 'index')->where('any', '^(?!webhook).*$')->name('index.view');
});
