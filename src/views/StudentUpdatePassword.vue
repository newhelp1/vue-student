<template>

    <el-card style="width: 1000px;margin: 100px auto;padding-top: 30px; padding-left: -30px">
        <div slot="header" >
            <span class="header">学生修改密码</span>
        </div>
        <el-form :label-position="labelPosition" label-width="120px" :model="form" :rules="rules"  ref="pass">

            <el-form-item  label="原密码" prop="password">
                <el-input  prefix-icon="el-icon-unlock" v-model="form.password" show-password> </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input prefix-icon="el-icon-lock" v-model="form.newPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
                <el-input prefix-icon="el-icon-connection" v-model="form.confirmPassword" show-password></el-input>

            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button size="medium" type="success" @click="save">确 定  <i class="el-icon-check"></i></el-button>
                <el-button size="medium" type="info" @click="noSaveBtn" show-ico>取 消 <i class="el-icon-close"></i></el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script scoped>
    export default {
        name: "UpdatePassword",
        data() {
            return {
                form: {},
                labelPosition: 'left',
                student: localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {},
                rules: {
                    password: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请确认新密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change'}
                    ],
                }
            }
        },
        created() {

            this.form.name = this.student.name
        },
        methods:{
            save(){
                this.$refs.pass.validate((valid)=>{
                    if (valid){
                        if (this.form.newPassword!==this.form.confirmPassword){
                            this.$message.warning("2次密码输入不相同")
                            return false
                        }
                        this.request.post("http://localhost:9090/student/password",this.form).then(res=>{
                            if (res.code==='200'){
                                this.$message.success("修改成功")
                                this.$router.push('/studentIndividual')
                            }else {
                                this.$message.error(res.message)
                            }
                        })
                    }else {
                        this.$message.error("请输入数据")
                    }
                })
            },
            noSaveBtn() {
                this.$message.warning("取消修改")
                this.$router.push('/home');
            },
        }

    }

</script>

<style scoped>
    .header{
        font-size: 20px;
        font-weight: 400;
        color: #3366CC;
    }
</style>
