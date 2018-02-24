<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Favorite;
use App\Http\Requests\AddToFavoriteRequest;
use App\Http\Requests\ContactUsRequest;
use App\Http\Requests\RateUserRequest;
use App\Http\Requests\UserImagesRequest;
use App\Http\Requests\UserSearchRequest;
use App\Images;
use App\Likes;
use App\User;
use App\UserOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use JWTAuth;
use Socialite;
use Illuminate\Support\Facades\Mail;
use App\Helpers\FileHandler;
use Stripe\Stripe;
use Stripe\StripeObject;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('iUserID',21)->first();
        $token = JWTAuth::fromUser($user);
        return response()->json( $token );
    }
    public function redirectToProviderFacebook()
    {
        return Socialite::driver('facebook')->fields([
           'first_name', 'last_name', 'email', 'gender', 'birthday'
       ])->scopes([
           'email', 'user_birthday'
       ])->redirect();
    }

    /**
     * Obtain the user information from Facebook.
     *
     * @return Response
     */
    public function handleProviderCallbackFacebook()
    {
        $fbUser = Socialite::driver('facebook')->fields([
           'first_name', 'last_name', 'email', 'gender', 'birthday'
       ])->user();
        $user = User::where('vFacebookID',$fbUser->id)->first();

        if ($user){
            if ($user->isDeleted == 1){
                return redirect()->to('/#!/user/member');
            }else{
                $token = JWTAuth::fromUser($user);
                //return $token;
                return redirect()->to('/#!/user/member')->withCookie(cookie('user', $token, 240, null,  null,  false, false, false,  null));

            }
        }else{
            $user = new User();
            $name = explode(' ',$fbUser->getName());
            $user->vFirstName = utf8_decode($fbUser->user['first_name']);
            $user->vLastName = utf8_decode($fbUser->user['last_name']);
            $user->vFacebookID = $fbUser->id;
            $user->vFullname= utf8_decode($fbUser->user['first_name'] . " ". $fbUser->user['last_name']);
            $user->vUserName = utf8_decode($fbUser->nickname);
            $user->vEmail = $fbUser->email;
            $user->tImage = $fbUser->avatar;
            $user->eGender = $fbUser->user['gender'];
            $user->dDob = new Carbon($fbUser->user['birthday']);
            $user->dVerifiedDateTime = Carbon::parse('0000-01-01 00:00:00');
            $user->dAddedDateTime = Carbon::now();
            $user->dUpdatedDateTime = Carbon::now();
            $user->save();
            $token = JWTAuth::fromUser($user);
            return redirect()->to('/#!/user/member')->withCookie(cookie('user', $token, 240, null,  null,  false, false, false,  null));
        }


    }
    public function newestMembers(){
        $users = User::where('eDiscoverMe','Yes')->orderBy('dAddedDateTime', 'desc')->simplePaginate(10);

        return response()->custom(200,'Newest members generated',$users);
    }
    public function getMember($id){

        $logedInUser = JWTAuth::parseToken()->authenticate();
        if($logedInUser){
            $lat = $logedInUser->dLatitude;
        $lng = $logedInUser->dLongitude;
        $user = User::where('iUserID',$id)->select(DB::raw('*, ( 3959 * acos( cos( radians(' . $lat . ') ) * cos( radians( dLatitude ) ) * cos( radians( dLongitude ) - radians(' . $lng . ') ) + sin( radians(' . $lat . ') ) * sin( radians(dLatitude) ) ) ) AS distance'))
            ->orderBy('distance')->first();
        }else{
            $user = User::where('iUserID',$id)->first();
        }

        
        if ($user){
            $matches = Likes::where('iUserID',$id)->where('eType','Like')->get();
            $matches = $matches->filter(function ($likedUser) use ($user){
               $likeTolike = Likes::where('iUserID',$likedUser->iLikeUserID)->where('iLikeUserID',$user->iUserID)->where('eType','Like')->first();
               if ($likeTolike){
                    return $likedUser;
                }
            })->pluck('user');
            $user->matches = $matches;
            return response()->custom(200,'Member generated',$user);
        }
        return response()->custom(404,'Member not found',null);
    }
    public function notifications(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        return response()->custom(200,'Notifications retrived',$user->notifications);

    }
    public function self(){
        $user = JWTAuth::parseToken()->authenticate();
        return response()->custom(200,'Member generated',$user);
    }
    public function isVerifiedByAdmin(){
        $users = User::where('isVerifiedByAdmin','Yes')->get();
        if ($users){
            return response()->custom(200,'Verified users generated',$users);
        }
        return response()->custom(404,'No verified users',$users);
    }
    public function updateUser(Request $request,$id){
        $user = JWTAuth::parseToken()->authenticate();
        $user->fill($request->all());

        if ($user->save()){
            return response()->custom(200,'User updated',$user);
        }
        return response()->custom(400,'User update failed',$user);
    }
    public function searchMembers(UserSearchRequest $request){
        $users = User::where('isDeleted','0')->where('vFullname', 'like', '%' . $request->search_key . '%')->get();
        if (sizeof($users) > 0){
            return response()->custom(200,'Users retrived',$users);
        }else{
            return response()->custom(404,'User not found',null);
        }
    }
    public function delete(){
        $user = JWTAuth::parseToken()->authenticate();
        $user->isDeleted = "1";
        if ($user->save()){
            return response()->custom(200,'Users deleted',null);
        }
        return response()->custom(400,'User error ',null);
    }
    public function contactUs(ContactUsRequest $request){
        $mail= Mail::send('email.contact', ['email' => $request->email,'msg' => $request->message], function ($m) use ($request) {
            $m->from($request->email, $request->name);

            $m->to('aleksandarjovanovic996@yahoo.com')->subject('Cotact');
        });
        return response()->custom(200, 'Email sent!', null);
    }
    public function closestMember(){
        $user = JWTAuth::parseToken()->authenticate();
        $lat = $user->dLatitude;
        $lng = $user->dLongitude;
        $returnUser = User::where('iUserID','!=',$user->iUserID)->select(DB::raw('*, ( 3959 * acos( cos( radians(' . $lat . ') ) * cos( radians( dLatitude ) ) * cos( radians( dLongitude ) - radians(' . $lng . ') ) + sin( radians(' . $lat . ') ) * sin( radians(dLatitude) ) ) ) AS distance'))
            ->orderBy('distance')->first();
        return response()->custom(200, 'User generated', $returnUser);
    }
    public function userListByNotifications(){
        $user = JWTAuth::parseToken()->authenticate();
        $lat = $user->dLatitude;
        $lng = $user->dLongitude;

        $users = User::where('iUserID','!=',$user->iUserID)->where('isDeleted','0')->where('eDiscoverMe','Yes')->select(DB::raw('*, ( 3959 * acos( cos( radians(' . $lat . ') ) * cos( radians( dLatitude ) ) * cos( radians( dLongitude ) - radians(' . $lng . ') ) + sin( radians(' . $lat . ') ) * sin( radians(dLatitude) ) ) ) AS distance'))
            ->orderBy('distance')->get();
        $users = $users->filter(function ($search) use ($user){
               if ($search->distance <= $user->iRadius){
                   return $search;
               }
            });
        if ($user->eShowVerifiedUserType == 'Clean'){
            $users = $users->filter(function ($user){
               if ($user->isVerifiedByAdmin == "Yes"){
                   return $user;
               }
            });
        }
        if ($user->eShowMe == "Male"){
            $users = $users->filter(function ($user){
                if ($user->eGender == "Male"){
                    return $user;
                }
            });
        }else if($user->eShowMe == "Female"){
            $users = $users->filter(function ($user){
                if ($user->eGender == "Female"){
                    return $user;
                }
            });
        }
        $users = $users->filter(function ($search) use ($user){
            if ($search->age >= $user->iAgeRangeFrom && $search->age <= $user->iAgeRangeTo){
                return $search;
            }
        });
        $users = $users->filter(function ($search) use ($user){
            if (! $user->isLiked($search->iUserID)){
                return $search;
            }
        });

        return response()->custom(200, 'Users generated', $users);
    }
    public function featuredUsers(){
        $user = JWTAuth::parseToken()->authenticate();
        $users = User::where('iUserID','!=',$user->iUserID)->where('isVerifiedByAdmin','Yes')->orderBy('dVerifiedDateTime','desc')->take(10)->get();
        return response()->custom(200, 'Users generated', $users);
    }
    public function rateUser(RateUserRequest $request){
        $user = JWTAuth::parseToken()->authenticate();
        $like = Likes::where('iUserID',$user->iUserID)->where('iLikeUserID',$request->user_id)->get();
        if (sizeof($like) > 0){
            return response()->custom(200, 'User already rated', null);
        }else{
            $newLike = new Likes();
            $newLike->iUserID = $user->iUserID;
            $newLike->iLikeUserID = $request->user_id;
            $newLike->eType = $request->type;
            $newLike->dAddedDateTime = Carbon::now();
            $newLike->dUpdatedDateTime = Carbon::now();
            if ($newLike->save()){
                return response()->custom(200, 'User rated', null);
            }
        }
        return response()->custom(400, 'Something went wrong', null);
    }
    public function userList(){
        $users = User::where('dAddedDateTime','!=',null)->get();
        return response()->custom(200, 'Users generated', $users);

    }
    public function allUsers(){
        $users = User::all();
        return response()->custom(200, 'Users generated', $users);
    }
    public function addToFavorite(AddToFavoriteRequest $request){
        $user = JWTAuth::parseToken()->authenticate();
        $favorite = new Favorite();
        $favorite->user_id = $user->iUserID;
        $favorite->favorite_id = $request->user_id;
        if ($favorite->save()){

            return response()->custom(200, 'Users added to favorite', null);
        }

        return response()->custom(400, 'Favorite failed', null);
    }
    public function addUserImages(UserImagesRequest $request){
        $fileHandler = new FileHandler;
        $user = JWTAuth::parseToken()->authenticate();
        $orederImages = Images::where('iUserID',$user->iUserID)->orderBy('iOrder','desc')->get();
        $order = 0;
        if (sizeof($orederImages) > 0){
            $order = $orederImages[0]->iOrder +1;
        }
        foreach ($request->images as $image){
            $destinationPath =  'user';
            $extension = $image->getClientOriginalExtension();
            $fileName =  $order."_".$user->iUserID.'_'.$user->vFirstName.'_'.$user->vLastName.'_' . rand(11111, 99999) ;
            $fileHandler->uploadPath( $destinationPath.'/' )->addFile( $fileName,$image );
            $order++;
            $url = $destinationPath . "/" . $fileName;
            $image = new Images();
            $image->iUserID = $user->iUserID;
            $image->vImageName = $fileName.'.'.$extension;
            $image->iOrder = $order;
            $image->dAddedDateTime = Carbon::now();
            $image->dUpdatedDateTime = Carbon::now();
            $image->save();

        }
        return response()->custom(200, 'Users added to favorite', $user);
    }
    public function editAvater(Request $request){
        $fileHandler = new FileHandler;
        $user = JWTAuth::parseToken()->authenticate();
        $image = $request->image;
        $destinationPath =  'user';
        $extension = $image->getClientOriginalExtension();
        $fileName =  $user->iUserID.'_'.$user->vFirstName.'_'.$user->vLastName.'_' . rand(11111, 99999) ;
        $fileHandler->uploadPath( $destinationPath.'/' )->addFile( $fileName,$image );
        $url =  $fileName.'.'. $extension;
        $user->tImage = $url;
        $user->save();

        return response()->custom(200, 'Users added to favorite', $user);
    }
    public function checkout(Request $request){
        $order = new UserOrder();
        $order->fill($request->all());
        $order->birthday = new Carbon($request->birthday);
        $order->status = "Pending";
        if ($order->save()){
            return response()->custom(200, 'Order added', $order);
        }

        return response()->custom(400, 'Order failed', $order);
    }
    public function orderPost(Request $request){
        $input = $request->all();
        $token = $input['stripe'];
        $id = $input['stripe_user'];
        $order = UserOrder::find($id);

        try{
            $order->createAsStripeCustomer($token);
            $invoice = $order->invoiceFor('One Time Fee', 13900);
            return $order->downloadInvoice($invoice->id, [
                'vendor'  => 'Cleandate',
                'product' => 'Kit',
            ]);


        }catch (Exception $e) {
            //
        }


    }
    public function usersForChat(){
        $user = JWTAuth::parseToken()->authenticate();
        $people = Likes::where('iUserID',$user->iUserID)->get();
         $people = $people->filter(function ($liked) use ($user){
                $like = Likes::where('iUserID',$liked->iLikeUserID)->where('iLikeUserID',$user->iUserID)->get();
                if (sizeof($like) > 0){
                    return $like;
                }
            });
         $people = $people->pluck('user');

        return response()->custom(200, 'Users generated', $people);
    }
}
