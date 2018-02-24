<?php

namespace App\Http\Controllers;

use App\Helpers\FileHandler;
use App\Verify;
use Carbon\Carbon;
use Illuminate\Http\Request;
use JWTAuth;

class VerifyController extends Controller
{
    public function submitVerify(Request $request){
        $fileHandler = new FileHandler;
        $image = $request->image;
        $destinationPath =  'verify';
        $extension = $image->getClientOriginalExtension();
        $fileName =  "UserVerify_"  . rand(11111, 99999) ;
        $fileHandler->uploadPath( $destinationPath.'/' )->addFile( $fileName,$image );
        $url = $destinationPath . "/" . $fileName.'.'. $extension;

        $user = JWTAuth::parseToken()->authenticate();
        $verify = new Verify();
        $verify->user_id = $user->iUserID;
        $verify->image = $url;
        $verify->status = 'Pending';
        if ($verify->save()){
            return response()->custom(200, 'Verify generated', $verify);
        }
        return response()->custom(400, 'Verify failed', null);
    }
    public function allRequests(){
        $verify = Verify::where('status','Pending')->get();
        if (sizeof($verify) > 0){
            return response()->custom(200, 'Verify generated', $verify);
        }
        return response()->custom(404, 'No requests found', null);
    }
    public function approve($id){
        $verify = Verify::find($id);
        $verify->status = 'Approved';
        if ($verify->save()){
            $user = $verify->user;
            $user->vVerifyDocumentImage = $verify->image;
            $user->isVerifiedByAdmin = "Yes";
            $user->dVerifiedDateTime = Carbon::now();
            $user->save();
            return response()->custom(200, 'Verify generated', $verify);
        }
        return response()->custom(400, 'Something went wrong', null);
    }
    public function denied($id){
        $verify = Verify::find($id);
        $verify->status = 'Denied';
        if ($verify->save()){
            $user = $verify->user;
            $user->vVerifyDocumentImage = " ";
            $user->isVerifiedByAdmin = "No";
            $user->dVerifiedDateTime = Carbon::parse('0000-01-00 00:00:00');;
            $user->save();
            return response()->custom(200, 'Verify generated', $verify);
        }
        return response()->custom(400, 'Something went wrong', null);
    }
}
