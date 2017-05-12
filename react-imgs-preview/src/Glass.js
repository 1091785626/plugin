import React, { Component, PropTypes } from 'react';
import Touch from './Touch';
import './Glass.scss';
import classNames from 'classnames';

export default class Glass extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pinch : 1, // 缩放比例
			angle :0, // 旋转角度
			left:0,
			top:0,
			animating:false,
			scaling:false,
		};
		this.pinch = 1;
		this.left = 0;
		this.top = 0;
		this.angle = 0;
		this.doubleTapped = false;
		this.handlePinch = this.handlePinch.bind(this);
		this.handleRotate = this.handleRotate.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleDoubleTap = this.handleDoubleTap.bind(this);
		this.handleLongTap = this.handleLongTap.bind(this);
		this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
		this.handleSwipeRight = this.handleSwipeRight.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		// this.setDeafult();
	}
	setDeafult(){
		this.setState({
			pinch : 1, // 缩放比例
			angle :0, // 旋转角度
			left:0,
			top:0,
			animating:false,
			scaling:false
		});
		this.pinch = 1;
		this.left = 0;
		this.top = 0;
		this.angle = 0;
		this.doubleTapped = false;
	}
	handleLoad(event){
		const width = event.target.offsetWidth;
		const scale_1 = Math.ceil(window.innerWidth/width);
		const height = event.target.offsetHeight;
		const scale_2 = Math.ceil(window.innerHeight/height);
		const scale = scale_2 > scale_1 ? scale_2 : scale_1;

		this.doubleClickPinch = scale;
	}
	handlePinch(event) {
		this.pinch += (event.scale*2.0);

		this.setState({
			pinch: this.pinch < 1 ? 1 : this.pinch
		});
	}
	handleRotate(event) {
		this.angle += event.angle;
		this.setState({
			angle:this.angle
		});
	}

	handleMove(event) {
		if(this.pinch == 1) return;
		this.left += event.deltaX;
		this.top += event.deltaY;
		this.setState({
			left: this.left,
			top: this.top
		});
	}

	handleDoubleTap() {
		if(this.doubleTapped) {
			this.pinch = 1;
			this.setState({
				pinch: this.pinch,
				scaling:true
			});
			setTimeout(()=>{
				this.setState({
					scaling:false
				});
			},900);
		}else {
			this.pinch = this.doubleClickPinch;
			this.setState({
				pinch: this.pinch,
				scaling:true
			});
			setTimeout(()=>{
				this.setState({
					scaling:false
				});
			},900);
		}
		this.doubleTapped = !this.doubleTapped;
	}

	handleLongTap() {
		this.setState({
			animating:true
		});
		setTimeout(()=>{
			this.setState({
				animating:false
			});
		},1000);
	}
	handleSwipeLeft(event){
		if(this.props.onPrev) {
			let toSet = this.props.onPrev();
			toSet&&this.setDeafult();
			!toSet&&(alert("前面没有了"),this.setDeafult());
		}
		
	}
	handleSwipeRight(event){
		if(this.props.onNext) {
			let toSet = this.props.onNext();
			toSet&&this.setDeafult();
			!toSet&&(alert("后面没有了"),this.setDeafult());
		}
	}
	render() {
		const {
			pinch,
			angle,
			left,
			top,
			animating,
			scaling
		} = this.state;
		const imgStyle = {
			transform: `scale(${pinch}) rotateZ(${angle}deg)`,
			WebkitTransform: `scale(${pinch}) rotateZ(${angle}deg)`,
			left: `${left}px`,
			top: `${top}px`
		};
		const imgClasses = classNames('_lena','_flash',{_animated:animating},{_scale: scaling});
		const {src} = this.props;
		return (
			<Touch 
				onPinch={this.handlePinch} 
				onMove={this.handleMove} 
				onRotate={this.handleRotate} 
				onDoubleTap={this.handleDoubleTap} 
				onLongTap={this.handleLongTap}
				onSwipeLeft={this.handleSwipeLeft}
				onSwipeRight={this.handleSwipeRight}
				flickThreshold={pinch == 1 ? 0.6 : 1.5}
			>
				<div className="common-glass" style={{"height": window.innerHeight,lineHeight:window.innerHeight+'px'}}>
					<img  
						className={imgClasses} 
						style={imgStyle} 
						src={src} 
						data-tag="img"
						onLoad = {this.handleLoad}
					/>
				</div>
			</Touch>
		);
	}
}