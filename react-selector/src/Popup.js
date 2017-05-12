import React,{Component,PropTypes} from 'react';
import LiItem from './LiItem';
class Popup extends Component{
	constructor(props){
		super(props);
		/**
		 * 弹层里展示的value，text
		 */
		this.state ={
			value:[],
			text:[]
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getChildData = this.getChildData.bind(this);
		this.changeValue = this.changeValue.bind(this);
	}
	componentWillMount(){
		const {
			level,
			initValue,
			initText
		} = this.props;
		this.state = {
			value:initValue||Array.from({ length: level },() => '0'),
			text:initText||Array.from({ length: level })
		};
	}
	handleClose(event){
		event.preventDefault();
		this.props.onClose&&this.props.onClose(event);
	}
	handleSubmit(event){
		const {
			value,
			text
		} = this.state;
		event.preventDefault();
		if(value.includes("0")){
			alert('请选择'); // 可替换
			return false;
		}
		this.props.onSubmit&&this.props.onSubmit(event,value,text);
	}
	getChildData(){
		const {
			data,
			level
		} = this.props;
		const {
			value
		} = this.state;
		let itemData = Array.from({ length: level },() => []);
		itemData[0] = data;
		if(level===1){ return itemData;}//长度为1
		for (let select_0 in itemData[0]){
			if(itemData[0][select_0].value==value[0]){
				itemData[1] = itemData[0][select_0].children;
			}
		}
		if(level===2){ return itemData; }//长度为2
		for (let select_1 in itemData[1]){
			if(itemData[1][select_1].value==value[1]){
				itemData[2] = itemData[1][select_1].children;
			}
		}
		return itemData;
	}
	changeValue(changeValue,changeLabel,index){
		const {value,text} = this.state;
		const {level} = this.props;
		let change_value = [...value];//防止浅复制
		let change_label = [...text];//防止浅复制

		change_value[index] = changeValue;
		change_label[index] = changeLabel;
		for(let i=index+1;i<level;i++){
			change_value[i] = "0";//或者字符串0	
			change_label[i] = "0";//或者字符串0	
		}
		this.setState({
			value:[...change_value],
			text:[...change_label]
		},()=>{
			console.log(this.state.value);
		});
	}
	render(){
		const {
			show,
			data,
			level
		} = this.props;
		const {
			value
		} = this.state;
		if(!show){
			return null;
		}
		const itemData = this.getChildData();
		return(
			<div className="selector-popup">
				<div className="selector-mask" onClick={this.handleClose} />
				<div className="selector-container">
				    <div className="selector-conent">
				        <div className="selector-scroll">
				            <ul>
				            	{
				            		value.map((item,index)=>{
				            			return (
                							<LiItem 
                								key={index}
                								value={value[index]}
                								index={index}
                								itemData={itemData[index]}
                								onChangeValue={this.changeValue}
                							/>
				            			);
				            		})
				            	}
				            </ul>
				            <p></p>
				        </div>
				        <div className="selector-action">
				            <button onClick={this.handleClose}>取消</button>
				            <button onClick={this.handleSubmit}>确定</button>
				        </div>
				    </div>
				</div>
			</div>

		);
	}
}
Popup.PropTypes = {
};
Popup.defaultProps = {
	mtop: 30,//列表默认top值和单列高度有关
	separator:' ',//地址名称间隔符号
	isMaskClose:true,//是否给mask填加关闭弹层事件
};
export default Popup;


