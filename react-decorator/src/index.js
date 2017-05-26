// 把 Create+[功能名字]
// 把 Component换成你的功能组件
import CreateComponent from './CreateComponent';
import createComponent from './decorator';
export {
	CreateComponent,
	createComponent
};
// 两种用法都可以

// examples_1
// <CreateComponent {...options}>
// 	<XXX />
// </CreateComponent>

// examples_2
// @createComponent({...options})