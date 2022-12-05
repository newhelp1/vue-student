<template>
    <div style="height: 100%;" >
        <el-container style="height:100%;">
            <el-aside  :width="sideWidth + 'px' " style="background-color: rgb(238, 241, 246);height: 100%;">
                <Aside :is-collapse="isCollapse" :logoTextShow="logoTextShow" />
            </el-aside>

            <el-container>
                <el-header  v-if="teacher" style=" border-bottom: 1px solid #cccccc;">
                    <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :teacher="teacher"  />
                </el-header>
                <el-header  v-else-if="admin" style=" border-bottom: 1px solid #cccccc;">
                    <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :admin="admin"  />
                </el-header>
                <el-header  v-else-if="student" style=" border-bottom: 1px solid #cccccc;">
                    <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" :student="student"  />
                </el-header>




                <el-main >
<!--                    接受AdminIndividual数据&ndash;&gt;-->
                    <router-view @refreshAdmin="getAdmin" @refreshTeacher="getTeacher" @refreshStudent="getStudent" ></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import Aside from "@/components/Aside";
    import Header from "@/components/Header";

    export default {
        name: 'HomeView',
        data() {
            return {
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false,
                sideWidth: 200,
                logoTextShow: true,
                admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {},
                teacher: localStorage.getItem("teacher") ? JSON.parse(localStorage.getItem("teacher")) : {},
                student: localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {}

            }
        },
        created() {
          this.getAdmin()
          this.getTeacher()
          this.getStudent()
        },
        components: {
            Aside,
            Header,
        },
        methods: {
            collapse() { //收缩按钮
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) { //收缩
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logoTextShow = false
                    this.sideWidth = 64
                } else {
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logoTextShow = true
                    this.sideWidth = 200
                }
            },
            //从后台获取admin数据
            getAdmin(){
                    this.request.get("http://localhost:9090/admin/name/" + this.admin.name).then(res =>{
                        this.admin =res.data
                    })

            },
            getTeacher(){
                this.request.get("http://localhost:9090/teacher/name/" + this.teacher.name).then(res =>{
                    this.teacher =res.data
                })

            },
            getStudent(){
                this.request.get("http://localhost:9090/student/name/" + this.student.name).then(res =>{
                    this.student =res.data
                    // console.log(this.student.img)
                })

            },

        }
    }
</script>qwe

