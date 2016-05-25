(function(){	
	$.fn.imgPreview = function(){

		var overlay = $('<div class="galleryOverlay"></div>'),
			slider = $('<div class="gallerySlider"></div>'),
			prevArrow = $('<a class="prevArrow"></a>'),
			nextArrow = $('<a class="nextArrow"></a>'),
			pageSpan = $('<span class="pagelimit"></span>'),
			close = $('<span class="galleryClose">X</span>'),
			overlayVisible = false;
		
		var placeholders = $([]),
			pl1=[],
			index = 0,
			items = this;

		// 附加标记的页面
		overlay.hide().appendTo('body');
		slider.appendTo(overlay);
		pageSpan.appendTo(overlay);
		// 为每个图像创建一个占位符
		items.each(function(){
			placeholders = placeholders.add($('<div class="placeholder"></div>'));
		});
	
		// 如果背景是点击，隐藏画廊

		slider.append(placeholders).on('click',function(e){
			hideOverlay();			
		});
		close.on('click',function(e){
			hideOverlay();			
		});
		// 监听触摸事件，滑动效果
		$('body').on('touchstart', '.gallerySlider img', function(e){
			
			var touch = e.originalEvent,
				startX = touch.changedTouches[0].pageX;
	
			slider.on('touchmove',function(e){
				
				e.preventDefault();
				
				touch = e.originalEvent.touches[0] ||
						e.originalEvent.changedTouches[0];
				
				if(touch.pageX - startX > 10){
					slider.off('touchmove');
					showPrevious();
				}
				else if (touch.pageX - startX < -10){
					slider.off('touchmove');
					showNext();
				}
				 
			});

			// 返回false,以防止形象高亮在Android 
			return false;
			
			
			
		}).on('touchend',function(){
			slider.off('touchmove');
		});
		
		// 监听单击缩略图
		
	
		items.on('click', function(e){
			e.preventDefault();
			// 图片集合中找到图片的位置
			
			index = items.index(this);
			showOverlay(index);
			showImage(index);
			
			calcPages(items,index);
			// 预加载下一个图像
			preload(index+1);
			
			// 预加载上一个图像
			preload(index-1);
			$(document).data("overlayVisible",true);
			e.cancelBubble = true;    //取消冒泡事件
			//e.stopPropagation(); 
					
		});
		
		
		
		function calcPages(items,index){
			pageSpan.text((index+1)+"/"+items.length);
		}
		// 如果浏览器不支持触摸,显示箭头
		if ( !("ontouchstart" in window) ){
			overlay.append(prevArrow).append(nextArrow);
			
			prevArrow.click(function(e){
				e.preventDefault();
				showPrevious();
			});
			
			nextArrow.click(function(e){
				e.preventDefault();
				showNext();
			});
		}
		
		// 监听键盘中的左右事件
		$(window).bind('keydown', function(e){
		
			if (e.keyCode == 37){
				showPrevious();
			}
			else if (e.keyCode==39){
				showNext();
			}
	
		});
		
		
		/* 私有函数 */
		
	
		function showOverlay(index){
			
			// 如果已经显示预览块,退出
			if (overlayVisible){
				return false;
			}
			
			// 显示层
			overlay.show();
			
			setTimeout(function(){
				// 触发动画
				overlay.addClass('visible');
			}, 100);
	
			// 图片的位置；
			offsetSlider(index);
			
			// 标记
			overlayVisible = true;
		}
	
		function hideOverlay(){
			// 如果没有显示预览块,退出
			
			if(!overlayVisible){
				return false;
			}
			
			// 隐藏预览
			overlay.hide().removeClass('visible');
			overlayVisible = false;
			$(document).data("overlayVisible",overlayVisible);
		}
	
		function offsetSlider(index){
			// 这将触发一个css过渡动画
			slider.css('left',(-index*100)+'%');
		}
	
		// 预加载图片的索引条目数组中
		function preload(index){
			setTimeout(function(){
				showImage(index);
			}, 1000);
		}
		
		// 在滑块显示图像
		function showImage(index){
	
			// 如果索引不在区间内返回false
			if(index < 0 || index >= items.length){
				return false;
			}
			
			// 用loadImage函数的href属性项
			loadImage(items.eq(index).attr('href'), function(){
				placeholders.eq(index).html(this);
			});
		}
		
		// 加载图像和执行一个回调函数,返回一个jQuery对象
		
		function loadImage(src, callback){
			var img = $('<img>').on('load', function(){
				callback.call(img);
			});
			
			img.attr('src',src);

		}
		
		function showNext(){
			
			// 如果这不是最后张图片
			if(index+1 < items.length){
				index++;
				offsetSlider(index);
				preload(index+1);
				calcPages(items,index);
			}
			else{
				// 触发弹性动画
				
				slider.addClass('rightSpring');
				setTimeout(function(){
					slider.removeClass('rightSpring');
				},500);
			}
		}
		
		function showPrevious(){
			
			// 如果这不是第一张图片
			if(index>0){
				index--;
				offsetSlider(index);
				preload(index-1);
				calcPages(items,index);
			}
			else{
				// 触发弹性动画
				slider.addClass('leftSpring');
				setTimeout(function(){
					slider.removeClass('leftSpring');
				},500);
			}
		}
	};
})(jQuery);