<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable=[
        'iUserID',
        'vDeviceToken',
        'vDeviceType',
        'dAddedDateTime'
    ];
    protected $table = 'tbl_devicetoken';
    public $timestamps = false;
    protected $primaryKey = 'iTokenID';
}
