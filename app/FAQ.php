<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    protected $fillable=[
        'category_id',
        'question',
        'answer'
    ];
    protected $table = 'web_faq';
    protected $appends =['category'];
    public function category(){
        return $this->hasOne('\App\Category','id','category_id');
    }
    public function getCategoryAttribute(){
        return $this->category()->pluck('name')->first();
    }
}
