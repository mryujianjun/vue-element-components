<template>
    <el-menu-item
        v-if="menu.children.length === 0"
        v-bind="menu">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
    </el-menu-item>
    <el-submenu
        v-else
        v-bind="menu"
        :index="menu.index">
        <template slot="title">
            <i :class="menu.icon"></i> {{menu.title}}
        </template>
        <i-menu-item v-for="(subMenu, key) in menu.children" :key="key" :menu="subMenu"></i-menu-item>
    </el-submenu>
</template>

<script>

	/** @type {IMenuItem} */
	export default {
		name: 'IMenuItem',
		props: {
			/** @type {IMenuItemData} */
			menu: {
				type: Object,
				required: true
			}
		}
	};
</script>

<style scoped>

</style>
