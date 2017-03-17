<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * 系统登录路由
 */
Route::match(['get', 'post'], '/', 'PagesController@login')->name('login');

/**
 * 系统登录默认页
 */
Route::get('/index', 'IndexController@index')->name('index');