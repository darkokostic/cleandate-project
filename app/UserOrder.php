<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Cashier\Billable;

class UserOrder extends Model
{
    use Billable;
    protected $fillable=[
        'user_id',
        'first_name',
        'last_name',
        'email',
        'address',
        'state',
        'city',
        'zipcode',
        'gender',
        'birthday',
        'phone',
        'note',
        'stripe_id',
        'card_brand',
        'card_last_four',
        'trial_ends_at',
        'status'
    ];
    protected $table = 'web_order';
    public function user(){
        return $this->hasOne('\App\User','iUserID','user_id');
    }
    public function getUserAttribute(){
        return $this->user()->first();
    }

}
