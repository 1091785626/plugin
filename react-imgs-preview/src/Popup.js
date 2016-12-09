import React,{Component,PropTypes} from 'react';
import classnames from 'classnames';
class Popup extends Component{
	constructor(props){
		super(props);
		this.state={
			curImg:0,
			leftSpring:false,
			rightSpring:false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleClickImg = this.handleClickImg.bind(this);

		this.handleStart = this.handleStart.bind(this);
		this.handleMove = this.handleMove.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			curImg:nextProps.curImg
		});
		this.imgsHD = new Array(nextProps.imgs.length-1);
	}
	handleClose(event){
		this.props.onClose&&this.props.onClose();
	}
	handleClickImg(event){
		/**
		 * 阻止事件冒泡关闭遮罩
		 */
		event.stopPropagation();
	}
	handleStart(event){
		event.preventDefault();
		this.startX = event.touches[0].pageX;
		this.isMove = 0 ;
	}
	handleMove(event){
		this.endX = event.changedTouches[0].clientX;
		if (this.endX - this.startX > 10 && !this.isMove) {
			this.handlePrev();
			this.isMove = 1;
		} else if (this.endX - this.startX < -10 && !this.isMove) {
			this.handleNext();
			this.isMove = 1;
		}
	}
	handlePrev() {
		const {
			curImg
		} = this.state;
		const {
			imgs
		} = this.props;
		if (curImg > 0) {
			this.setState({
				curImg: curImg - 1
			});
		} else {
			this.setState({
				leftSpring: true
			}, () => {
				setTimeout(() => {
					this.setState({
						leftSpring: false
					});
				}, 500);
			});
		}
	}
	handleNext() {
		const {
			curImg
		} = this.state;
		const {
			imgs
		} = this.props;
		if (curImg < imgs.length - 1) {
			this.setState({
				curImg: curImg + 1
			});
		} else {
			this.setState({
				rightSpring: true
			}, () => {
				setTimeout(() => {
					this.setState({
						rightSpring: false
					});
				}, 500);
			});
		}
	}
	render(){
		const {
			show,
			imgs
		} = this.props;
		const {
			curImg,
			leftSpring,
			rightSpring
		} = this.state;
		if(!show){
			return null;
		}
		return(
			<div 
				className="imgs-preview-popup" 
				onClick={this.handleClose} 
				onTouchStart={this.handleStart} 
				onTouchMove={this.handleMove}
			>
			
			    <div className={
			    	classnames(
			    		("imgs-slide"),
			    		{"leftSpring":leftSpring},
			    		{"rightSpring":rightSpring}
			    	)
			    }

			    	style={{left:`-${curImg*100}%`}}
			    >
			    	{
			    		imgs.map((item,index)=>{
			    			let img = item;
			    			if(Math.abs(curImg-index)>1&&this.imgsHD[index]==undefined){
			    				img=undefined;
			    			}
			    			this.imgsHD[index] = img;
			    			return (
			    				<div className="placeholder" key ={index}>
			    				    <img 
			    				    	src={img} 
			    				    	onClick={this.handleClickImg}
			    				    />
			    				</div>
			    			);
			    		})
			    	}
			    </div>
			    <span className="imgs-pages">{curImg+1}/{imgs.length}</span>
			    <span className="imgs-close" onClick={this.handleClose}>&#10005;</span>
			</div>
		);
	}
}


Popup.PropTypes = {
	/**
	 * 是否展示
	 */
	show:PropTypes.bool,
	/**
	 * 图片的数组
	 */
	imgs:PropTypes.array,
	/**
	 * 当前选择的图片index
	 */
	curImg:PropTypes.number,
	/**
	 * 关闭图层
	 */
	onClose:PropTypes.func
};
export default Popup;


