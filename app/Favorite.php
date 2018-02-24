<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable=[
        'user_id',
        'favorite_id'
    ];
    protected $table = 'web_user_favorite';
}
