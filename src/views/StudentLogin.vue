<template>
    <div class="login_container">
        <div class="login_box">
            <!--            头像区域-->
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <!--        表单区-->

            <div>
                <el-tabs :tab-position="tabPosition" v-model="activeName" style="height: 200px;">
                    <el-tab-pane label="学生登录" name="first">
                        <el-form @submit.native.prevent ref="adminFormRef" :model="student" :rules="adminFormRules"
                                 label-width="0px"
                                 class="login_form">
                            <!--                用户名-->
                            <el-form-item prop="name">
                                <el-input size="medium" v-model="student.name" prefix-icon="el-icon-user-solid"></el-input>
                            </el-form-item>
                            <!--                密码-->
                            <el-form-item prop="password">
                                <el-input size="medium" v-model="student.password" prefix-icon="el-icon-lock" show-password></el-input>
                            </el-form-item>

                            <!--                按钮区-->
                            <el-form-item class="btns">
                                <el-button size="small" plain type="success" @click="login" native-type="submit">登录</el-button>
                                <el-button size="small" plain type="danger" @click="resetLoginFrom">重置</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="link"
                                           round
                                           @click="noAdmin"
                                           size="mini">
                                    没有账号？
                                </el-button>
                                <el-button class="link"
                                           type="text"
                                           round
                                           autocapitalize="off"
                                           size="mini"
                                           @click="handlePass">
                                    找回密码
                                </el-button>
                                <el-link href="http://localhost:8080/login" type="warning">管理员登陆</el-link>
                                <el-link style="margin-left: 8px" href="http://localhost:8080/teacherLogin" type="success">教师登录</el-link>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="邮箱登录" name="second">
                        <div>
                            <el-form @submit.native.prevent ref="adminFormRefEmail" :model="student"
                                     :rules="adminFormRulesEamil"
                                     label-width="0px"
                                     class="login_form">
                                <!--                用户名-->
                                <el-form-item prop="email">
                                    <el-input size="medium" v-model="student.email" prefix-icon="el-icon-user"></el-input>
                                </el-form-item>
                                <!--                密码-->
                                <el-form-item prop="code">
                                    <el-input size="medium" v-model="student.code" prefix-icon="el-icon-message"
                                              style="width: 360px"></el-input>
                                    <el-button size="medium" plain type="primary" style="margin-left: 5px;" @click="sendEmailCode(1)">
                                        获取验证码
                                    </el-button>
                                </el-form-item>

                                <!--                按钮区-->
                                <el-form-item class="btns">
                                    <el-button size="small" plain type="success" @click="loginEmail" native-type="submit">登录
                                    </el-button>
                                    <el-button size="small" plain type="danger" @click="resetLoginFromEamil">重置</el-button>
                                </el-form-item>
                                <el-form-item>
                                <el-button class="link"
                                           round
                                           @click="noAdmin"
                                           size="mini">
                                    没有账号？
                                </el-button>
                                <el-button class="link"
                                           type="text"
                                           round
                                           autocapitalize="off"
                                           size="mini"
                                           @click="handlePass">
                                    找回密码
                                </el-button>
                                    <el-link href="http://localhost:8080/login" type="warning">管理员登陆</el-link>
                                    <el-link style="margin-left: 8px" href="http://localhost:8080/teacherLogin" type="success">教师登录</el-link>
                                </el-form-item>
                            </el-form>
                        </div>

                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>

        <!--找回密码对话框-->
        <el-dialog
                title="找回密码"
                :visible.sync="dialogVisible"
                width="40%"
                style="margin-top: 100px"
        >
            <!--            内容区域-->
            <el-form :label-position="labelPosition" style="margin-left: 15px" label-width="60px">
                <el-form-item label="邮箱" prop="email">
                    <el-input size="medium" v-model.trim="pass.email" prefix-icon="el-icon-edit"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input size="medium" v-model="pass.code" prefix-icon="el-icon-message"
                              style="width: 375px"></el-input>
                    <el-button size="medium"  plain type="primary"  style="margin-left: 8px;" @click="sendEmailCode(2)">
                        获取验证码
                    </el-button>
                </el-form-item>
            </el-form>

            <!--            底边按钮区域-->
            <span slot="footer" class="dialog-footer">

                        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                        <el-button size="medium" type="primary" @click="passwordBack">重置密码</el-button>
                      </span>
        </el-dialog>

    </div>


</template>

<script>
    import request from "@/utils/request";
    import {setRouters} from "@/router";


    export default {

        data() {
            return {
                labelPosition: 'left',
                //tasb标签页设置左侧
                tabPosition: 'left',
                //默认密码登录标签页
                activeName: 'first',
                //找回密码谈话狂
                dialogVisible: false,
                //登陆表单的数据绑定对象
                student: {},
                radio:{},
                code: '',
                //表单验证规则对象
                adminFormRules: {
                    //验证用户名
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    //验证密码
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change'}
                    ]
                },
                adminFormRulesEamil: {
                    //验证用户名
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ],
                    //验证密码
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 1, max: 4, message: '长度4位', trigger: 'change'}
                    ]
                },
                pass: {}
            };
        },
        methods: {
            //重置密码登录表单
            resetLoginFrom() {
                this.$refs.adminFormRef.resetFields();
            },
            //重置邮箱登录表单
            resetLoginFromEamil() {
                this.$refs.adminFormRefEmail.resetFields();
            },

            //点击获取验证码按钮
            sendEmailCode(type) {
                let email;
                if (type === 1) {
                    email = this.student.email
                } else if (type === 2) {
                    email = this.pass.email
                }

                if (!email) {
                    this.$message.warning('请输入邮箱账号')
                    return
                }
                if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email)) {
                    this.$message.warning('请输入正确邮箱账号')
                    return
                }
                //发送邮箱验证码
                this.request.get("http://localhost:9090/student/email/" + email + "/" + type).then(res => {
                    if (res.code === '200') {
                        this.$message.success('发送成功')
                    } else {
                        this.$message.error(res.message)
                    }
                })

            },
            //点击没有账号按钮
            noAdmin() {
                const h = this.$createElement;

                this.$notify({
                    title: '没有账号',
                    message: h('i', {style: 'color: teal'}, '请联系该系统管理员电话：138XXXXXXXX'),
                    showClose: false,
                    duration: 2000
                });
            },
            //点击找回密码谈话框
            handlePass() {
                this.dialogVisible = true
                this.pass = {}
            },
            passwordBack() {
                this.request.put("http://localhost:9090/student/reset", this.pass).then(res => {
                    if (res.code === '200') {
                        this.$message.success("重置密码成功,新密码为:123456,请尽快修改密码")
                        this.dialogVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //登录按钮 表单预验证
            login() {
                this.$refs['adminFormRef'].validate((valid) => {
                    if (valid) {  //表单校验合法
                        this.request.post("http://localhost:9090/student/login", this.student).then(res => {
                            if (res.code === '200') {
                                localStorage.setItem("student", JSON.stringify(res.data))//存储用户信息到浏览器
                                localStorage.setItem("menus", JSON.stringify(res.data.menus))//存储用户信息到浏览器
                                //动态设置当前用户的路由
                                setRouters()
                                this.$message.success('登陆成功');
                                this.$router.push('/home')
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        this.$message.warning('请输入用户名和密码')
                        return false;
                    }
                });
            },
            loginEmail() {
                this.$refs['adminFormRefEmail'].validate((valid) => {
                    if (valid) {  //表单校验合法
                        this.request.post("http://localhost:9090/student/loginEmail", this.student).then(res => {
                            if (res.code === '200') {
                                localStorage.setItem("student", JSON.stringify(res.data))//存储用户信息到浏览器
                                localStorage.setItem("menus", JSON.stringify(res.data.menus))//存储用户信息到浏览器
                                this.$message.success('登陆成功');
                                this.$router.push('/home')
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        this.$message.warning('请输入邮箱和验证码')
                        return false;
                    }
                });
            },

        }
    };

</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 650px;
        height: 330px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
    }

    .avatar_box {
        background-color: #ffffff;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100px;
        width: 100px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;

    }

    .login_form {
        position: fixed;
        bottom: 0;
        top: 85px;
        width: 80% !important;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .el-tabs {
        margin-top: 80px;
        padding-top: 20px;
        overflow: hidden;
    }


    .link {
        background-color: #33CCCC;
        float: right;
        margin-right: 5px;
        color: #003366;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
        /*margin-right: 150px;*/

    }
</style>
