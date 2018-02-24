<?php

namespace App\Http\Controllers;

use App\Category;
use App\FAQ;
use App\Http\Requests\AddCategoryRequest;
use App\Http\Requests\CreateFAQRequest;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function addFAQ(CreateFAQRequest $request){
        $faq = new FAQ();
        $faq->fill($request->all());
        if ($faq->save()){
            return response()->custom(200,'FAQ added',$faq);
        }

        return response()->custom(400,'FAQ create failed',null);
    }
    public function listFAQ(Request $request){
        $list = FAQ::paginate(10);
        return response()->custom(200,'FAQ generated',$list);
    }
    public function editFAQ(Request $request, $id){
        $faq = FAQ::find($id);
        $faq->fill($request->all());
        if ($faq->save()){
            return response()->custom(200,'FAQ edited',$faq);
        }

        return response()->custom(400,'FAQ edite failed',null);
    }
    public function deleteFAQ($id){
        $faq = FAQ::find($id);
        if ($faq->delete()){
            return response()->custom(200,'FAQ deleted',null);
        }

        return response()->custom(400,'FAQ delete failed',null);
    }
    public function addCategory(AddCategoryRequest $request){
        $category = new Category();
        $category->name = $request->name;
        if ($category->save()){
            return response()->custom(200,'Category created',$category);
        }

        return response()->custom(400,'Category create failed',null);
    }
    public function categoryList(){
        $category = Category::get();
        return response()->custom(200,'Category generated',$category);
    }
}
