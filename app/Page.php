<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable=[
        'vPageTitle',
        'tContent',
        'tCreatedAt',
        'tModifiedAt'
    ];
    protected $table = 'tbl_pagecontent';
    public $timestamps = false;
    protected $primaryKey = 'iPageID';
}
