import React, { Component, PropTypes } from 'react';
import Selector from '../../src/Selector';
import areaData from './district';
class Test extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			areaData : areaData || []
		};
		this.handleGetData = this.handleGetData.bind(this);
	}
	handleGetData(){
		this.setState({
			areaData:[] // 数据源
		});
	}
	render() {
		const {
			areaData
		} = this.state;
		return (
			<Selector
				ref="selector" 
				content="省市区选择"
				initText={['浙江省','杭州市','拱墅区']}
				initValue={["330000","330100","330105"]}
				level={3}
				data={areaData}
				onGetData={this.handleGetData}
			/>
		);
	}
}
Test.propTypes = {
};
export default Test;