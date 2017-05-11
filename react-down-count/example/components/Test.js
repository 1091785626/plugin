import React, { Component, PropTypes } from 'react';
import DownCount from '../../src/DownCount';
class Test extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<DownCount 
					id="null"
					date="2016-11-21 16:30:00"
					run={1000}
					content="距开始："
					server="2016-11-19 16:30:00"
					onEnd={this.handleEnd}
				/>
				<DownCount 
					id="null"
					date="2016-11-21 16:30:00"
					run={10}
					content="距开始："
					server="2016-11-19 16:30:00"
					onEnd={this.handleEnd}
				/>
			</div>
		);
	}
}
Test.propTypes = {
};
export default Test;