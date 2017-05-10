import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PullScroll from './PullScroll';
class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.loadDataForPull = this.loadDataForPull.bind(this);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		this.state={
			curPage:0,
			totalPage:10,
			itemArr: [],
			itemObj:{},
			isEnd:0
		};
	}
	componentWillMount(){
		
	}
	componentWillUnmount() {
	}
	loadDataForPull(){
		setTimeout(()=>{
			console.log("下拉数据加载完毕1");
			this.setState({
				isEnd: 0,
				curPage:1,
				totalPage:10,
				itemArr:Array.from({ length: 10 },() => '0')
			});
			this.refs.pull.setDefault();
		},3000);
	}
	loadDataForScroll(){
		this.setState({
			isEnd: 1
		});
		setTimeout(()=>{
			this.setState({
				isEnd: this.state.curPage + 1>this.state.totalPage?2:0,
				curPage:this.state.curPage + 1,
				totalPage:10,
				itemArr:[...this.state.itemArr,...Array.from({ length: 10 },() => '0')]
			});
		},1000);
	}
	render() {
		const {loadDataForScroll,loadDataForPull} = this;
		const {
			itemArr,
			isEnd,
			curPage
		} = this.state;
		return(
			<PullScroll
				className="pull-view-wrap"
				wrapper=".scroll-container"
				height={_global.innerHeight}
				loadDataForPull = {loadDataForPull}
				loadDataForScroll = {loadDataForScroll}
				isEnd = {isEnd}
				curPage={curPage}
				show={true} // 总开关 // 默认true
				pull={true} // 允许下拉刷新 默认true
				srcoll={true} // 允许上划加载 默认true
				// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
				ref = "pull"
			>
				<div style={{"background":"white"}}>
				{
					itemArr.map((item,index)=>{
						return (
							<p key={index} style={{height:200}}>{Math.random()}</p>);
					})
				}
				</div>
			</PullScroll>
		);
	}
}

export default App;
