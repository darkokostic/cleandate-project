<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $fillable=[
        'iUserID',
        'iBlockUserID',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_block_user';
    public $timestamps = false;
    protected $primaryKey = 'iBlockID';
}
