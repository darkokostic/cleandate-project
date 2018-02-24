<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Verify extends Model
{

    protected $fillable=[
        'user_id',
        'image',
        'status'
    ];
    protected $table = 'web_verify';
    protected $appends = ['user'];
    public function user(){
        return $this->hasOne('\App\User','iUserID','user_id');
    }
    public function getUserAttribute(){
        return $this->user()->first();
    }

}
