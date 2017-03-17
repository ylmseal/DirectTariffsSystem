/**
 *	Xenon Main
 *
 *	Theme by: www.laborator.co
 **/

var public_vars = public_vars || {};

;(function($, window, undefined){
	
	"use strict";
	
	$(document).ready(function()
	{	
		// Main Vars
		public_vars.$body                 = $("body");
		public_vars.$pageContainer        = public_vars.$body.find(".page-container");
		public_vars.$chat                 = public_vars.$pageContainer.find("#chat");
		public_vars.$sidebarMenu          = public_vars.$pageContainer.find('.sidebar-menu');
		public_vars.$mainMenu             = public_vars.$sidebarMenu.find('.main-menu');
		
		public_vars.$horizontalNavbar     = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$horizontalMenu       = public_vars.$horizontalNavbar.find('.navbar-nav');
		
		public_vars.$mainContent          = public_vars.$pageContainer.find('.main-content');
		public_vars.$mainFooter           = public_vars.$body.find('footer.main-footer');
		
		public_vars.$userInfoMenuHor      = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$userInfoMenu         = public_vars.$body.find('nav.navbar.user-info-navbar');
		
		public_vars.$settingsPane         = public_vars.$body.find('.settings-pane');
		public_vars.$settingsPaneIn       = public_vars.$settingsPane.find('.settings-pane-inner');
		
		public_vars.wheelPropagation      = true; // used in Main menu (sidebar)
		
		public_vars.$pageLoadingOverlay   = public_vars.$body.find('.page-loading-overlay');
		
		public_vars.defaultColorsPalette = ['#68b828','#7c38bc','#0e62c7','#fcd036','#4fcdfc','#00b19d','#ff6264','#f7aa47'];
		
		
		
		// Page Loading Overlay
		if(public_vars.$pageLoadingOverlay.length)
		{
			$(window).load(function()
			{
				public_vars.$pageLoadingOverlay.addClass('loaded');
			});
		}
		
		window.onerror = function()
		{
			// failsafe remove loading overlay
			public_vars.$pageLoadingOverlay.addClass('loaded');
		}
		
		
		// Setup Sidebar Menu
		setup_sidebar_menu();
		
		
		// Sticky Footer
		if(public_vars.$mainFooter.hasClass('sticky'))
		{
			stickFooterToBottom();
			$(window).on('xenon.resized', stickFooterToBottom);
		}
		
		
		// Perfect Scrollbar
		if($.isFunction($.fn.perfectScrollbar))
		{
			if(public_vars.$sidebarMenu.hasClass('fixed'))
				ps_init();
				
			$(".ps-scrollbar").each(function(i, el)
			{
				var $el = $(el);
				
				$el.perfectScrollbar({
					wheelPropagation: false
				});
			});
			
			
			// Chat Scrollbar
			var $chat_inner = public_vars.$pageContainer.find('#chat .chat-inner');
			
			if($chat_inner.parent().hasClass('fixed'))
				$chat_inner.css({maxHeight: $(window).height()}).perfectScrollbar();
				
				
			// User info opening dropdown trigger PS update
			$(".user-info-navbar .dropdown:has(.ps-scrollbar)").each(function(i, el)
			{
				var $scrollbar = $(this).find('.ps-scrollbar');
				
				$(this).on('click', '[data-toggle="dropdown"]', function(ev)
				{
					ev.preventDefault();
					
					setTimeout(function()
					{
						$scrollbar.perfectScrollbar('update');
					}, 1);
				});
			});
			
			
			// Scrollable
			$("div.scrollable").each(function(i, el)
			{
				var $this = $(el),
					max_height = parseInt(attrDefault($this, 'max-height', 200), 10);
				
				max_height = max_height < 0 ? 200 : max_height;
				
				$this.css({maxHeight: max_height}).perfectScrollbar({
					wheelPropagation: true
				});
			});
		}
		
		
		// User info search button
		var $uim_search_form = $(".user-info-menu .search-form, .nav.navbar-right .search-form");
		
		$uim_search_form.each(function(i, el)
		{
			var $uim_search_input = $(el).find('.form-control');
			
			$(el).on('click', '.btn', function(ev)
			{	
				if($uim_search_input.val().trim().length == 0)
				{
					jQuery(el).addClass('focused');
					setTimeout(function(){ $uim_search_input.focus(); }, 100);
					return false;
				}
			});
		
			$uim_search_input.on('blur', function()
			{
				jQuery(el).removeClass('focused');
			});
		});
		
		
		
		// Fixed Footer
		if(public_vars.$mainFooter.hasClass('fixed'))
		{
			public_vars.$mainContent.css({
				paddingBottom: public_vars.$mainFooter.outerHeight(true)
			});
		}
		
		
		
		// Go to to links
		$('body').on('click', 'a[rel="go-top"]', function(ev)
		{
			ev.preventDefault();
			
			var obj = {pos: $(window).scrollTop()};
			
			TweenLite.to(obj, .3, {pos: 0, ease:Power4.easeOut, onUpdate: function()
			{
				$(window).scrollTop(obj.pos);
			}});
		});
		
		
		
		
		// User info navbar equal heights
		if(public_vars.$userInfoMenu.length)
		{
			public_vars.$userInfoMenu.find('.user-info-menu > li').css({
				minHeight: public_vars.$userInfoMenu.outerHeight() - 1
			});
		}
		
		
		
		// Autosize
		if($.isFunction($.fn.autosize))
		{
			$(".autosize, .autogrow").autosize();
		}
		

		// Auto hidden breadcrumbs
		$(".breadcrumb.auto-hidden").each(function(i, el)
		{
			var $bc = $(el),
				$as = $bc.find('li a'),
				collapsed_width = $as.width(),
				expanded_width = 0;
			
			$as.each(function(i, el)
			{
				var $a = $(el);
				
				expanded_width = $a.outerWidth(true);
				$a.addClass('collapsed').width(expanded_width);
				
				$a.hover(function()
				{
					$a.removeClass('collapsed');
				},
				function()
				{
					$a.addClass('collapsed');
				});
			});
		});
		
		
		
		// Close Modal on Escape Keydown
		$(window).on('keydown', function(ev)
		{
			// Escape
			if(ev.keyCode == 27)
			{
				// Close opened modal
				if(public_vars.$body.hasClass('modal-open'))
					$(".modal-open .modal:visible").modal('hide');
			}
		});
		
		
		// Minimal Addon focus interaction
		$(".input-group.input-group-minimal:has(.form-control)").each(function(i, el)
		{
			var $this = $(el),
				$fc = $this.find('.form-control');
			
			$fc.on('focus', function()
			{
				$this.addClass('focused');
			}).on('blur', function()
			{
				$this.removeClass('focused');
			});
		});
		
		
		
		// Spinner
		$(".input-group.spinner").each(function(i, el)
		{
			var $ig = $(el),
				$dec = $ig.find('[data-type="decrement"]'),
				$inc = $ig.find('[data-type="increment"]'),
				$inp = $ig.find('.form-control'),
				
				step = attrDefault($ig, 'step', 1),
				min = attrDefault($ig, 'min', 0),
				max = attrDefault($ig, 'max', 0),
				umm = min < max;
				
			
			$dec.on('click', function(ev)
			{
				ev.preventDefault();

				var num = new Number($inp.val()) - step;
				
				if(umm && num <= min)
				{
					num = min;
				}
				
				$inp.val(num);
			});
			
			$inc.on('click', function(ev)
			{
				ev.preventDefault();

				var num = new Number($inp.val()) + step;
				
				if(umm && num >= max)
				{
					num = max;
				}
				
				$inp.val(num);
			});
		});
		
	});


	// Enable/Disable Resizable Event
	var wid = 0;
	
	$(window).resize(function() {
		clearTimeout(wid);
		wid = setTimeout(trigger_resizable, 200);
	});
	

})(jQuery, window);



// Sideber Menu Setup function
var sm_duration = .2,
	sm_transition_delay = 150;

function setup_sidebar_menu()
{
	if(public_vars.$sidebarMenu.length)
	{
		var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
			toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');
		
		$items_with_subs.filter('.active').addClass('expanded');
		
		$items_with_subs.each(function(i, el)
		{
			var $li = jQuery(el),
				$a = $li.children('a'),
				$sub = $li.children('ul');
			
			$li.addClass('has-sub');
			
			$a.on('click', function(ev)
			{
				ev.preventDefault();
				
				if(toggle_others)
				{
					sidebar_menu_close_items_siblings($li);
				}
				
				if($li.hasClass('expanded') || $li.hasClass('opened'))
					sidebar_menu_item_collapse($li, $sub);
				else
					sidebar_menu_item_expand($li, $sub);
			});
		});
	}
}

function sidebar_menu_item_expand($li, $sub)
{
	if($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed')))
		return;
		
	$li.addClass('expanded').data('is-busy', true);
	$sub.show();
	
	var $sub_items 	  = $sub.children(),
		sub_height	= $sub.outerHeight(),
		
		win_y			 = jQuery(window).height(),
		total_height	  = $li.outerHeight(),
		current_y		 = public_vars.$sidebarMenu.scrollTop(),
		item_max_y		= $li.position().top + current_y,
		fit_to_viewpport  = public_vars.$sidebarMenu.hasClass('fit-in-viewport');
		
	$sub_items.addClass('is-hidden');
	$sub.height(0);
	
	
	TweenMax.to($sub, sm_duration, {css: {height: sub_height}, onUpdate: ps_update, onComplete: function(){ 
		$sub.height(''); 
	}});
	
	var interval_1 = $li.data('sub_i_1'),
		interval_2 = $li.data('sub_i_2');
	
	window.clearTimeout(interval_1);
	
	interval_1 = setTimeout(function()
	{
		$sub_items.each(function(i, el)
		{
			var $sub_item = jQuery(el);
			
			$sub_item.addClass('is-shown');
		});
		
		var finish_on = sm_transition_delay * $sub_items.length,
			t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
			t_delay = parseFloat($sub_items.last().css('transition-delay'));
		
		if(t_duration && t_delay)
		{
			finish_on = (t_duration + t_delay) * 1000;
		}
		
		// In the end
		window.clearTimeout(interval_2);
	
		interval_2 = setTimeout(function()
		{
			$sub_items.removeClass('is-hidden is-shown');
			
		}, finish_on);
	
		
		$li.data('is-busy', false);
		
	}, 0);
	
	$li.data('sub_i_1', interval_1),
	$li.data('sub_i_2', interval_2);
}

function sidebar_menu_item_collapse($li, $sub)
{
	if($li.data('is-busy'))
		return;
	
	var $sub_items = $sub.children();
	
	$li.removeClass('expanded').data('is-busy', true);
	$sub_items.addClass('hidden-item');
	
	TweenMax.to($sub, sm_duration, {css: {height: 0}, onUpdate: ps_update, onComplete: function()
	{
		$li.data('is-busy', false).removeClass('opened');
		
		$sub.attr('style', '').hide();
		$sub_items.removeClass('hidden-item');
		
		$li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');
		
		ps_update(true);
	}});
}

function sidebar_menu_close_items_siblings($li)
{
	$li.siblings().not($li).filter('.expanded, .opened').each(function(i, el)
	{
		var $_li = jQuery(el),
			$_sub = $_li.children('ul');
		
		sidebar_menu_item_collapse($_li, $_sub);
	});
}





function stickFooterToBottom()
{
	public_vars.$mainFooter.add( public_vars.$mainContent ).add( public_vars.$sidebarMenu ).attr('style', '');
	
	if(isxs())
		return false;
		
	if(public_vars.$mainFooter.hasClass('sticky'))
	{
		var win_height				 = jQuery(window).height(),
			footer_height			= public_vars.$mainFooter.outerHeight(true),
			main_content_height	  = public_vars.$mainFooter.position().top + footer_height,
			main_content_height_only = main_content_height - footer_height,
			extra_height			 = public_vars.$horizontalNavbar.outerHeight();
		
		
		if(win_height > main_content_height - parseInt(public_vars.$mainFooter.css('marginTop'), 10))
		{
			public_vars.$mainFooter.css({
				marginTop: win_height - main_content_height - extra_height
			});
		}
	}
}


// Perfect scroll bar functions by Arlind Nushi
function ps_update(destroy_init)
{
	if(isxs())
		return;
		
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		if(public_vars.$sidebarMenu.hasClass('collapsed'))
		{
			return;
		}
		
		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');
		
		if(destroy_init)
		{
			ps_destroy();
			ps_init();
		}
	}
}


function ps_init()
{
	if(isxs())
		return;
		
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		if(public_vars.$sidebarMenu.hasClass('collapsed') || ! public_vars.$sidebarMenu.hasClass('fixed'))
		{
			return;
		}
		
		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
			wheelSpeed: 2,
			wheelPropagation: public_vars.wheelPropagation
		});
	}
}

function ps_destroy()
{
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy');
	}
}


// Element Attribute Helper
function attrDefault($el, data_var, default_val)
{
	if(typeof $el.data(data_var) != 'undefined')
	{
		return $el.data(data_var);
	}
	
	return default_val;
}
