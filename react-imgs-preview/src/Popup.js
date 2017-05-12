import React,{Component,PropTypes} from 'react';
import Glass from './Glass';
import classnames from 'classnames';
class Popup extends Component{
	constructor(props){
		super(props);
		this.state={
			curImg:0,
			_left:false,
			_right:false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleClickImg = this.handleClickImg.bind(this);

		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			curImg:nextProps.curImg
		});
		this.imgsHD = new Array(nextProps.imgs.length-1);
	}
	handleClose(event){
		const type = event.target.getAttribute('data-tag');
		(this.props.onClose&&type!=='img')&&this.props.onClose();
		event.preventDefault();
		event.stopPropagation();
	}
	handleClickImg(event){
		/**
		 * 阻止事件冒泡关闭遮罩
		 */
		event.stopPropagation();
	}
	handlePrev() {
		const { curImg } = this.state;
		const { imgs } = this.props;
		if (curImg > 0) {
			this.setState({ curImg: curImg - 1 });
			return true;
		} else {
			this.setState({
				_left: true
			}, () => {
				setTimeout(() => {
					this.setState({
						_left: false
					});
				}, 500);
			});
			return false;
		}

	}
	handleNext() {
		const { curImg } = this.state;
		const { imgs } = this.props;
		if (curImg < imgs.length - 1) {
			this.setState({ curImg: curImg + 1 });
			return true;
		} else {
			this.setState({
				_right: true
			}, () => {
				setTimeout(() => {
					this.setState({
						_right: false
					});
				}, 500);
				return false;
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
			_left,
			_right
		} = this.state;
		if(!show){
			return null;
		}
		return(
			<div 
				className="common-imgs-preview-popup" 
				onClick={this.handleClose} 
				onTouchStart={this.handleStart} 
				onTouchMove={this.handleMove}
			>
			
				<div className={
					classnames(
						("_slide"),
						{"_left":_left},
						{"_right":_right}
					)
				}

					style={{left:`-${curImg*window.innerWidth}px`}}
				>
					{
						imgs.map((item,index)=>{
							let img = item;
							if(Math.abs(curImg-index)>1&&this.imgsHD[index]==undefined){
								img=undefined;
							}
							this.imgsHD[index] = img;
							return (
								<div className="_placeholder" key ={index}>
									<Glass 
										src={img}
										onNext ={this.handleNext}
										onPrev ={this.handlePrev}
										show = {curImg}
									/>
								</div>
							);
						})
					}
				</div>
				<span className="_pages">{curImg+1}/{imgs.length}</span>
				<span className="_close" onClick={this.handleClose}>&#10005;</span>
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


