/**
 * const area=getItem('area');
	<Selector
		ref="selector" 
		content="省市区选择"
		initText={['浙江省','杭州市','拱墅区']}
		initValue={["330000","330100","330105"]}
		level={3}
		data={area.data}
		onGetData={""}
	/>
 */
import React,{Component,PropTypes} from 'react';
import Popup from './Popup';
import './Selector.scss';
class Selector extends Component{
	constructor(props){
		super(props);
		/**
		 * 页面里展示的value，text
		 */
		this.state = {
			show:false,
			value:[],
			text:[]
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount(){
		const {
			initValue,
			initText,
		} = this.props;
		this.setState({
			value:initValue||[],
			text:initText||"请选择"
		});
	}
	handleShow(event){
		const {
			props,
			data
		} = this.props;
		(!data&&this.props.onGetData)&&this.props.onGetData();
		this.setState({
			show:true
		});
	}
	handleClose(event){
		const {
			initText,
		} = this.props;
		/**
		 * 取消或关闭，value，text值不变
		 */
		this.setState({
			show:false
		});
	}
	handleSubmit(event,value,text){
		/**
		 * 确定
		 * 取消或关闭，value，text值不变
		 */
		this.setState({
			show:false,
			value,
			text
		});
	}
	/**
	 * 用于父级获取value与text的值 
	 * this.refs.selector.getValue()
	 */
	getValue(){
		const {
			value,
			text
		} = this.state;
		return {
			value,
			text
		};
	}
	render(){
		const {
			show,
			text,
			value
		} = this.state;
		const {
			data,
			level,
			initValue,
			initText,
			content
		} = this.props;
		return(
			<div className="selector">
				<div className="selector-static" onClick={this.handleShow}>
					<div>{content}</div>
					<div>{text.join("_")}</div>
				</div>
				<span>{value.join("_")}</span>
				<Popup 
					show={show}
					onClose ={this.handleClose}
					onSubmit ={this.handleSubmit}
					data = {data}
					initValue = {initValue}
					initText = {initText||[]}
					level={level}
				/>
			</div>
		);
	}
}


Selector.PropTypes = {
};
export default Selector;


