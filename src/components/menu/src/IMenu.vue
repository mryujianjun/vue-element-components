<template>
    <el-menu
        v-bind="$attrs"
        v-on="$listeners"
        :style="{height: height}">
        <menu-item
            v-for="(menu, index) in data"
            :key="index"
            :menu="menu">
        </menu-item>
    </el-menu>
</template>

<script>
	import IMenuItem from './IMenuItem';

	/** @type {IMenu} */
	export default {
		name: 'IMenu',
		components: {MenuItem: IMenuItem},
		props: {
			/** @type {IMenuData} */
			data: {
				type: Array,
				required: true,
			},
			/** @type {IMenu.height} */
			height: {
				type: String,
				default: '100%'
			},
		}
	};
</script>

<style scoped>

</style>
