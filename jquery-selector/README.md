# jquery-selector
一二三级别联动选择器

## html 结构，比如：
```html
<div class="form-group">
	<label>联动</label>
	<input type="text" name="selector" id="selector" value="" readonly="readonly" placeholder="test3"/>
	<input type=":hidden"  value="" />
</div>
```

## js调用，比如：	
```javascript
//数据格式,比如
var data = [
	{
		value:"",
		label:"",
		children:[
			{
				value:"",
				label:"",
				children:[
					{
						value:"",
						label:""
					}
				]
			}
		]
	}
]
$("#selector_2").selector({
	value:['1','1','1'],  	 //默认值
	text:['一','二','三'],
	level:3, 				 //几级选择
	data:data,				 //数据
	onChange:function(data){ //回调
		console.log(data);
	}
});
```