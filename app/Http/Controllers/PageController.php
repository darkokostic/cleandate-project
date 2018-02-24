<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePageRequst;
use App\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function allPages(){
        $pages = Page::paginate(10);
        return response()->custom(200,'Pages generated',$pages);
    }
    public function editPage(UpdatePageRequst $request,$id){
        $page = Page::where('iPageID',$id)->first();
        $page->fill($request->all());
        if ($page->save()){
            return response()->custom(200,'Page edited',$page);
        }
        return response()->custom(400,'Something went wrong',null);
    }
    public function deletePage($id){
        $page = Page::where('iPageID',$id)->first();
        if ($page->delete()){
            return response()->custom(200,'Page deleted',null);
        }
        return response()->custom(400,'Something went wrong',null);
    }
}
