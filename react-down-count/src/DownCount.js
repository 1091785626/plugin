/**
 * 	<DownCount 
		id="null"
		date="2016-11-21 16:30:00"
		run={1000}
		content="距开始："
		server="2016-11-19 16:30:00"
		onEnd={this.handleEnd}
	/>
 */

import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
class DownCount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:true,
			downCount: ""
		};
		this.startRun = this.startRun.bind(this);
		this.endRun = this.endRun.bind(this);
		this.curDate = this.curDate.bind(this);
		/**
		 * 控制onEnd只执行一次
		 */
		this.isEnd = 0;
	}
	componentWillMount() {
		const {
			date,
			server
		} = this.props;
		if (!date) {
			// alert('请设定时间'); // 可替换
			this.setState({
				show:false
			});
			return false;
		}
		// 抛异常
		if (!Date.parse(date)) {
			// alert('注意日期格式为 1992-09-21 12:00:00.'); // 可替换
			this.setState({
				show:false
			});
			return false;
		}
		/**
		 * 先运行一次
		 */
		this.serverOffset = server ? (Date.parse(server.replace(/-/g, "/")) - (new Date()).getTime()) : 0;
		this.startRun();
	}
	componentDidMount() {
		const { run } = this.props;
		if(!this.isEnd){
			this.interval = setInterval(this.startRun, run);
		}
	}
	componentWillUnmount(){
		/**
		 * 只清除定时器
		 */
		this.endRun(1);
	}
	endRun(unMount){
		this.interval&&clearInterval(this.interval);
		/**
		 * 定时消除
		 */
		if(this.isEnd&&!unMount){
			this.props.onEnd&&this.props.onEnd();
		}
	}
	curDate(){
		const dateN = new Date();
		const new_date = new Date(dateN.getTime() + Number(this.serverOffset));
		return new_date;
	};
	startRun() {
		const {
			date,
			run,
			content
		} = this.props;

		const setDate = date.replace(/-/g, "/");
		const current_date = this.curDate();
		const target_date = new Date(date);
		const difference = target_date - current_date;

		const _second = 1000;
		const _minute = _second * 60;
		const _hour = _minute * 60;
		const _day = _hour * 24;

		const days = Math.floor(difference / _day);
		const hours = Math.floor((difference % _day) / _hour);
		const minutes = Math.floor((difference % _hour) / _minute);
		const seconds = Math.floor((difference % _minute) / _second);
		const mseconds = Math.floor((difference / 10 % 100));

		const daysC = (String(days).length >= 2) ? days : '0' + days;
		const hoursC = (String(hours).length >= 2) ? hours : '0' + hours;
		const minutesC = (String(minutes).length >= 2) ? minutes : '0' + minutes;
		const secondsC = (String(seconds).length >= 2) ? seconds : '0' + seconds;
		const msecondsC = (String(mseconds).length >= 2) ? mseconds : '0' + mseconds;

		const downCount = `${content}${daysC}天${hoursC}小时${minutesC}分${secondsC}秒${run==10?msecondsC:''}`;

		this.setState({
			downCount:difference < 0 ?'已结束！':downCount
		},()=>{
			this.isEnd = 1;
			difference<0&&this.endRun();
		});
	}
	render() {
		const {
			show,
			downCount
		} = this.state;
		if (!show) {
			return null;
		}
		return (
			<div>{downCount}</div>
		);
	}
}
DownCount.PropTypes = {
	/**
	 * id,唯一标识//此项目可不传。最好传；
	 */
	id: PropTypes.number,
	/**
	 * 结束时间或者开始时间
	 */
	date: PropTypes.string,
	/**
	 * 毫秒/秒
	 * 10/1000
	 */
	run: PropTypes.number,
	/**
	 * 文本
	 */
	content: PropTypes.string,
	/**
	 * 服务器时间
	 */
	server: PropTypes.string,
	/**
	 * 结束时候的回调
	 */
	onEnd: PropTypes.func
};
export default DownCount;