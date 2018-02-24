<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HMac extends Model
{
    protected $fillable=[
        'iUserID',
        'vHmac',
        'dtCreated'
    ];
    protected $table = 'tbl_hmac';
    public $timestamps = false;
    protected $primaryKey = 'iHmacID';
}
