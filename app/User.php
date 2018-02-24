<?php

namespace App;

use Carbon\Carbon;
use Faker\Provider\DateTime;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use JWTAuth;
use Illuminate\Support\Facades\File;

class User extends Authenticatable
{
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'vFullname',
        'vFirstName',
        'vLastName',
        'vUserName',
        'vEmail',
        'dDob',
        'eGender',
        'tImage',
        'vFacebookID',
        'vInstagramID',
        'vInstagramUserName',
        'vInstagramProfileImage',
        'vVerifyDocumentImage',
        'isVerifiedByAdmin',
        'dVerifiedDateTime',
        'eIsPledged',
        'eShowVerifiedUserType',
        'dLatitude',
        'dLongitude',
        'eStatus',
        'isDeleted',
        'eNotification',
        'iAgeRangeTo',
        'iAgeRangeFrom',
        'iRadius',
        'eDiscoverMe',
        'eShowMe',
        'tAbout',
        'tCurrentWork',
        'vSchool',
        'tLikes',
        'tSelectedWork',
        'tSelectedSchool',
        'eNewMatchNotification',
        'eMessageNotification',
        'eMessageLikesNotification',
        'eSuperLikesNotification',
        'eAppVibrationNotification',
        'vDeviceType',
        'vHmac',
        'vDeviceToken',
        'dAddedDateTime',
        'dUpdatedDateTime'

    ];

    protected $attributes = [
        'vFullname' => '',
        'vFirstName'=> '',
        'vLastName'=> '',
        'vUserName'=> '',
        'vEmail'=> '',
        'eGender'=> 'Male',
        'tImage' => '',
        'vFacebookID' => '',
        'vInstagramID' => '',
        'vInstagramUserName' => '',
        'vInstagramProfileImage' => '',
        'vVerifyDocumentImage' => '',
        'isVerifiedByAdmin'=> 'No',
        'eIsPledged'  => 'No',
        'eShowVerifiedUserType' => 'All',
        'dLatitude' => 0,
        'dLongitude' => 0,
        'eStatus' => 'Active',
        'isDeleted' => '0',
        'eNotification' => 'Yes',
        'iAgeRangeTo' => 50,
        'iAgeRangeFrom' => 18,
        'iRadius' => 300,
        'eDiscoverMe' => 'Yes',
        'eShowMe' => 'Both',
        'tAbout' => '',
        'tCurrentWork' => '',
        'vSchool' => '',
        'tLikes' => '',
        'tSelectedWork' => '',
        'tSelectedSchool' => '',
        'eNewMatchNotification' => 'Yes',
        'eMessageNotification' => 'Yes',
        'eMessageLikesNotification' => 'Yes',
        'eSuperLikesNotification' => 'Yes',
        'eAppVibrationNotification' => 'Yes',
        'vDeviceType' => 'iOS',
        'vHmac' => '',
        'vDeviceToken' => '0'
    ];

    protected $appends = ['age','role','favorite','images','tImage'];
    protected $table = 'tbl_user';
    public $timestamps = false;
    protected $primaryKey = 'iUserID';

    public function images()
    {
        return $this->hasMany('\App\Images','iUserID');
    }

    public function likes()
    {
        return $this->hasMany('\App\Likes','iLikeUserID');
    }
    public function myLikes()
    {
        return $this->hasMany('\App\Likes','iUserID');
    }
    public function devices()
    {
        return $this->hasMany('\App\Device','iUserID');
    }
    public function hmacs()
    {
        return $this->hasMany('\App\HMac','iUserID');
    }
    public function myReports()
    {
        return $this->hasMany('\App\Report','iUserID');
    }
    public function reports()
    {
        return $this->hasMany('\App\Report','iReportUserID');
    }
    public function blocked()
    {
        return $this->hasMany('\App\Block','iUserID');
    }
    public function blockedMe()
    {
        return $this->hasMany('\App\Block','iBlockUserID');
    }
    public function purchases()
    {
        return $this->hasMany('\App\Purchase','iUserID');
    }
    public function notifications()
    {
        return $this->hasMany('\App\Notify','iNotifyUserID');
    }
    public function getImagesAttribute(){
        $images = $this->images()->get(['vImageName']);
        $images = $images->filter(function ($img){
            if (File::exists(public_path().'/user/'.$img->vImageName)){

                $img->vImageName = url('/user/'.$img->vImageName);
                return $img;
            }else{
                $img->vImageName =url('/images/apex-placeholder.jpg');
                return $img;
            }

        });
        return $images;
    }
    public function getTImageAttribute(){
        if (File::exists(public_path().'/user/'.$this->attributes['tImage'])){

            $this->attributes['tImage'] = url('/user/'.$this->attributes['tImage']);


        }else{
            $this->attributes['tImage'] =$this->attributes['tImage'];
        }
        return $this->attributes['tImage'];
    }

    /*seters for all atributes*/
    public function setVFullnameAttribute($param){
        if ($param == null){
            $this->attributes['vFullname'] = " ";
        }else{

            $this->attributes['vFullname'] = $param;
        }
    }
    public function setVFirstNameAttribute($param){
        if ($param == null){
            $this->attributes['vFirstName'] = " ";
        }else{

            $this->attributes['vFirstName'] = $param;
        }
    }
    public function setVLastNameAttribute($param){
        if ($param == null){
            $this->attributes['vLastName'] = " ";
        }else{
            $this->attributes['vLastName'] = $param;
        }

    }
    public function setVUserNameAttribute($param){
        if ($param == null){
            $this->attributes['vUserName'] = " ";
        }else{
            $this->attributes['vUserName'] = $param;
        }

    }
    public function setVEmailAttribute($param){

        if ($param == null){
            $this->attributes['vEmail'] = " ";
        }else{
            $this->attributes['vEmail'] = $param;
        }

    }
    public function setEGenderAttribute($param){
        if ($param == null){
            $this->attributes['eGender'] = "Male";
        }else{

            $this->attributes['eGender'] = ucfirst($param);
        }
    }
    public function setDDobAttribute($param){
        if ($param == null){
            $this->attributes['dDob'] = new Carbon('0001-00-00');
        }else{

            $this->attributes['dDob'] = $param;
        }
    }
    public function getAgeAttribute(){
        $from = Carbon::parse($this->attributes['dDob']);
        $to   = Carbon::now();
        return $from->diff($to)->y;
    }
    public function getRoleAttribute(){
        return "User";
    }
    public function getFavoriteAttribute(){
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user){
            return false;
        }else {
            $fav = Favorite::where('user_id', $user->iUserID)->where('favorite_id', $this->attributes['iUserID'])->get();
            if (sizeof($fav) > 0) {
                return true;
            }
            return false;
        }

    }
    public function isLiked($id){
        $isLiked = Likes::where('iUserID',$this->attributes['iUserID'])->where('iLikeUserID',$id)->get();
        if (sizeof($isLiked) > 0){
            return true;
        }
        return false;
    }

}
