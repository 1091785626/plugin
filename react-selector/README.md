# react-selector
一二三级别联动选择器

#### 说明

只需要看`src/`下代码即可，其他只是为了做展示用
```html
<Selector
	ref="selector" 
	content="省市区选择"
	initText={['浙江省','杭州市','拱墅区']}
	initValue={["330000","330100","330105"]}
	level={3} // 级数1|2|3
	data={areaData}
	onGetData={this.handleGetData}
/>
```
#### 数据格式,比如：	
```javascript
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
```
[在线demo,切换到手机预览模式](http://deot.github.io/plugin/react-selector/dist/)
