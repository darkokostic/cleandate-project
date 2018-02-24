<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BladeController extends Controller
{
    public function index()
    {
		$footer = DB::table('web_footer')->orderBy('created_at', 'desc')->get();
    	return view('welcome')->with('footer', $footer);
    }
}
