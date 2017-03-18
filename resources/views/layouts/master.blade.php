<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="Xenon Boostrap Admin Panel" />
	<meta name="author" content="" />
	@yield('custem_meta')
	
	<title>秦快互联--运价直连系统</title>

	<link rel="stylesheet" href="{{Config::get('path.css')}}fonts/linecons/css/linecons.css">
	<link rel="stylesheet" href="{{Config::get('path.css')}}fonts/fontawesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="{{Config::get('path.css')}}bootstrap.css">
	<link rel="stylesheet" href="{{Config::get('path.css')}}xenon-core.css">
	@yield('top_script_css')



	<script src="{{Config::get('path.js')}}jquery-1.11.1.min.js"></script>

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
	
	
</head>
<body class="page-body">
	<div class="page-container">
		<div class="sidebar-menu toggle-others">
			<div class="sidebar-menu-inner">	
				<header class="logo-env">
					<!-- logo -->
					<div class="logo">
						<a href="/index" class="logo-expanded">
							<img src="{{Config::get('path.img')}}logo@2x.jpg" width="36" height="36" alt=""  class="img-responsive img-circle" />
						</a>
						<a href="/index" class="logo-collapsed">
							<img src="{{Config::get('path.img')}}logo@2x.jpg" width="36" height="36" alt="" class="img-responsive img-circle" />
						</a>
					</div>
					<!-- This will toggle the mobile menu and will be visible only on mobile devices -->
					<div class="mobile-menu-toggle visible-xs">
						<a href="#" data-toggle="user-info-menu">
							<i class="fa-bell-o"></i>
							<span class="badge badge-success">7</span>
						</a>
						<a href="#" data-toggle="mobile-menu">
							<i class="fa-bars"></i>
						</a>
					</div>
				</header>

				<ul id="main-menu" class="main-menu">
					<!-- add class "multiple-expanded" to allow multiple submenus to open -->
					<!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
					@foreach ($menus as $key => $value)
					<li class="{{$value['active']}}">
						<a href="#">
							<i class="{{$value['icon']}}"></i>
							<span class="title">{{$value['name']}}</span>
						</a>
						<ul>
						@foreach ($value['items'] as $k => $v)
							<li class="{{$v['active']}}">
								<a href="/{{$v['href']}}">
									<span class="title">{{$v['name']}}</span>
								</a>
							</li>
						@endforeach
						</ul>
					</li>
					@endforeach
				</ul>		
			</div>
		</div>
		
		<div class="main-content">
			<!-- User Info, Notifications and Menu Bar -->
			<nav class="navbar user-info-navbar" role="navigation">
				<!-- Left links for user info navbar -->
				<ul class="user-info-menu left-links list-inline list-unstyled">
					<li class="hidden-sm hidden-xs">
						<a href="#" data-toggle="sidebar">
							<i class="fa-bars"></i>
						</a>
					</li>
				</ul>
				<!-- Right links for user info navbar -->
				<ul class="user-info-menu right-links list-inline list-unstyled">
					
					<li class="dropdown user-profile">
						<a href="#" data-toggle="dropdown">
							<img src="assets/images/user-4.png" alt="user-image" class="img-circle img-inline userpic-32" width="28" />
							<span>
								Arlind Nushi
								<i class="fa-angle-down"></i>
							</span>
						</a>
						
						<ul class="dropdown-menu user-profile-menu list-unstyled">
							<li>
								<a href="#settings">
									<i class="fa-wrench"></i>
									设置密码
								</a>
							</li>
							<li class="last">
								<a href="">
									<i class="fa-lock"></i>
									退出登录
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<div class="page-title">
				
				<div class="title-env">
					<h1 class="title">Charts</h1>
					<p class="description">Data visualization widgets for your stats</p>
				</div>
				<div class="breadcrumb-env">
					<ol class="breadcrumb bc-1">
						<li>
							<a href="dashboard-1.html"><i class="fa-home"></i>Home</a>
						</li>
						<li class="active">
							<strong>Charts</strong>
						</li>
					</ol>			
				</div>
			</div>
			@yield('content')
		</div>
	</div>
	<!-- Bottom Scripts -->
	<script src="{{Config::get('path.js')}}bootstrap.min.js"></script>
	<script src="{{Config::get('path.js')}}TweenMax.min.js"></script>
	<script src="{{Config::get('path.js')}}resizeable.js"></script>
	<script src="{{Config::get('path.js')}}joinable.js"></script>
	<script src="{{Config::get('path.js')}}xenon-api.js"></script>
	<script src="{{Config::get('path.js')}}xenon-toggles.js"></script>
	<script src="{{Config::get('path.js')}}xenon-custom.js"></script>
	@yield('bottom_script')

</body>
</html>