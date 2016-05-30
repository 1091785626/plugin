;(function($) {
	$.fn.mobileAreaSelect = function( options ) {
		var rnd = Math.random().toString().replace('.', '');
		//Options
		var settings = $.extend({
			id:"dialog_"+rnd,					//弹出层ID
			data:"data/area.json",				//数据路径
			index:0,
			value:[330000,330100,330105],		//地址code
			text:['浙江省','杭州市','拱墅区'],	//地址名称
			level:3,							//几级选择
			mtop:30,							//列表默认top值和单列高度有关
			separator:' ',						//地址名称间隔符号
			isMaskClose:true,					//是否给mask填加关闭弹层事件
			closeBtn:".js-close",				//绑定关闭弹层事件对象
			dialog:".select-dialog",
			onChange:$.noop 					//点击确定后的回调函数
		}, options );
		
		var preventDefault = function(e) {
			e.stopPropagation();
			e.preventDefault();
		};
		var _private={
			init:function(obj){
				this.index=settings.index;
				this.mtop=settings.mtop;
				this.value=settings.value;
				this.oldvalue = this.value.concat([]);
				this.text=settings.text;
				this.level=settings.level;
				this.scroller = $('#' + settings.id).find(".select-scroll ul");
				this.$ms=$(obj);
				this.getData();
				this.createHtml();
				this.bindEvent();
			},
			getData: function() {
				var _this = this;
				if (typeof settings.data == "object") {
					this.data = settings.data;
				} else {
					$.ajax({
						dataType: 'json',
						cache: true,
						url: settings.data,
						type: 'GET',
						success: function(result) {
							_this.data = result;
						},
						accepts: {
							json: "application/json, text/javascript, */*; q=0.01"
						}
					});
				}
			},
			bindEvent:function(){
				var _this=this;
				this.$ms.on("click",function(){
					$("body").append(_this.htmlStr);
					$("html").on("touchmove.popBlur",preventDefault);
					_this.scroller = $('#' + settings.id).find(".select-scroll ul");
					_this.format();
					var isTouchDevice="ontouchstart"in window||navigator.msMaxTouchPoints;
					var start = 0,
						end = 0;
					if(isTouchDevice){
						_this.scroller.children().on('touchstart', function(e) {
							start = e.originalEvent.targetTouches[0].pageY;
						});
						_this.scroller.children().on('touchmove', function(e) {
							end = e.originalEvent.changedTouches[0].pageY;
							start = _this.moveEvent(e,start,end);
							return false;
						});
						_this.scroller.children().on('touchend', function(e) {
							end = e.originalEvent.changedTouches[0].pageY;
							_this.endEvent(e,end,start);
							return false;
						});
					}else{
						_this.flag = false;
						_this.scroller.children().on('mousedown', function(e) {
							_this.flag = true;
							start = e.clientY;
						});
						_this.scroller.children().on('mousemove', function(e){
							if(_this.flag){
								end = e.clientY;
								start = _this.moveEvent(e,start,end);
								return false;
							}
						});
						_this.scroller.children().on('mouseup',  function(e){
							_this.flag = false;	
							end = e.clientY;
							_this.endEvent(e,end,start);
							return false;
						});
						$('body').on('mouseup',  function(e){
							_this.flag = false;
						});
					}
				});
				
				$("body").on("click","#"+settings.id,function(e){
					
					//给mask添加关闭事件
					if($.contains(e.target,$(this).find(".select-cnt")[0])&&settings.isMaskClose){
						_this.close();
					}
					//点击确定按钮
					if($(e.target).hasClass("js-submit")){
						_this.submit();
					}
					//点击取消按钮
					if($(e.target).hasClass("js-close")){
						_this.close();
					}
					
				});
				
			},
			moveEvent:function(e,start,end){
				var diff = end - start;
				var dl = $(e.target).parent();
				if (dl[0].nodeName != "DL") {
					return;
				}
				var top = parseInt(dl.css('top') || 0) + diff;
				dl.css('top', top);
				return end;
			},
			endEvent:function(e,start,end){
				var _this = this;
				var diff = end - start;
				var dl = $(e.target).parent();
				if (dl[0].nodeName != "DL") {
					return;
				}
				var i = $(dl.parent()).index();
				var top = parseInt(dl.css('top') || 0) + diff;
				if (top > _this.mtop) {
					top = _this.mtop;
				}
				if (top < -$(dl).height() + 60) {
					top = -$(dl).height() + 60;
				}
				var mod = top / _this.mtop;
				var mode = Math.round(mod);
				var index = Math.abs(mode) + 1;
				if (mode == 1) {
					index = 0;
				}
				_this.value[i] = $(dl.children().get(index)).attr('ref');
				_this.value[i] == 0 ? _this.text[i] = "" : _this.text[i] = $(dl.children().get(index)).html();
				for (var j = _this.level - 1; j > i; j--) {
					_this.value[j] = 0;
					_this.text[j] = "";
				}
				if (!$(dl.children().get(index)).hasClass('focus')) {
					_this.format();
				}
				$(dl.children().get(index)).addClass('focus').siblings().removeClass('focus');
				dl.css('top', mode * _this.mtop);
			},
			createHtml:function(){
				var str='<div class="select-dialog show" id="'+settings.id+'">'
							+'<div class="select-cnt">'
							+'<div class="select-scroll"><ul>';
					//根据level添加li
					for(var i=1;i<=settings.level;i++){
						str+='<li></li>';
					}
					str=str+'</ul><p></p></div>'
						+'<div class="select-action"><button class="b-cencel js-close">取消</button><button class="b-submit js-submit">确定</button></div>'
						+'</div></div>';
				this.htmlStr=str;
//				return str;
			},
			format: function() {
				var _this = this;
				this.f(this.data);
			},
			f: function(data) {
				var _this = this;
				var item = data;
				if (!item) {
					item = [];
				}
				var str = '<dl><dd ref="0">——</dd>';
				var focus = 0,
					childData, top = _this.mtop;
				if (_this.index !== 0 && _this.value[_this.index - 1] == "0") {
					str = '<dl><dd ref="0" class="focus">——</dd>';
					_this.value[_this.index] = 0;
					_this.text[_this.index] = "";
					focus = 0;
				} else {
					
					if (_this.value[_this.index] == "0") {
						str = '<dl><dd ref="0" class="focus">——</dd>';
						focus = 0;
					}
					for (var j = 0, len = item.length; j < len; j++) {
						var id = item[j].national_code || 0;
						var cls = '';
						if (_this.value[_this.index] == id) {
							cls = "focus";
							focus = id;
							childData = item[j]._child||item[j]._child;
							top = _this.mtop * (-j);
						}
						str += '<dd class="' + cls + '" ref="' + id + '">' + item[j].region_name + '</dd>';
						
					}
				}
				str += "</dl>";
				var newdom = $(str);
				newdom.css('top', top);
				var child = _this.scroller.children();
				$(child[_this.index]).html(newdom);
				_this.index++;
				if (_this.index > _this.level - 1) {
					_this.index = 0;
					return;
				}
				_this.f(childData);
			},
			submit: function() {
				var _this = this;
				this.oldvalue = this.value.concat([]);
				//layer.open({content:_this.oldvalue});
				if(this.oldvalue[0]==0||this.oldvalue[1]==0||this.oldvalue[2]==0){
					//layer.open({content:'请完整选择',time:1.5});
					alert('请完整选择');
					return !1;
				}
				if (this.$ms[0].nodeType == 1) {
					//input
					this.$ms.val(this.text.join(settings.separator));
					this.$ms.attr('data-value', this.value.join(','));//主要用显示
				}
				this.$ms.next(':hidden').val(this.value.join(','));
				this.close();
				//执行回调
				settings.onChange.apply(this,arguments);
			},
			close:function(){
				this.value = this.oldvalue.concat([]);
				$("#"+settings.id).remove();
				$("html").off(".popBlur");
			}
			
		};
		
		return this.each(function(){
			_private.init(this);
		});
	};
	
})(jQuery);