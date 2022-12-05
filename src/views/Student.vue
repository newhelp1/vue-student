<template>
    <div>
        <!--            添加用户对话框-->
        <div>
            <el-dialog
                    title="添加用户"
                    :visible.sync="dialogVisible"
                    width="40%"
                    style="margin-top: -50px"
                    :before-close="addhandleClose"
            >
                <!--添加用户内容主体区域-->
                <div class="zhuti">
                    <el-form class="add" size="small" label-width="130px" :model="add" :rules="addRules"
                             ref="addFormRef">
                        <el-form-item style="margin-top: 20px" label="学号" prop="sno">
                            <el-input v-model.trim="add.sno" placeholder="请输入学生学号"></el-input>
                        </el-form-item >
                        <el-form-item label="账号" prop="name">
                            <el-input v-model.trim="add.name" placeholder="请输入学生账号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="nickname">
                            <el-input v-model.trim="add.nickname" placeholder="请输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <template>
                                <el-radio v-model="add.sex" label="男">男</el-radio>
                                <el-radio v-model="add.sex" label="女">女</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model.trim="add.email" placeholder="请输入学生邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model.trim="add.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                        <el-form-item label="住址" prop="address">
                            <el-input v-model.trim="add.address" placeholder="请输入家庭住址"></el-input>
                        </el-form-item>
                        <!--                    <el-form-item label="入职日期">-->
                        <!--                        <el-date-picker-->
                        <!--                                v-model="add.creatTime"-->
                        <!--                                type="date"-->
                        <!--                                align="center"-->
                        <!--                                value-format="yyyy-MM-dd"-->
                        <!--                                placeholder="请选择入职日期">-->
                        <!--                        </el-date-picker>-->
                        <!--                    </el-form-item>-->
                        <el-form-item label="学院" prop="college">
                            <el-select style="margin-left: 5px" v-model="add.collegeId" placeholder="请选择学院">
                                <el-option v-for="item in colleges" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业" prop="major" >
                            <el-select style="margin-left: 5px" v-model="add.majorId" placeholder="请选择专业">
                                <el-option v-for="item in collegeMajors" v-if="item.pid===add.collegeId" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="年级" prop="grade" >
                            <el-select style="margin-left: 5px" v-model="add.gradeId" placeholder="请选择年级">
                                <el-option v-for="item in grades" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="班级" prop="classes">
                            <el-select style="margin-left: 5px" v-model="add.classesId" placeholder="请选择班级">
                                <el-option v-for="item in classess" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>


                    </el-form>
                </div>

                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="CancelBtn">取 消</el-button>
                    <el-button type="primary" @click="saveDialogBtn">确 定
                    </el-button>
                </div>
            </el-dialog>

        </div>


        <!--查看列表对话框-->
        <el-dialog
                title="查看"
                :visible.sync="looldialogVisible"
                width="50%"
                style="margin-top: 50px"
        >
            <template>
                <el-descriptions class="margin-top" title="个人信息" :column="3" :model="des" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        <el-tag size="small">学生</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-star-on"></i>
                            编号
                        </template>
                        {{this.des.sno}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            姓名
                        </template>
                        {{this.des.nickname}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            账号
                        </template>
                        {{this.des.name}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-reading"></i>
                            性别
                        </template>
                        {{this.des.sex}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            手机号
                        </template>
                        {{this.des.phone}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            居住地
                        </template>
                        {{this.des.address}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-date"></i>
                            入职时间
                        </template>
                        {{this.des.creatTime}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-bank-card"></i>
                            学院
                        </template>
                        {{this.des.collegeName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-news"></i>
                            专业
                        </template>
                        {{this.des.majorName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-files"></i>
                            年级
                        </template>
                        {{this.des.gradeName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-reading"></i>
                            班级
                        </template>
                        {{this.des.classesName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-promotion"></i>
                            邮箱
                        </template>
                        {{this.des.email}}
                    </el-descriptions-item>
                </el-descriptions>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="looldialogVisible = false">取 消</el-button>
              </span>
        </el-dialog>

        <!--        面包屑-->
        <el-breadcrumb style="font-size: 15px;font-weight: 300" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">
            <el-input style="width: 200px"
                      placeholder="请输入姓名"
                      suffix-icon="el-icon-search"
                      v-model.trim="nickname"
                      clearable>
            </el-input>

<!--            <el-select style="margin-left: 5px" class="select" placeholder="请选择性别" v-model.trim="sex">-->
<!--                <el-option label="男" value="男"></el-option>-->
<!--                <el-option label="女" value="女"></el-option>-->
<!--            </el-select>-->
            <el-select clearable style="margin-left: 5px" v-model="collegeId" placeholder="请选择学院">
                <el-option v-for="item in colleges" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
            </el-select>
            <el-select  clearable  style="margin-left: 5px" v-model="majorId" placeholder="请选择专业">
                <el-option  v-for="item in collegeMajors" v-if="item.pid===collegeId"  :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
            </el-select>
            <el-select clearable style="margin-left: 5px" v-model="gradeId" placeholder="请选择年级">
                <el-option v-for="item in grades" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
            </el-select>
            <el-select clearable style="margin-left: 5px" v-model="classesId" placeholder="请选择班级">
                <el-option v-for="item in classess" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
            </el-select>
            <el-button style="margin-left: 8px" @click="searchBtn" type="primary"> 搜索</el-button>
            <el-button style="margin-left: 8px" type="warning" @click="releaseBtn" icon="el-icon-s-release">
                重置
            </el-button>

        </div>
        <!--   新增用户-->

        <div class="addAndDelete" >
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addBtn">新增学生
            </el-button>
            <el-popconfirm
                    style="margin-left: 10px"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除吗？"
                    @confirm="delBatch"
            >
                <el-button slot="reference" type="danger" size="small"><i class="el-icon-circle-close"></i>
                    批量删除
                </el-button>
            </el-popconfirm>
        </div>


        <el-table @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#eee',color:'#333366'}" :data="tableData" border stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" type="index" label="#"></el-table-column>
            <el-table-column align="center" width="60" prop="sno" label="学号"></el-table-column>
            <el-table-column align="center" width="70" prop="nickname" label="姓名"></el-table-column>
            <el-table-column align="center" width="50" prop="sex" label="性别"></el-table-column>
<!--            <el-table-column align="center" prop="email" label="邮箱"></el-table-column>-->
<!--            <el-table-column align="center" prop="address" label="地址"></el-table-column>-->
<!--            <el-table-column align="center" prop="creatTime" label="入职时间"></el-table-column>-->
<!--            <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>-->
            <el-table-column align="center" width="180" prop="collegeName" label="学院"></el-table-column>
            <el-table-column align="center" width="160" prop="majorName" label="专业"></el-table-column>
            <el-table-column align="center" width="80"  prop="gradeName" label="年级"></el-table-column>
            <el-table-column align="center" width="80"  prop="classesName" label="班级"></el-table-column>
            <el-table-column align="center" prop="role" label="角色" >
                <el-tag size="small">学生</el-tag>
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.status"
                            @change="changeStatus(scope.row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <el-button @click="editBtn(scope.row)" type="success"><i class="el-icon-edit"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="查看" placement="top" :enterable="false">
                        <el-button style="margin-left: 5px" type="warning"
                                   icon="el-icon-tickets"
                                   @click="look(scope.row)">

                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-popconfirm
                                style="margin-left: 5px"
                                confirm-button-text='确定'
                                cancel-button-text='我再想想'
                                icon="el-icon-info"
                                icon-color="red"
                                title="您确定删除吗？"
                                @confirm="deleteById(scope.row.id)"
                        >
                            <el-button slot="reference" type="danger"><i class="el-icon-delete"></i>

                            </el-button>
                        </el-popconfirm>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>


        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script scoped>
    import request from "@/utils/request";

    export default {
        name: "Student",
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
                tableData: [],   //控制添加用户对话框隐藏
                dialogVisible: false,
                //添加用户表单数据
                add: {},
                //查看
                des: {},
                //批量删除
                multipleSelection: [],
                //查看用户对话框
                looldialogVisible: false,
                //分页
                //总页数
                total: 0,
                pageNum: 1,
                pageSize: 10,

                //模糊查询
                nickname: '', //姓名

                // sex: '',
                //学院
                collegeId: '',
                colleges:[],
                //专业
                majorId:'',
                collegeMajors:[],
                //年级
                gradeId: '',
                grades: [],
                //班级
                classesId: '',
                classess: [],

                //添加用户表单验证
                addRules: {
                    sno: [
                        {required: true, message: '请输入编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    nickname: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
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
                    // college: [
                    //     {required: true, message: '请选择学院', trigger: 'blur'},
                    // ],
                    // major: [
                    //     {required: true, message: '请选择专业', trigger: 'blur'},
                    // ],
                    // grade: [
                    //     {required: true, message: '请选择年级', trigger: 'blur'},
                    // ],
                    // classes: [
                    //     {required: true, message: '请选择班级', trigger: 'blur'},
                    // ],

                },
            }
        },
        created() {
            this.load()

        },
        methods: {
            //请求数据
            load() {
                this.request.get("student/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        nickname:this.nickname,
                        collegeId:this.collegeId,
                        majorId:this.majorId,
                        gradeId:this.gradeId,
                        classesId:this.classesId,
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.data.records
                    console.log(this.tableData)
                    // if (this.tableData.role=='ROLE_STUDENT'){
                    //     this.tableData.role='学生'
                    // }
                    this.total = res.data.total
                })

                // this.request.get("college/findall").then(res => {
                //     if (res.code === '200') {
                //         this.colleges = res.data
                //     }
                // })
                this.request.get("college/parent").then(res => {
                    // console.log(res);
                    this.colleges= res.data
                })

                this.request.get("college/children").then(res => {
                    // console.log(res.data[0].pid);
                    this.collegeMajors= res.data
                    // console.log(this.collegeMajors[0].pid);
                })

                this.request.get("grade").then(res => {
                    // console.log(res);
                    this.grades = res.data
                })
                this.request.get("classes").then(res => {
                    // console.log(res);
                    this.classess = res.data
                })

            },
            //监听 分页
            handleSizeChange(pageSize) {
                // console.log(`每页 ${pageSize} 条`);
                this.pageSize = pageSize
                this.load()
            },
            //监听页码值 改变的事件
            handleCurrentChange(pageNum) {
                // console.log(`当前页: ${pageNum}`);
                this.pageNum = pageNum
                this.load()
            },
            //搜索框
            searchBtn() {
                this.load()
            },
            //重置按钮
            releaseBtn() {
                this.nickname =''
                this.collegeId =''
                this.majorId=''
                this.gradeId=''
                this.classesId=''
                this.load()
            },
            // 添加按钮
            addBtn() {
                this.dialogVisible = true
                this.add = {}


                // //处理未来元素
                // this.$nextTick(() => {
                //     this.$refs.addUploadRef.clearFiles()
                // })
            },
            //修改状态
            changeStatus(row) {
                // let student =localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {}
                // if (student.id===row.id && !row.status){
                //     row.status=true
                //     this.$message.warning('禁止修改本人状态');
                //     return
                // }
                this.request.post("student", row).then(res => {
                    // console.log(row)
                    if (res.code === '200') {
                        //可以发起添加用户网络请求
                        this.$message.success('操作成功');
                        this.load()
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            },
            //点击添加   取消按钮
            CancelBtn() {
                this.$message.warning('取消操作')
                this.add = {}
                this.$refs.addFormRef.resetFields();
                this.dialogVisible = false
            },
            addhandleClose() {
                this.$refs.addFormRef.resetFields();
                this.$message.warning('取消操作')
                this.dialogVisible = false
                this.add = {}
            },
            //编辑用户按钮
            editBtn(row) {
                this.load()
                this.add = row
                this.dialogVisible = true
            },

            //点击添加用户确定按钮 添加用户
            saveDialogBtn() {
                this.$refs['addFormRef'].validate((valid) => {
                    if (valid) {
                        this.request.post("student", this.add).then(res => {
                            if (res.code === '200') {
                                //可以发起添加用户网络请求
                                this.$message.success('操作成功');
                                //隐藏添加对话框
                                this.dialogVisible = false
                                this.load()
                                // this.$refs.addFormRef.resetFields();
                            } else {
                                this.$message.warning(res.message)
                            }
                        })
                    } else {
                        this.$message.error('请填写数据')
                        return false;
                    }
                });
            },
            //点击查看按钮
            look(row) {
                this.load()
                this.des = row
                this.looldialogVisible = true
            },
            //根据id删除对应用户
            deleteById(id) {
                this.request.delete("student/" + id).then(res => {
                    if (res.code === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.load()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //批量删除
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val
            },
            delBatch() {
                if (this.multipleSelection.length === 0) {
                    return this.$message.error('请选择删除对象')
                }
                let ids = this.multipleSelection.map(v => v.id)
                request.post("student/del/batch", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                        this.listCollege()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .addAndDelete {
        margin-bottom: 10px;
    }

    .add {
        width: 90% !important;
        margin-top: -20px;
        margin-bottom: -30px;
    }
    .zhuti{
        height: 60vh;
        overflow: auto;
    }


</style>
