/**
 * <ImgsPreview imgs={imgs}/>
 */
import React,{Component,PropTypes} from 'react';
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
			imgs = []
		} = this.props;
		const {
			show,
			curImg
		} = this.state;
		return(
			<div className="w-row w-reset imgs-preview">    
				{
					imgs.map((item,index)=>{
						return(
							<img 
								className="imgs-preview-show"
								src={`${item}!4-4`} 
								key={index}
								data-index={index}
								onClick={this.handleShow}
							/>
						);
					})
				}
				<Popup 
					show={show}
					imgs={imgs}
					curImg={curImg}
					onClose ={this.handleClose}
				/>
			</div>
		);
	}
}


ImgsPreview.PropTypes = {
	imgs: PropTypes.array
};
export default ImgsPreview;


