/**
 * <ImgsPreview imgs={imgs} imgsHD={imgs}/>
 */
import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import './ImgsPreview.scss';
class ImgsPreview extends Component{
	constructor(props){
		super(props);
		this.state = {
			show:false,
			curImg:0
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleShow(event){
		const $this = event.target;
		const curImg = Number($this.getAttribute('data-index'));
		this.setState({
			show:true,
			curImg
		});
	}
	handleClose(event){
		this.setState({
			show:false,
		});
	}
	render(){
		const {
			diy,
			component,
			imgs = [],
			imgsHD = [],
			...rest
		} = this.props;
		const {
			show,
			curImg
		} = this.state;
		return(
			<div className="common-imgs-preview">    
				{	
					imgs.map((item,index)=>{
						if (diy) {
							return createElement(
								component,
								{
									key: `${item}`,
									img: item,
									index: index,
									onPreview:this.handleShow,
									...rest
								}
							);
						}
						return(
							<img 
								className="_show"
								src={`${item}`} 
								key={index}
								data-index={index}
								onClick={this.handleShow}
							/>
						);
					})
				}
				<Popup 
					show={show}
					imgs={imgsHD}
					curImg={curImg}
					onClose ={this.handleClose}
				/>
			</div>
		);
	}
}


ImgsPreview.PropTypes = {
	imgs: PropTypes.array,
	imgsHD: PropTypes.array
};
export default ImgsPreview;


