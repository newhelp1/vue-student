<template>
    <el-menu style="min-height: 100%;overflow: hidden"
             :default-active="path"
             background-color="rgb(48,65,86)"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             unique-opened
             router
    >
        <div style="height: 60px;line-height: 60px;text-align: center">
            <img src="../assets/logo.png" alt=""
                 style="width: 20px;position: relative;top: 5px;margin-right: 5px">
            <b style="color: white" v-show="logoTextShow">后台管理系统</b>
        </div>
        <!--一级菜单-->
        <div v-for="item in menus" :key="item.id" >
            <div v-if="item.path">
                <el-menu-item :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </div>
            <!--二级菜单-->
            <div v-else>
                <el-submenu :index="item.id + '' ">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <div v-for="subItem in item.children" :key="subItem.id">
                        <el-menu-item :index="subItem.path">
                            <i :class="subItem.icon"></i>
                            <span slot="title">{{subItem.name}}</span>
                        </el-menu-item>
                    </div>
                </el-submenu>
            </div>
        </div>


    </el-menu>

</template>

<script scoped>
    import Teacher from "@/views/Teacher";
    export default {
        name: "Aside",
        components: {Teacher},
        data() {
            return {
                path: this.$route.path,
                menus:localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) :[],
            }
        },
        props: {
            isCollapse: Boolean,
            logoTextShow: Boolean,
        },

    }
</script>

<style scoped>

</style>
