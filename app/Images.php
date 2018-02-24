<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    protected $fillable=[
        'iUserID',
        'vImageName',
        'iOrder',
        'dAddedDateTime',
        'dUpdatedDateTime'
    ];
    protected $table = 'tbl_user_images';
    public $timestamps = false;
    protected $primaryKey = 'iImageID';
    public function user()
    {
        return $this->belongsTo('\App\User','iUserID');
    }
    public function setDAddedDateTimeAttribute($param){
        if ($param == null){
            $this->attributes['dAddedDateTime'] = Carbon::now();
        }else{

            $this->attributes['dAddedDateTime'] = $param;
        }
    }
    public function setDUpdatedDateTimeAttribute($param){
        if ($param == null){
            $this->attributes['dUpdatedDateTime'] = Carbon::now();
        }else{

            $this->attributes['dUpdatedDateTime'] = $param;
        }
    }
}
