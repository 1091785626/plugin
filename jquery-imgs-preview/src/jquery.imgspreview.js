(function() {
	$.fn.imgsPreview = function(options) {
		//固有参数
		var rnd = Math.random().toString().replace('.', '');
		//参数
		var settings = $.extend({
			id: rnd, //弹出层ID
			event: event
		}, options);
		//共有
		var preventDefault = function(evnent) {
			event.stopPropagation();
			event.preventDefault();
		};
		//私有
		var _private = {
			init: function(obj) { //初始化
				this.overlay = $('<div class="imgs-preview-popup" id=' + 'imgs_preview_' + settings.id + '></div>');
				this.slider = $('<div class="imgs-slide"></div>');
				this.prevArrow = $('<a class="prevArrow"></a>');
				this.nextArrow = $('<a class="nextArrow"></a>');
				this.pageSpan = $('<span class="imgs-pages"></span>');
				this.close = $('<span class="imgs-close">&#10005;</span>');
				this.overlayVisible = false;
				//
				this.placeholders = $([]);
				this.index = $(settings.event.currentTarget).index();

				settings.event.preventDefault();
				this.items = obj;
				this.createHtml();
				this.bindEvent();
			},
			createHtml: function() { //创建dom
				var _this = this;
				this.overlay.appendTo('#popup');
				this.slider.appendTo(this.overlay);
				this.pageSpan.appendTo(this.overlay);
				this.close.appendTo(this.overlay);
				this.items.each(function() {
					_this.placeholders = _this.placeholders.add($('<div class="placeholder"></div>'));
				});
				this.slider.append(this.placeholders);
				// 监听单击缩略图

				// 图片集合中找到图片的位置
				this.showOverlay(this.index);
				this.showImage(this.index);

				this.calcPages(this.items, this.index);
				// 预加载下一个图像
				this.preload(this.index + 1);

				// 预加载上一个图像
				this.preload(this.index - 1);
				$(document).data("overlayVisible", true);

			},
			// 如果背景是点击，隐藏画廊
			bindEvent: function() {
				var _this = this;
				this.slider.on('click', function(e) {
					_this.hideOverlay();
				});
				this.close.on('click', function(e) {
					_this.hideOverlay();
				});
				// 监听触摸事件，滑动效果
				$('body').on('touchstart', '.imgs-slide img', function(e) {

					var touch = e.originalEvent,
						startX = touch.changedTouches[0].pageX;

					_this.slider.on('touchmove', function(e) {

						e.preventDefault();

						touch = e.originalEvent.touches[0] ||
							e.originalEvent.changedTouches[0];

						if (touch.pageX - startX > 10) {
							_this.slider.off('touchmove');
							_this.showPrevious();
						} else if (touch.pageX - startX < -10) {
							_this.slider.off('touchmove');
							_this.showNext();
						}

					});

					// 返回false,以防止形象高亮在Android 
					return false;

				}).on('touchend', function() {
					_this.slider.off('touchmove');
				});

				// 如果浏览器不支持触摸,显示箭头
				if (!("ontouchstart" in window)) {
					this.overlay.append(this.prevArrow).append(this.nextArrow);

					this.prevArrow.click(function(e) {
						e.preventDefault();
						_this.showPrevious();
					});

					this.nextArrow.click(function(e) {
						e.preventDefault();
						_this.showNext();
					});
				}

				// 监听键盘中的左右事件
				$(window).bind('keydown', function(e) {

					if (e.keyCode == 37) {
						_this.showPrevious();
					} else if (e.keyCode == 39) {
						_this.showNext();
					}

				});
			}, //绑定事件
			calcPages: function(items, index) {
				this.pageSpan.text((index + 1) + "/" + items.length);
			},
			showOverlay: function(index) {
				// 如果已经显示预览块,退出
				var _this = this;
				if (this.overlayVisible) {
					return false;
				}

				// 显示层
				this.overlay.show();

				setTimeout(function() {
					// 触发动画
					_this.overlay.addClass('visible');
				}, 100);

				// 图片的位置；
				this.offsetSlider(index);

				// 标记
				this.overlayVisible = true;
			},
			hideOverlay: function() { //接除事件绑定;
				this.overlay.remove();
				$("html").off("#popup");
				this.overlayVisible = false;
			},
			offsetSlider: function(index) {
				// 这将触发一个css过渡动画
				this.slider.css('left', (-index * 100) + '%');
			},
			preload: function(index) { // 预加载图片的索引条目数组中
				var _this = this;
				setTimeout(function() {
					_this.showImage(index);
				}, 1000);
			},
			showImage: function(index) { // 在滑块显示图像
				// 如果索引不在区间内返回false
				var _this = this;
				if (index < 0 || index >= this.items.length) {
					return false;
				}
				// 用loadImage函数的href属性项
				this.loadImage(this.items.eq(index).attr('href'), function() {
					_this.placeholders.eq(index).html(this);
				});
			},
			loadImage: function(src, callback) {
				var img = $('<img>').on('load', function() {
					callback.call(img);
				});

				img.attr('src', src);
			},
			showNext: function() {
				// 如果这不是最后张图片
				var _this = this;
				if (this.index + 1 < this.items.length) {
					this.index++;
					this.offsetSlider(this.index);
					this.preload(this.index + 1);
					this.calcPages(this.items, this.index);
				} else {
					// 触发弹性动画
					this.slider.addClass('rightSpring');
					setTimeout(function() {
						_this.slider.removeClass('rightSpring');
					}, 500);
				}
			},
			showPrevious: function() {
				var _this = this;
				if (this.index > 0) {
					this.index--;
					this.offsetSlider(this.index);
					this.preload(this.index - 1);
					this.calcPages(this.items, this.index);
				} else {
					// 触发弹性动画
					this.slider.addClass('leftSpring');
					setTimeout(function() {
						_this.slider.removeClass('leftSpring');
					}, 500);
				}
			}
		};
		//返回
		return _private.init(this);
	};
})(jQuery);
