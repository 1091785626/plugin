# react-pull-scroll
下拉刷新，上滑加载

 - 处理微信露底问题
 - 下拉刷新可选，上滑加载可选

#### 说明

只需要看`src/`下代码即可，其他只是为了做展示用
```html
<PullScroll
	className="pull-view-wrap"
	wrapper=".scroll-container"
	height={window.innerHeight}
	loadDataForPull={loadDataForPull}
	loadDataForScroll={loadDataForScroll}
	isEnd={isEnd}
	curPage={curPage}
	show={true}
	pull={true}
	srcoll={true}
	resetPrvScrollTop = {id}
	ref = "pull"
>
	<List />
</PullScroll>
```

[在线demo,切换到手机预览模式](http://deot.github.io/plugin/react-pull-scroll/dist/)

