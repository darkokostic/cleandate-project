<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keys extends Model
{
    protected $fillable=[
        'key',
        'level',
        'ignore_limits',
        'is_private_key',
        'ip_addresses',
        'date_created'
    ];
    protected $table = 'keys';
    public $timestamps = false;
}
