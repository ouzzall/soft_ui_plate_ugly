<?php

use App\Http\Controllers\RedemptionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceRuleController;
use App\Http\Controllers\RulesController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Mail\SendRegistrationMail;
use App\Models\Product;
use App\Models\Role;
use App\Models\SyncDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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

Route::get('sync-data', function () {
    Artisan::call('sync:data');
    $product = Product::orderBy('last_synced', 'DESC')->first();
    Product::query()->update([
        'last_synced' => Carbon::now()
    ]);
    $product->refresh();
    $data = [
        'last_synced' => $product->last_synced,
    ];
    return response()->json([
        'success' => true,
        'message' => 'Data synced successfully!',
        'data' => $data,
    ]);
});

Route::get('last-synced', function () {
    $product = Product::orderBy('last_synced', 'DESC')->first();
    $data = [
        'last_synced' => $product->last_synced,
    ];
    return response()->json([
        'success' => true,
        'message' => 'Last data synced retrieved successfully!',
        'data' => $data,
    ]);
});
// redirect if authenticated
Route::middleware(['guest'])->group(function () {
    Route::view('/login', 'index')->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::view('/signup', 'index')->name('signup');
    Route::post('/signup', [AuthController::class, 'signup']);
});
// auth middleware
Route::middleware(['auth'])->group(function () {
    // general routes
    Route::get('/', function () {
        return view('index');
    })->name('index');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getTransactions', [TransactionController::class, 'getTransactions']);
    Route::get('/getDiscounts', [PriceRuleController::class, 'getDiscounts']);

    // admin routes
    Route::middleware('can:verify_role,"admin"')->group(function () {
        Route::get('/getDashboardData', [DashboardController::class, 'getDashboardData']);
        Route::post('/updateSetting', [DashboardController::class, 'updateSetting']);
        Route::get('/getUsers', [UserController::class, 'getUsers']);
        Route::get('/getCollections', [DefaultController::class, 'getCollections']);
        Route::get('/getProducts', [DefaultController::class, 'getProducts']);
        Route::post('/changeAuthority/{id}', [UserController::class, 'changeAuthority']);

        Route::get('/getCampaigns', [CampaignController::class, 'getCampaigns']);
        Route::get('/getCampaign/{id}', [CampaignController::class, 'getCampaign']);
        Route::post('/checkCampaignData', [CampaignController::class, 'checkCampaignData']);
        Route::post('/saveCampaign', [CampaignController::class, 'saveCampaign']);
        Route::put('/updateCampaign/{id}', [CampaignController::class, 'updateCampaign']);

        Route::get('/getOrders', [OrderController::class, 'getOrders']);
        Route::get('/getOrderDetail/{id}', [OrderController::class, 'getOrderDetail']);
        Route::post('/refund', [OrderController::class, 'refund']);

        Route::get('/getOrderRules', [RulesController::class, 'getOrderRules']);
        Route::post('/createOrderRule', [RulesController::class, 'saveOrderRule']);
        Route::post('/updateOrderRule/{id}', [RulesController::class, 'updateOrderRule']);

        Route::get('/getRedeemSetting', [DefaultController::class, 'getRedeemSetting']);
        Route::post('/setRedeemSetting', [DefaultController::class, 'setRedeemSetting']);

        Route::post('/add_plan', [RedemptionController::class, 'add_plan']);
        Route::get('/get_plans', [RedemptionController::class, 'get_plans']);
        Route::get('/delete_plan', [RedemptionController::class, 'delete_plan']);
        Route::get('/reward_manager_init', [RedemptionController::class, 'reward_manager_init']);
        Route::post('/add_reward', [RedemptionController::class, 'add_reward']);
        Route::get('/get_rewards', [RedemptionController::class, 'get_rewards']);
        Route::get('/delete_reward', [RedemptionController::class, 'delete_reward']);
        Route::get('get_plan_rewards', [RedemptionController::class, 'get_plan_rewards']);
    });
    Route::middleware('can:verify_role,"customer"')->group(function () {
        Route::post('/changePassword', [UserController::class, 'changePassword']);
        Route::get('/getProfile', [UserController::class, 'getProfile']);
        Route::post('/updateProfile', [UserController::class, 'updateProfile']);
        Route::post('/redeemPoints', [UserController::class, 'redeemPoints']);
        Route::get('/getUserCharts', [UserController::class, 'getUserCharts']);
        Route::get('/get_my_plan', [RedemptionController::class, 'get_my_plan']);
        Route::get('/make_discount_code', [RedemptionController::class, 'make_discount_code']);
    });
    Route::view('/{any}', 'index')->where('any', '^(?!webhook).*$')->name('index.view');
});
