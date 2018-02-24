<?php

namespace App\Http\Controllers;

use App\Footer;
use App\Http\Requests\CreateFooter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FooterController extends Controller
{
    public function addFooter(CreateFooter $request){
        $footer = new Footer();
        $footer->fill($request->all());
        if ($footer->save()){
            return response()->custom(200,'Footer added',$footer);
        }

        return response()->custom(400,'Footer create failed',null);
    }
    public function editFooter(Request $request,$id){
        $footer = Footer::find($id);
        $footer->fill($request->all());
        if ($footer->save()){
            return response()->custom(200,'Footer updated',$footer);
        }

        return response()->custom(400,'Footer create failed',null);
    }
    public function listFooter(){
        $footer = DB::table('web_footer')->orderBy('created_at', 'desc')->first();
        return response()->custom(200,'Footer generated',$footer);
    }
    public function deleteFooter($id){
        $footer = Footer::find($id);
        if ($footer->delete()){
            return response()->custom(200,'Footer deleted',null);
        }
        return response()->custom(400,'Footer delete failed',null);

    }
}
