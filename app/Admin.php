<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $fillable=[
        'vFirstName',
        'vLastName',
        'vEmail',
        'vPassword',
        'eStatus',
        'dAddeddateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_admin';
    public $timestamps = false;
    protected $primaryKey = 'iAdminID';
    protected $appends = ['role'];

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

    public function setVEmailAttribute($param){

        if ($param == null){
            $this->attributes['vEmail'] = " ";
        }else{
            $this->attributes['vEmail'] = $param;
        }

    }

    public function setVPasswordAttribute($param){

        if ($param == null){
            $this->attributes['vPassword'] = " ";
        }else{
            $this->attributes['vPassword'] = md5($param);
        }

    }

    public function checkPassword($param){
        if (md5($param) == $this->attributes['vPassword']){
            return true;
        }
        return false;

    }
    public function setEStatusAttribute($param){

        if ($param == null){
            $this->attributes['eStatus'] = "Active";
        }else{
            $this->attributes['eStatus'] =$param;
        }

    }

    public function setDAddeddateTimeAttribute($param){

        if ($param == null){
            $this->attributes['dAddeddateTime'] = Carbon::now();
        }else{
            $this->attributes['dAddeddateTime'] =$param;
        }

    }

    public function setDUpdatedDateTimeAttribute($param){

        if ($param == null){
            $this->attributes['dUpdatedDateTime'] = Carbon::now();
        }else{
            $this->attributes['dUpdatedDateTime'] =$param;
        }

    }
    public function getRoleAttribute(){
        return "Admin";
    }

}
