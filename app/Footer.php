<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Footer extends Model
{
    protected $fillable=[
        'mail',
        'ios',
        'android',
        'facebook',
        'twitter',
        'youtube',
        'google',
        'tumbler',
        'content'
    ];
    protected $table = 'web_footer';
}
