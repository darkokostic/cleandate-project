<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    protected $fillable=[
        'iNotifyUserID',
        'vMessage',
        'vNotifyType',
        'vTitle',
        'iUserID',
        'eStatus',
        'dAddedDateTime',
        'dUpdatedDateTime',
    ];
    protected $table = 'tbl_notify';
    public $timestamps = false;
    protected $primaryKey = 'iNotifyID';
    protected $appends = ['user'];
    public function user(){
        return $this->hasOne('\App\User','iUserID');
    }
    public function getUserAttribute(){
        return $this->user()->get();
    }
}
