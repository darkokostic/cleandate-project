<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Instagram extends Model
{
    protected $fillable=[
        'iUserID',
        'vImageName',
        'vThumbImageName',
        'iOrder',
        'dUploadedDateTime',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_user_instagram_images';
    public $timestamps = false;
    protected $primaryKey = 'iInstaImageID';
}
