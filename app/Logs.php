<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    protected $fillable=[
        'uri',
        'method',
        'params',
        'api_key',
        'ip_address',
        'time',
        'rtime',
        'authorized'
    ];
    protected $table = 'logs';
    public $timestamps = false;
}
