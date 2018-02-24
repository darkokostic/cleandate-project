<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable=[
        'iUserID',
        'iReportUserID',
        'tDescription',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_report_abuse';
    public $timestamps = false;
    protected $primaryKey = 'iReportID';
}
