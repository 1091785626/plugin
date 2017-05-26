import React, { Component, PropTypes } from 'react';
import {createComponent,CreateComponent} from '../../src/index';
@createComponent({})
class App extends Component {
	constructor(props, context) {
		super(props);
	}
	componentWillMount(){
	}
	componentWillUnmount() {
	}

	render() {
		return(
			<div>
				test
			</div>
		);
	}
}

export default App;
