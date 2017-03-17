<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;

/**
* 系统入口控制器
*/
class IndexController extends Controller
{
	/**
	 * 系统起始Action
	 * @param  Request $request [description]
	 * @return [type]           [description]
	 */
	public function index(Request $request)
	{
		if($request->isMethod('get')) {
			return view('index.index');
		}
	}
}
