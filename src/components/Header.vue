<template>
    <div style="font-size: 12px; line-height: 60px;display: flex">
        <div style="flex: 1; font-size: 20px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
        </div>

            <div v-if="teacher">
                <img :src="teacher.img" alt="" class="headerimg">
            </div>
            <el-dropdown v-if="teacher" style="width: 100px;cursor: pointer">
                <span>{{teacher.nickname}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                <el-dropdown-menu slot="dropdown" style="margin-right: 30px;margin-top: -17px;padding: 10px 10px 5px 10px" >
                    <el-dropdown-item  style="font-size: 16px; text-align: center;color: #3366CC;padding: 3px 0px">
                        <span @click="teacherIndividual">个人信息</span><i style="margin-left: 6px" class="el-icon-edit-outline"></i>
                    </el-dropdown-item>
                    <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                        <span @click="teacerhupdatePwd">修改密码 <i style="margin-left: 3px" class="el-icon-unlock"></i></span>
                    </el-dropdown-item>
                    <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                        <span @click="logoutTeacher">退出 <i style="margin-left: 5px" class="el-icon-switch-button"></i></span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        <div v-else-if="admin">
            <img :src="admin.img" alt="" class="headerimg">
        </div>
        <el-dropdown v-if="admin" style="width: 100px;cursor: pointer">
            <span>{{admin.nickname}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown" style="margin-right: 30px;margin-top: -17px;padding: 10px 10px 5px 10px" >
                <el-dropdown-item  style="font-size: 16px; text-align: center;color: #3366CC;padding: 3px 0px">
                    <span @click="adminIndividual">个人信息</span><i style="margin-left: 6px" class="el-icon-edit-outline"></i>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                    <span @click="updatePwd">修改密码 <i style="margin-left: 3px" class="el-icon-unlock"></i></span>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                    <span @click="logoutAdmin">退出 <i style="margin-left: 5px" class="el-icon-switch-button"></i></span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>


        <div v-else-if="student">
            <img  :src="student.img" alt="" class="headerimg">
        </div>
        <el-dropdown v-if="student" style="width: 100px;cursor: pointer">
            <span>{{student.nickname}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown" style="margin-right: 30px;margin-top: -17px;padding: 10px 10px 5px 10px" >
                <el-dropdown-item  style="font-size: 16px; text-align: center;color: #3366CC;padding: 3px 0px">
                    <span @click="studentIndividual">个人信息</span><i style="margin-left: 6px" class="el-icon-edit-outline"></i>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                    <span @click="studentUpdatePwd">修改密码 <i style="margin-left: 3px" class="el-icon-unlock"></i></span>
                </el-dropdown-item>
                <el-dropdown-item style="font-size:16px;text-align: center;margin-top: 5px;color: #3366CC;padding: 3px 0px">
                    <span @click="logoutStudent">退出 <i style="margin-left: 5px" class="el-icon-switch-button"></i></span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>





    </div>

</template>

<script scoped>
    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            admin: Object,
            teacher: Object,
            student:Object,
            collapse: Function,
        },
        data() {
            return {
            }
        },
        methods:{
            //退出按钮 清空token
            logoutAdmin() {
                this.$router.push('/login');
                localStorage.removeItem("admin")
                localStorage.removeItem("menus")
                this.$message.info("退出成功")
            },
            logoutTeacher() {
                this.$router.push('/login');
                localStorage.removeItem("teacher")
                localStorage.removeItem("menus")
                this.$message.info("退出成功")
            },
            logoutStudent() {
                this.$router.push('/login');
                localStorage.removeItem("student")
                localStorage.removeItem("menus")
                this.$message.info("退出成功")
            },
            updatePwd(){
                this.$router.push('/updatePassword');
            },
            teacerhupdatePwd(){
                this.$router.push('/teacherUpdatePassword');
            },
            studentUpdatePwd(){
                this.$router.push('/studentUpdatePassword');
            },
            adminIndividual(){
                this.$router.push('/adminIndividual');
            },
            teacherIndividual(){
                this.$router.push('/teacherIndividual');
            },
            studentIndividual(){
                this.$router.push('/studentIndividual');
            }
        }
    }
</script>

<style scoped>
    .headerimg {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 15px;
    }
</style>
