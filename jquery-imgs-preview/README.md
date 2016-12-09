# jquery-imgs-preview
图片预览

## html 结构，比如：
```html
<div class="content">
	<div class="clearfix img-gather thumbs">
		<a href="images/1.jpg" style="background-image:url(images/1.jpg)"></a>
		<a href="images/2.jpg" style="background-image:url(images/2.jpg)"></a>
		<a href="images/3.jpg" style="background-image:url(images/3.jpg)"></a>
		<a href="images/4.jpg" style="background-image:url(images/4.jpg)"></a>
		<a href="images/5.jpg" style="background-image:url(images/5.jpg)"></a>
		<a href="images/6.jpg" style="background-image:url(images/6.jpg)"></a>
	</div>
</div>
<div id="popup"></div>
```

## js调用，比如：	
```javascript
$('.thumbs a').on('click', function(event) {
	$('.thumbs a').imgsPreview({
		event: event
	});
});
```