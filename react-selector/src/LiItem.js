import React,{Component,PropTypes} from 'react';
class Item extends Component{
	constructor(props){
		super(props);
		this.state ={
			topPos:0
		};
		this.handleStart = this.handleStart.bind(this); 
		this.handleMove = this.handleMove.bind(this); 
		this.handleEnd = this.handleEnd.bind(this); 

		this.moveEvent = this.moveEvent.bind(this); 
		this.endEvent = this.endEvent.bind(this); 
	}
	componentWillMount(){
		const {
			value,
			itemData
		} = this.props;
		let topPos; 
		for(let i in itemData){
			if(itemData[i].value==value){
				this.setState({
					topPos:60*(Number(i)+1)
				});
				break;
			}
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.value==0){
			this.setState({
				topPos:0
			});
		}
	}
	handleStart(event){
		this.start = event.touches[0].pageY;
	}
	handleMove(event){
		let end = event.touches[0].pageY;
		this.start = this.moveEvent(event,this.start,end);
	}
	handleEnd(event){
		let end = event.changedTouches[0].pageY;
		this.endEvent(event,this.start,end);
	}
	moveEvent(event,start,end){
		const {
			topPos
		} = this.state;
		let diff = end - start;
		let top = topPos - diff;
		this.setState({
			topPos:top
		});
		return end;
	}
	endEvent(event,start,end){
		const {
			index,
			value,
			itemData
		} = this.props;
		const {
			topPos
		} = this.state;
		let diff = end - start;
		let top = topPos - diff;

		let mod = parseInt(topPos/60);
		if (top < 0) {
			top = 0;
			mod = 1;
		}else if(top>itemData.length*60){
			top = itemData.length*60;
			mod = itemData.length;
		}else{
			top = mod*60;
		}
		this.setState({
			topPos:top
		},()=>{
			const item = itemData[mod-1]||{};
			this.props.onChangeValue(item.value||"0",item.label||"",index);
		});
	}
	render(){
		const {
			value,
			index,
			itemData
		} = this.props;
		const {topPos} = this.state;
		return(
			<li 
				style={{top:-topPos}}
				onTouchStart = {this.handleStart}
				onTouchMove = {this.handleMove}
				onTouchEnd = {this.handleEnd}
			>
				<dl>
					<dd>——</dd>
					{
						itemData.map((item,index) => {
							return (
								<dd key={item.value}>
									{item.label}
								</dd>
							);
						})
					}
				</dl>
			</li>
		);
	}
}

export default Item;


