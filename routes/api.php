<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('login','UserController@login');
Route::get('newest-members','UserController@newestMembers');
Route::get('member/{id}','UserController@getMember');
Route::get('notifications','UserController@notifications');
Route::get('self','UserController@self');
Route::get('verified-users','UserController@isVerifiedByAdmin');
Route::patch('user/update/{id}','UserController@updateUser');
Route::get('search-members','UserController@searchMembers');
Route::get('delete-acc','UserController@delete');
Route::post('contact-us','UserController@contactUs');
Route::get('closest-member','UserController@closestMember');
Route::get('review-users','UserController@userListByNotifications');
Route::get('featured-users','UserController@featuredUsers');
Route::post('rate-user','UserController@rateUser');
Route::post('user/favorite','UserController@addToFavorite');
Route::post('user/verify','VerifyController@submitVerify');
Route::post('user/image/upload','UserController@addUserImages');
Route::post('user/message/send','ChatController@sendMSG');
Route::post('user/message/list','ChatController@getMessages');
Route::post('user/checkout','UserController@checkout');
Route::get('user/user-list','UserController@allUsers');
Route::post('user/image/edit','UserController@editAvater');
Route::get('user/list/people','UserController@usersForChat');

Route::post('order-post', ['as'=>'order-post','uses'=>'UserController@orderPost']);
Route::get('chat/{chatId}', 'ChatController@chat');

/* ADMIN */
Route::get('dashboard','AdminController@generalStatistic');
Route::post('create/admin','AdminController@createAdmin');
Route::post('admin/login','AdminController@login');
Route::get('admin/list-admin','AdminController@adminList');
Route::patch('admin/update/{id}','AdminController@updateAdmin');
Route::delete('admin/delete/{id}','AdminController@deleteAdmin');
Route::get('admin/search','AdminController@adminSearch');
Route::post('admin/create/user','AdminController@createUser');
Route::get('admin/user-list','UserController@userList');
Route::get('admin/login/user/{id}','AdminController@loginAsUser');
Route::post('admin/user/search','AdminController@searchableUserList');
Route::post('admin/joind_users','AdminController@joindUsersByYear');

Route::get('admin/pages/list','PageController@allPages');
Route::patch('admin/pages/edit/{id}','PageController@editPage');
Route::delete('admin/pages/delete/{id}','PageController@deletePage');

Route::post('admin/footer/create','FooterController@addFooter');
Route::patch('admin/footer/edit/{id}','FooterController@editFooter');
Route::delete('admin/footer/delete/{id}','FooterController@deleteFooter');
Route::get('admin/footer-list','FooterController@listFooter');

Route::post('admin/faq/create','FAQController@addFAQ');
Route::patch('admin/faq/edit/{id}','FAQController@editFAQ');
Route::delete('admin/faq/delete/{id}','FAQController@deleteFAQ');
Route::get('admin/faq-list','FAQController@listFAQ');

Route::post('admin/category/create','FAQController@addCategory');
Route::get('admin/category-list','FAQController@categoryList');

Route::get('admin/verify-list','VerifyController@allRequests');
Route::get('admin/verify/approve/{id}','VerifyController@approve');
Route::get('admin/verify/denied/{id}','VerifyController@denied');

Route::get('admin/order/list','AdminController@orderList');
Route::delete('admin/order/delete/{id}','AdminController@orderDenied');
Route::get('admin/order/competed/{id}','AdminController@orderCompeted');
Route::get('admin/order/user/{id}','AdminController@checkUser');
