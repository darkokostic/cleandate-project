<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Facebook extends Model
{
    protected $fillable=[
        'iUserID',
        'vFacebookID',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_user_facebook_friends';
    public $timestamps = false;
    protected $primaryKey = 'iFBFriendID';
}
