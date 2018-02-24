<?php

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

Route::get('/', 'BladeController@index');
Route::get('test',function (){
    return view('stripe');
});

Route::get('login/facebook', 'UserController@redirectToProviderFacebook');
Route::get('login/facebook/callback', 'UserController@handleProviderCallbackFacebook');
