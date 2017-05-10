import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// import pureRender from 'pure-render-decorator';
// @pureRender
class Dropload extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {status,scrollText,pullText,type,pulledY,show} = this.props;
		if(!show) return null;
		return (
			<div className={`_dropload _${type}`} style={{transform: `translateY(${pulledY}px)`}}>
				<div className="_status">
					{
						(type==="scroll"&&status==1||type==="pull"&&status==3)&&<span className="_loading" />
					}
					{
						(type==="scroll")&&<span>{scrollText[status]}</span>
					}
					{
						(type==="pull"&&status!=3)&&<span>{pullText[status]}</span>
					}
				</div>
			</div>
		);
	}
}
Dropload.defaultProps = {
	/**
	 * 上“滑”加载
	 * 由redux管理，通过status的在redux存储来控制
	 */
	scrollText: ['上拉加载', '加载中', '已全部加载', '网络不稳定，请稍后重试'],
	/**
	 * 下“拉”加载
	 */
	pullText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...'],
	/**
	 * 默认上滑
	 * scroll / down
	 */
	type: "scroll",
	// 下拉刷新的位置
	pulledY: 0
};
// 大部分同PullView的props
Dropload.propTypes = {
	/**
	 * 状态
	 */
	status: PropTypes.number
};
export default Dropload;