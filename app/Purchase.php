<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable=[
        'ePurchaseType',
        'iUserID',
        'iTotal',
        'iTotalPayment',
        'dAddedDateTime'
    ];
    protected $table = 'tbl_inapp_purchase';
    public $timestamps = false;
    protected $primaryKey = 'iPurchaseID';
}
