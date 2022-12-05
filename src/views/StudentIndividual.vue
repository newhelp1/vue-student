<template>

    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <div>
                <el-form  @submit.native.prevent ref="studentFormRef" :model="student" :rules="studentFormRules"
                         class="login_form">


                    <el-tooltip class="item" effect="dark" content="修改头像" :enterable="false" placement="top">
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:9090/files/upload/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                        >
                            <img v-if="student.img" :src="student.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-tooltip>


                    <el-form-item prop="no">
                        <el-input size="mini" placeholder="请修改学号" v-model="student.sno"
                                  prefix-icon="el-icon-user-solid"
                                  disabled>
                        </el-input>
                    </el-form-item>
                    <!--                用户名-->
                    <el-form-item prop="name">
                        <el-input size="mini" placeholder="请修改账号" v-model="student.name"
                                  prefix-icon="el-icon-user-solid"
                                  disabled>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="nickname">
                        <el-input size="small" placeholder="请修改个人昵称" v-model="student.nickname"
                                  prefix-icon="el-icon-female"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input size="small" placeholder="请修改个人电话" v-model="student.phone"
                                  prefix-icon="el-icon-phone"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input size="small" placeholder="请修改个人邮箱" v-model="student.email"
                                  prefix-icon="el-icon-connection"></el-input>
                    </el-form-item>
                    <el-form-item    placeholder="请修改性别" prop="sex">
                        <template>
<!--                            <i class="el-icon-female" style="margin-right: 5px"></i>-->
                            <el-radio v-model="student.sex" label="男">男</el-radio>
                            <el-radio v-model="student.sex" label="女">女</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item   prop="address">
                        <el-input size="small" v-model.trim="student.address" placeholder="请输入地址" prefix-icon="el-icon-location"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right">
                        <el-button size="medium " type="primary" @click="inSaveBtn" native-type="submit">确定</el-button>
                        <el-button size="medium " type="success" @click="updatePassword"  show-ico>修改密码</el-button>
                        <el-button size="medium " type="info" @click="noSaveBtn" show-ico>取 消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script scoped>
    import request from "@/utils/request";

    export default {
        name: "individual",
        data() {
            // 验证邮箱的规则
            var checkEmail = (rule, value, cb) => {
                // 验证邮箱的正则表达式
                const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                if (regEmail.test(value)) {
                    // 合法的邮箱
                    return cb()
                }
                cb(new Error('请输入合法的邮箱'))
            }
            //验证手机号的规则
            var checkMobile = (rule, value, cb) => {
                //验证手机号的正则表达式
                const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

                if (regMobile.test(value)) {
                    return cb()
                }
                cb(new Error('请输入合法的手机号'))
            }
            return {
                student: localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {},
                //表单验证规则对象
                studentFormRules: {
                    //验证用户名
                    name: [
                        {required: true, message: '请输入账户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    //验证密码
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change'}
                    ],
                    nickname: [
                        {required: true, message: '请设置个人名称', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkMobile, message: '请输入正确手机号', trigger: 'change'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, message: '请输入正确邮箱', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入家庭地址', trigger: 'blur'},
                    ],
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        created() {
            // this.load()
            this.getstudent().then(res => {
                this.student = res
            })

        },
        methods: {
            async getstudent() {
                return (await this.request.get("http://localhost:9090/student/name/" + this.student.name)).data
            },
            inSaveBtn() {
                this.$refs['studentFormRef'].validate((valid) => {
                    if (valid) {
                        this.request.put("http://localhost:9090/student", this.student).then(res => {
                            if (res.data) {
                                //可以发起添加用户网络请求
                                this.$message.success('修改成功');
                                //隐藏添加对话框
                                this.eidtDialogVisible = false
                                //触发父级更新用户方法
                                this.$emit("refreshStudent")

                                //更新浏览器储存的用户信息
                                this.getstudent().then(res => {
                                    res.token = JSON.parse(localStorage.getItem("student")).token
                                    localStorage.setItem("student", JSON.stringify(res))
                                })

                            } else {
                                this.$message.warning('修改失败')
                            }
                        })
                    } else {
                        this.$message.warning('请修改正确数据')
                        return false;
                    }
                });
            },
            noSaveBtn() {
                this.$message.warning("取消修改")
                this.$router.push('/home');
            },
            updatePassword(){
                this.$router.push('/studentUpdatePassword')
            },
            handleAvatarSuccess(res) {
                //res文件路径
                this.student.img = res.data
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 800px;
        margin: auto;
        height: 610px;

    }
    .avatar-uploader{
        text-align: center;
        margin-top: 0px !important;
        margin-bottom: 10px !important;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
