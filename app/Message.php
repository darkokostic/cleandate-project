<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable=[
        'user_id',
        'receiver_id',
        'message',

    ];
    protected $table = 'web_message';

    protected $appends = ['sender','receiver'];

    public function sender(){
        return $this->belongsTo('\App\User','user_id','iUserID');
    }
    public function receiver(){
        return $this->belongsTo('\App\User','receiver_id','iUserID');
    }
    public function getSenderAttribute(){
        return $this->sender()->first();
    }
    public function getReceiverAttribute(){
        return $this->receiver()->first();
    }

}
