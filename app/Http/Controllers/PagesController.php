<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;

/**
* 系统登录太其它相关控制功能
*/
class PagesController extends Controller
{
	
	/**
	 * 系统登录
	 * @param  Request $request [description]
	 * @return [type]           [description]
	 */
	public function login(Request $request)
	{
		if($request->isMethod('get')) {
			return view('pages.login');
		}
	}
}