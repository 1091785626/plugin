/**
 * 一个简单的例子，就是把viewport修改成1.0，组件消亡设置回0.5
 */
import React, { Component } from 'react';
const getViewport = scale => `width=device-width, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`;
const viewport = getViewport(0.5);
const _viewport = getViewport(1.0);
const meta = document.querySelector("meta[name=viewport]");
class CreateComponent extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		if (meta.getAttribute('content') != _viewport) {
			meta.setAttribute('content', _viewport);
		}
	}
	componentDidMount() {
	}

	shouldComponentUpdate() {
	}
	componentWillUnmount() {
		if (meta.getAttribute('content') != viewport) {
			meta.setAttribute('content', viewport);
		}
	}
	render() {
		// this.props
		return React.cloneElement(React.Children.only(this.props.children),{__decorator:'success'});
	}
}
// createElement 与 cloneElement 一些使用

// 当 <CreateComponent component={xxxx}/>
// React.createElement(this.props.component,{__decorator:'success'});

// <CreateComponent>
// 	<XXX/>
// </CreateComponent>
// React.cloneElement(this.props.children,{__decorator:'success'});
export default CreateComponent;