import React, { Component } from 'react';
import CreateComponent from './CreateComponent';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => function createDecorator(WrappedComponent) {
	return class Decorator extends Component {
		constructor() {
			super();
			this.displayName = `Decorator${getDisplayName(WrappedComponent)}`;
		}

		render() {
			return (
				<CreateComponent {...options}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</CreateComponent>
			);
		}
	};
};

