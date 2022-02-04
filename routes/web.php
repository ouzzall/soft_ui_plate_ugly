<?php

use App\Http\Controllers\AuthController;
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

Route::get('/app-install', function(){
    return view('welcome');
})->middleware(['verify.shopify'])->name('home');


// redirect if authenticated
Route::view('/login', 'index')->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::view('/signup', 'index')->name('signup');


// auth middleware
Route::get('/', function(){
    return view('index');
})->name('index');
Route::get('/getSession', [AuthController::class, 'getSession']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::view('/{any}', 'index')->where('any', '.*')->name('index.view');

