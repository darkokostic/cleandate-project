<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    protected $fillable=[
        'iUserID',
        'iLikeUserID',
        'eType',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_user_likes';
    public $timestamps = false;
    protected $primaryKey = 'iLikeID';

    protected $appends = ['user'];
    public function user(){
        return $this->hasOne('\App\User','iUserID','iLikeUserID');
    }
    public function getUserAttribute(){
        return $this->user()->first();
    }
}
