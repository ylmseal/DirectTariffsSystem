<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Request;

/**
* Master视图数据组件
*/
class MasterComposers
{
	
	public function compose(View $view)
	{
		$menus = Config::get('menus');
		$href = Request::path();
		$exit = false;
		foreach ($menus as $key => $value) {
			$items = $value['items'];
			foreach ($items as $k => $v) {
				if($this->checkIsActive($v, $href)) {
					$menus[$key]['items'][$k]['active'] = 'active';
					$menus[$key]['active'] = 'active opened active';
					$exit = true;
					break;
				}
			}
			if($exit) break;
		}
		$view->with('menus', $menus);
	}

	/**
	 * 状判菜单是否为当前菜单
	 * @param  [type] $menus [description]
	 * @param  [type] $path  [description]
	 * @return [type]        [description]
	 */
	public function checkIsActive($menus, $path)
	{
		if($menus['href'] == $path) return true;
		return false;
	}
}