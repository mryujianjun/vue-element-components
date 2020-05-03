<template>
	<div class="ITableList">
		<el-table
			ref="table"
			v-show="showList"
			v-bind="$attrs"
			v-on="$listeners"
			:data="data || lists"
			v-loading="loading">
			<el-table-column
				v-if="selection"
				type="selection"
				:selectable="selectable"
				width="60">
			</el-table-column>
			<el-table-column
				v-bind="column"
				v-for="(column, index) in columns"
				:key="index">
				<!--
						我们为每个 header column 准备了一个插槽，
						将 `column` 对象作为一个插槽的 prop 传入。
				-->
				<!-- eslint-disable-next-line -->
				<template slot-scope="scope"
				          slot="header">
					<slot
						:name="column.slotsName && column.slotsName.header"
						v-bind:column="column">
						<!-- 后备内容 -->
						{{ column.label }}
					</slot>
				</template>

				<!--
						我们为每个 body column 准备了一个插槽，
						将 `scope` 对象作为一个插槽的 prop 传入。
						`scope` 同原`Element UI`写法
				-->
				<template
					slot="default"
					slot-scope="scope">
					<slot
						:name="column.slotsName && column.slotsName.default"
						v-bind:scope="scope">
						{{ _getValue(column.prop, scope) }}
					</slot>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			v-if="showPager"
			class="i-table-list_pager"
			:disabled="loading"
			:style="{textAlign: pagerPosition}"
			background
			:layout="pagerLayout.join(',')"
			:total="total"
			:page-sizes="pagerSizes"
			:page-size="currentSize"
			@size-change="_handleSizeChange"
			:current-page="currentPage"
			@current-change="_handlePageChange">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'ITableList',
		props: {
			columns: {
				type: Array,
				// 验证每项的配置都必须拥有keys: `['label', 'prop']`
				validator: value => {
					return value.every(item => {
						const requiredProps = ['label', 'prop'];

						return item instanceof Object
							// eslint-disable-next-line no-prototype-builtins
							&& requiredProps.every(prop => item.hasOwnProperty(prop));
					});
				},
				required: true,
			},

			paramsConfig: {
				type: Object,
				default: () => ({currentSize: 'length', currentPage: 'page', total: 'total'})
			},
			showList: {
				type: Boolean,
				default: true
			},
			// 是否展示分页
			showPager: {
				type: Boolean,
				default: true
			},
			pagerLayout: {
				type: Array,
				default: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
			},
			pagerSizes: {
				type: Array,
				default: () => [10, 20, 50, 100],
				validator: (value) => {
					return value && Array.isArray(value) && value.length > 0;
				}
			},

			// 原生模式，直接传递数据，优先级大于 onFetch
			data: {
				type: Array
			},

			// 请求器，返回值 -> Promise
			onFetch: {
				type: Function,
			},

			// 初始化是否自动获取？
			autoFetch: {
				type: Boolean,
				default: true
			},

			// 分页器的位置
			pagerPosition: {
				type: String,
				default: 'left', // left | center | right
				validator: (value) => {
					return ['left', 'center', 'right'].includes(value);
				}
			},
			// 是否开启多选功能
			selection: {
				type: Boolean,
				default: false
			},
			selectable: {
				type: Function,
				default: (/* row, index */) => true
			}
		},
		data() {
			return {
				loading: false,
				currentPage: 1,
				currentSize: this.pagerSizes[0],
				total: 0,
				lists: [],
			};
		},
		created() {
			if (!this.data && this.autoFetch) {
				this.fetch();
			}
			this.$nextTick(() => {
				let table = this.$refs.table;
				let inheritMethods = [
					'clearSelection',
					'toggleRowSelection',
					'toggleAllSelection',
					'toggleRowExpansion',
					'setCurrentRow',
					'clearSort',
					'clearFilter',
					'doLayout',
					'sort',
				];
				for (let key in table) {
					if (inheritMethods.includes(key)) {
						this[key] = table[key];
					}
				}
			});
		},
		methods: {
			_getValue(prop = '', scope) {
				return prop
					.split('.')
					.reduce((accumulator, currentValue) => accumulator[currentValue], scope.row);
			},
			_getParams() {
				let p = {};
				Object.entries(this.paramsConfig).forEach(([key, value]) => {
					p[value] = this[key];
				});
				return p;
			},
			_handlePageChange(page) {
				this.currentPage = page;
				// 不推荐使用`current-change`，尽可能使用`onFetch`来代替
				this.$emit('current-change', page);

				this.fetch();
			},
			// 当有回调执行回调，没有默认初始化每页当数量
			_handleSizeChange(size) {
				this.currentSize = size;
				this.$emit('size-change', size);

				this.fetch();
			},
			// 外部可调用此函数
			fetch() {
				this.loading = true;
				this.onFetch(this._getParams()).then(res => {
					this.lists = res.data.data;
					// TODO x-total-count 做成可配置的
					let total = Number(res.headers['x-total-count']);

					// 当删除某页最后一条数据时候，自动减一
					// lists.length === 0 最后一条删除之后，已经没有数据了，前提条件
					// this.total < total 返回的总数小于之前的总数
					if (this.lists.length === 0 && this.total > total && this.currentPage > 1) {
						this.currentPage--;
						this.fetch(); // 自动在获取一次，不然数据为空
					}

					this.total = total;
				}).finally(() => {
					this.loading = false;
				});
			},

			// 供外部格式化列表
			mapList(callback = (lists) => lists) {
				this.lists = callback(this.lists);
			},

			// 供外部设置当前页数
			setPage(page = 1) {
				this.currentPage = page;
			}
		}
	};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
	.ITableList {
		border-top: 1px solid #EBEEF5;
		border-bottom: 1px solid #EBEEF5;

		.i-table-list_pager {
			margin: 10px 0;
		}
	}
</style>
