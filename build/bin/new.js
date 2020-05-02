'use strict';

console.log();
process.on('exit', () => {
	console.log();
});
if (!process.argv[2]) {
	console.error('[组件名]必填 - Please enter new component name');
	process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const upperCamelcase = require('uppercamelcase');

const resolvePath = (...args) => path.join(process.cwd(), ...args);

const dirname = process.argv[2];
// 组件名 -> FooBar
const componentName = upperCamelcase('i-' + dirname);
const componentPath = resolvePath('src/components', dirname);
const Files = [
	{
		filename: resolvePath('src/components', dirname, 'index.js'),
		content: `import ${componentName} from './src/${componentName}.vue';

/* istanbul ignore next */
${componentName}.install = function(Vue) {
  Vue.component(${componentName}.name, ${componentName});
};

export default ${componentName};`
	},
	{
		filename: resolvePath('src/components', dirname, `src/${componentName}.vue`),
		content: `<template>
  <div class="${componentName}">${componentName}</div>
</template>

<script>
  export default {
    name: '${componentName}'
  };
</script>`
	},
	{
		filename: resolvePath('examples/docs', `${dirname}.md`),
		content: `## ${componentName}`
	},
	{
		filename: resolvePath('test/unit/specs', `${dirname}.spec.js`),
		content: `import { createTest, destroyVM } from '../util';
import ${componentName} from 'src/components/${componentName}';

describe('${componentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${componentName}, true);
    expect(vm.$el).to.exist;
  });
});
`
	},
	{
		filename: resolvePath('types', `${dirname}.d.ts`),
		content: `import { IComponent } from './component'

/** ${componentName} Component */
export declare class ${componentName} extends IComponent {}`
	}
];
// 添加到 components.json
const componentsFile = require('../../components.json');
if (componentsFile[dirname]) {
	console.error(`${dirname} 已存在.`);
	process.exit(1);
}
componentsFile[dirname] = `./src/components/${dirname}/index.js`;
fileSave(resolvePath('components.json'))
	.write(JSON.stringify(componentsFile, null, '  '), 'utf8')
	.end('\n');

// 添加到 vue-element-components.d.ts
const tsPath = resolvePath('types/vue-element-components.d.ts');

let tsText = `${fs.readFileSync(tsPath)}
/** ${componentName} Component */
export class ${componentName} extends ${upperCamelcase(dirname)} {}`;

const index = tsText.indexOf('/**') - 1;
const importString = `import {${componentName} as ${upperCamelcase(dirname)}} from './${dirname}'`;

tsText = tsText.slice(0, index) + importString + '\n' + tsText.slice(index);

fileSave(tsPath)
	.write(tsText, 'utf8')
	.end('\n');

// 创建 component
Files.forEach(file => {
	fileSave(file.filename)
		.write(file.content, 'utf8')
		.end('\n');
});

console.log('DONE!');
