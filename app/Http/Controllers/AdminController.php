<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Http\Requests\AdminSearchRequest;
use App\Http\Requests\CrateUserReguest;
use App\Http\Requests\CreateAdminRequest;
use App\Http\Requests\JoindUsersByYearRequest;
use App\Http\Requests\LoginAdminRequest;
use App\User;
use App\UserOrder;
use App\Verify;
use Carbon\Carbon;
use Faker\Provider\DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JWTAuth;

class AdminController extends Controller
{
    public function generalStatistic(){
        $ret = new \stdClass();
        $ret->totalUsers = User::all()->count();
        $ret->lastMonth =  User::where( DB::raw('MONTH(dAddedDateTime)'), '=', date('n') )->count();
        $ret->verified = User::where('isVerifiedByAdmin','Yes')->count();
        $ret->pennding = Verify::where('status','Pending')->count();
        return response()->custom(200, 'Statistic generated', $ret);
    }
    public function usersByYear(Request $request){

    }
    public function createAdmin(CreateAdminRequest $request){
        $admin = new Admin();
        $admin->fill($request->all());
        $admin->dAddeddateTime = null;
        $admin->dUpdatedDateTime = null;

        if ($admin->save()){
            return response()->custom(200, 'Admin created', $admin);
        }
        return response()->custom(400, 'Admin create failed!', null);
    }
    public function login(LoginAdminRequest $request){
        $user = Admin::where('vEmail',$request->vEmail)->where('vPassword',md5($request->vPassword))->first();
        if ($user){

            $token = JWTAuth::fromUser($user);
            $user->token = $token;
            return response()->custom(200, 'Admin logged in', $user);
        }
        return response()->custom(400, 'Admin login failed!', null);
    }
    public function adminList(){
        $admins = Admin::all();
        return response()->custom(200, 'Admin leged in', $admins);
    }

    public function updateAdmin(Request $request,$id){
        $admin = Admin::where('iAdminID',$id)->first();
        $admin->fill($request->all());

        if ($admin->save()){
            return response()->custom(200,'User updated',$admin);
        }
            return response()->custom(400,'User update failed',$admin);
    }
    public function deleteAdmin($id){
        $admin = Admin::where('iAdminID',$id)->first();

        if ($admin->delete()){
            return response()->custom(200,'Admin deleted',null);
        }
        return response()->custom(400,'Admin delete failed',null);
    }
    public function adminSearch(AdminSearchRequest $request){
        $admin = Admin::where('vFirstName', 'like', '%' . $request->search_key . '%')->orWhere('vLastName', 'like', '%' . $request->search_key . '%')
            ->orWhere('vEmail', 'like', '%' . $request->search_key . '%')->get();

            return response()->custom(200,'Admins generated',$admin);

    }
    public function createUser(CrateUserReguest $request){
        $user = new User();
        $user->fill($request->all());
        $user->vFullname = $user->vFirstName . " " . $user->vLastName;
        $user->dDob = new Carbon($request->dDob);
        $user->dVerifiedDateTime = Carbon::parse('0001-11-30 00:00:00');
        $user->dAddedDateTime = Carbon::now();
        $user->dUpdatedDateTime = Carbon::now();
        if($user->save()){
            return response()->custom(200,'User created',$user);
        }
        return response()->custom(400,'User create failed',null);
    }
    public function loginAsUser($id){
        $user = User::where('iUserID',$id)->first();
        $token = JWTAuth::fromUser($user);
        return redirect()->to('/#!/user/member')->withCookie(cookie('user', $token, 240, null,  null,  false, false, false,  null));

    }
    public function searchableUserList(Request $request){
        $users = DB::table('tbl_user');
        if ((isset($request->name)&& $request->name != "") && (isset($request->date)&& $request->date!= "")){
            $users = $users->where('vFullname', 'like', '%' . $request->name . '%')->whereBetween('dAddedDateTime',[Carbon::parse($request->date->from),Carbon::parse($request->date->to)]);
        }
        if(isset($request->name)&& $request->name != ""){
            $users = $users->where('vFullname', 'like', '%' . $request->name . '%');
        }
        if(isset($request->date)&& $request->date!= ""){
            $users = $users->whereBetween('dAddedDateTime',[$request->date->from,$request->date->to]);
        }
        if (isset($request->gender)&& $request->gender != ""){
            $users = $users->where('eGender', $request->gender );
        }
        if (isset($request->active)&& $request->active != ""){
            $users = $users->where('eStatus', $request->active );
        }
        $users = $users->paginate(10);
        return response()->custom(200,'User created',$users);
    }
    public function joindUsersByYear(JoindUsersByYearRequest $request){
        $users = User::where( DB::raw('YEAR(dAddedDateTime)'), '=', $request->year )
            ->get()->groupBy(function($val) {
                return Carbon::parse($val->dAddedDateTime)->format('m');
            });

        return response()->custom(200,'Data generated',$users);
    }
    public function orderList(){
        $orders = UserOrder::where('status','Pending')->get();
        return response()->custom(200,'Orders generated',$orders);
    }
    public function orderDenied($id){
        $order = UserOrder::find($id);
        $order->status = "Denied";
        if ($order->save()){
            return response()->custom(200,'Order updated',$order);
        }
        return response()->custom(400,'Order update failed',null);
    }
    public function orderCompeted($id){
        $order = UserOrder::find($id);
        $order->status = "Competed";
        if ($order->save()){
            return response()->custom(200,'Order updated',$order);
        }
        return response()->custom(400,'Order update failed',null);
    }
    public function checkUser($id){
        $order = UserOrder::where('user_id',$id)->get();
        if (sizeof($order) < 1 ){
            return response()->custom(200,'User can make order',null);
        }
        return response()->custom(400,'User cant make order',null);
    }

}
