import pck from '../package';
import * as IUI from './components';

export * from './components';
const components = Object.values(IUI);
const install = function (Vue) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	version: pck.version,
	install,
	...IUI,
};
