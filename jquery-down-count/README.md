# jquery-down-count
倒计时复用插件

> 自己项目用于秒杀活动与订单的倒计时等
## html 结构
```html
<div class="downCount" data-id="1"></div>
```

## js调用	
```javascript
$('.downCount[data-id='+1+']').downCount({
		id:1,							//识别dom用，可以不传
		date: '2025-12-12 00:00:00',	//结束时间
		run:10,							//显示毫秒，还说秒
		server:'2016-05-12 00:00:00',	//服务器时间
		content:'距结束'					//文本
	}, function () {
		console.log('结束');
	}
);
```