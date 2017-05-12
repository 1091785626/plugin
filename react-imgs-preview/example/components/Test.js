import React, { Component, PropTypes } from 'react';
import ImgsPreview from '../../src/ImgsPreview';
import img_1 from '../img/1.jpg';
import img_2 from '../img/2.jpg';
import img_3 from '../img/3.jpg';
import img_4 from '../img/4.jpg';
import img_5 from '../img/5.jpg';
import img_6 from '../img/6.jpg';
const imgs = [img_1,img_2,img_3,img_4,img_5,img_6];
class Test extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<ImgsPreview imgs={imgs} imgsHD={imgs}/>
			</div>
		);
	}
}
Test.propTypes = {
};
export default Test;