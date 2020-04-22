import TableList from './src/ITableList.vue';

/* istanbul ignore next */
TableList.install = function (Vue) {
	Vue.component(TableList.name, TableList);
};

export default TableList;
