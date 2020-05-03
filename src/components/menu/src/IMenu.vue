<template>
  <el-menu
    class="IMenu"
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

  export default {
    name: 'IMenu',
    components: {MenuItem: IMenuItem},
    props: {
      data: {
        type: Array,
        required: true,
      },
      height: {
        type: String,
        default: '100%'
      },
    }
  };
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>

</style>
