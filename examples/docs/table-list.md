## ITableList
name: ITableList
description: 抽象并组合`Table` & `Pagination`，以配置方式调用，避免写过多重复的template
version:
added:
	- 创建该组件
fixed:
	- 完善分页器
	- 支持自定义分页的数量，自定义定制分页布局
	- 页数、分页数量变化的监听
	- 将请求操作合并进来，减少调用配置的复杂度，相应增加了组件使用的单调性
	- 当删除某页最后一条数据时候，自动减一
	- 支持静态数据输入（props.data），优先级大于`onFetch`
	- 支持多选功能（props.selection）
	- 开放内部方法，通过静态声明方式显示继承（eg: inheritMethods），可按需自行增加
	- 新增（props.showList）控制是否展示列表
	- 新增（methods.mapList）方法，开发给外部操作内部`lists`数据
v1.1.1
	- 新增el-card header slot
v1.1.2
	- 给`el-pagination`添加`disabled`属性，避免频繁切换页数，导致数据交叉
	- 增加`setPage`方法，可让外部初始化页数
v1.1.3
	- 增加`selectable` props，仅在支持多选功能（props.selection）下使用
	
v1.0.0

