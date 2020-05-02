const path = require('path');
const fs = require('fs');

const docsDir = 'docs';
const docPath = path.resolve(__dirname, `../${docsDir}`);
const files = fs.readdirSync(docPath);
console.log();
module.exports = {
	base: process.env.NODE_ENV === 'production' ? '/iui-docs/' : '/',
	dest: path.resolve(__dirname, '../../iui-docs'),
	title: 'Vue Element Components',
	description: '一个基于Element UI的中台组件库',
	// 注入到当前页面的 HTML <head> 中的标签
	head: [
		['link', {rel: 'icon', href: 'https://mryujianjun.cn/svg/favicon.svg'}],
	],
	themeConfig: {
		// logo: 'https://mryujianjun.cn/svg/favicon.svg', // '/assets/favicon.svg',
		nav: [
			{text: 'Home', link: '/'},
			// {text: 'Guide', link: '/guide/'},
			{text: 'Vue Admin', link: 'https://mryujianjun.cn/vue-admin/', target: '_blank'}
		],
		sidebarDepth: 0,
		// sidebar: 'auto',
		// '/docs/table-list': {
		// 	sidebar: 'auto'
		// },
		sidebar: [
			'/guide',
			// '/docs/menu',
			// '/docs/table-list',
			...files.map(file => {
				return `/${docsDir}/${file}`;
			})
		],
		displayAllHeaders: true, // 默认值：false
		lastUpdated: true, // string | boolean

		// 假如你的文档仓库和项目本身不在一个仓库：
		docsRepo: 'mryujianjun/vue-element-components',
		// 假如文档不是放在仓库的根目录下：
		docsDir: 'example/docs',
		// 假如文档放在一个特定的分支下：
		docsBranch: 'master',
		// 默认是 false, 设置为 true 来启用
		editLinks: true,
		// 默认为 "Edit this page"
		editLinkText: '编辑此页面内容～',
		configureWebpack: {
			resolve: {
				alias: {
					// '@alias': 'path/to/some/dir'
				}
			}
		}
	}
}
