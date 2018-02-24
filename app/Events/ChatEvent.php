<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatEvent implements ShouldBroadcast
{
    use SerializesModels;

    public $user, $message, $created_at,$receiver;
    protected  $chatId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $text, $chatId)
    {
        $this->message = $text;
        $this->created_at = date_format($text->created_at,"Y-m-d H:i:s");
        $this->user = $text->sender;
        $this->receiver = $text->receiver;
        $this->chatId = $chatId;

    }

    public function broadcastOn()
    {
        return ['chat-channel.*'];
    }
}
