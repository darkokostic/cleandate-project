<?php

namespace App\Http\Controllers;

use App\Chat;
use App\Events\ChatEvent;
use App\Http\Requests\RetriveMsgs;
use App\Http\Requests\SendMsg;
use App\Message;
use Illuminate\Http\Request;
use JWTAuth;

class ChatController extends Controller
{
    public function sendMSG(SendMsg $request){
        $user = JWTAuth::parseToken()->authenticate();
        $messages = Message::where([['user_id' ,'=',$user->iUserID],['receiver_id','=',$request->receiver_id]])
            ->orWhere([['user_id' ,'=',$request->receiver_id],['receiver_id','=',$user->iUserID]])->first();
        if ($messages){
            $message = new Message();
            $message->fill($request->all());
            $message->user_id = $user->iUserID;
            $message->chat_id = $messages->chat_id;
            if ($message->save()){
                event(new ChatEvent($user, $message, $message->chat_id));
                return response()->custom('200','Message sent',$message);
            }
            return response()->custom('400','Message not sent',null);
        }else{
            $chat = new Chat();
            $chat->save();
            $message = new Message();
            $message->fill($request->all());
            $message->user_id = $user->iUserID;
            $message->chat_id = $chat->id;
            if ($message->save()){

                event(new ChatEvent($user, $message, $message->chat_id));
                return response()->custom('200','Message sent',$message);
            }
            return response()->custom('400','Message not sent',null);
        }

    }
    public function getMessages(RetriveMsgs $request){
        $user = JWTAuth::parseToken()->authenticate();
        $messages = Message::where([['user_id' ,'=',$user->iUserID],['receiver_id','=',$request->receiver_id]])
            ->orWhere([['user_id' ,'=',$request->receiver_id],['receiver_id','=',$user->iUserID]])->get();
        return response()->custom('200','Messages retrived',$messages);
    }
    public function chat($chatId)
    {
        return view('chat')->with('chatId', $chatId);
    }
}
