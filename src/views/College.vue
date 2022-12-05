<template>
    <div>
        <!--            添加用户对话框-->
        <div>
            <el-dialog
                    title="添加用户"
                    :visible.sync="dialogVisible"
                    width="40%"
                    :before-close="addhandleClose"
            >
                <!--添加用户内容主体区域-->
                <el-form class="add" size="small" label-width="130px" :model="add" :rules="addRules"
                         ref="addFormRef">
                    <el-form-item label="编号" prop="code">
                        <el-input v-model.trim="add.code" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model.trim="add.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="leader">
                        <el-input v-model.trim="add.leader" placeholder="请输入负责人"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="CancelBtn">取 消</el-button>
                    <el-button type="primary" @click="saveDialogBtn">确 定
                    </el-button>
                </div>
            </el-dialog>

        </div>

        <!--设置课程对话框-->
        <el-dialog title="设置课程" :visible.sync="coursedialogVisible"
                   width="60%"
                   :before-close="coursehandleClose">
            <div style="margin-left: -5px">
                <el-select style="margin-left: 5px" v-model="gradeId" placeholder="请选择年级">
                    <el-option v-for="item in grades" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
                <el-select style="margin-left: 5px" v-model="classesId" placeholder="请选择班级">
                    <el-option v-for="item in classess" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
                <el-select style="margin-left: 5px" v-model="courseId" placeholder="请选择课程">
                    <el-option v-for="item in courses" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
                <el-button style="margin-left: 8px" @click="searchCourseBtn" type="success"> 搜索</el-button>
                <el-button style="margin-left: 8px" type="warning" @click="releaseCourseBtn" icon="el-icon-s-release">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addSelect"
                           size="small">新增
                </el-button>
            </div>

            <!--设置课程对话框内容主体区域-->
            <div class="zhuti">
                <el-table :data="courseDate">

                    <el-table-column align="center" label="专业" prop="majorId">
                        <template v-slot="scope">
                            <span v-if="scope.row.majorId">{{MajorDate.find(v=>v.id===scope.row.majorId).name}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="课程" prop="courseId">
                        <template v-slot="scope">
                            <el-select v-model="scope.row.courseId">
                                <el-option v-for="item in courses" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="年级" prop="gradeId">
                        <template v-slot="scope">
                            <el-select v-model="scope.row.gradeId">
                                <el-option v-for="item in grades" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="班级" prop="classesId">
                        <template v-slot="scope">
                            <el-select v-model="scope.row.classesId">
                                <el-option v-for="item in classess" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="日期" prop="weekDay">
                        <template v-slot="scope">
                            <el-select clearable v-model="scope.row.weekDay">
                                <el-option v-for="item in ['周一','周二','周三','周四','周五','周六','周日']" :key="item"
                                           :label="item" :value="item"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="第几节" prop="section">
                        <template v-slot="scope">
                            <el-select clearable v-model="scope.row.section">
                                <el-option v-for="item in ['第一大节','第二大节','第三大节','第四大节','第五大节']" :key="item"
                                           :label="item" :value="item"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <!--删除按钮-->
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                       @click="delCourse(scope.row.id)"></el-button>

                        </template>
                    </el-table-column>

                </el-table>
            </div>

            <div slot="footer" class="dialog-footer">
                <!-- 设置课程对话框底部按钮区-->
                <el-button @click="editCancelBtn1">取 消</el-button>
                <el-button type="success" @click="saveCourse">确 定</el-button>
            </div>
        </el-dialog>


        <!--查看列表对话框-->
        <el-dialog
                title="查看"
                :visible.sync="looldialogVisible"
                width="50%"
                style="margin-top: 50px"
        >
            <template>
                <el-descriptions class="margin-top" title="信息" :column="3" :model="des" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        <el-tag size="small">学院</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-star-on"></i>
                            编号
                        </template>
                        {{this.des.code}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            负责人
                        </template>
                        {{this.des.leader}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            名称
                        </template>
                        {{this.des.name}}
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
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>学院管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">
            <el-input style="width: 200px"
                      placeholder="请输入编号"
                      suffix-icon="el-icon-search"
                      v-model.trim="code"
                      clearable>
            </el-input>

            <el-input style="width: 200px;margin-left: 5px" placeholder="请输入学院名称"
                      suffix-icon="el-icon-message"
                      v-model.trim="name"
                      clearable>
            </el-input>
            <el-button style="margin-left: 8px" @click="searchBtn" type="primary"> 搜索</el-button>
            <el-button style="margin-left: 8px" type="warning" @click="releaseBtn" icon="el-icon-s-release">
                重置
            </el-button>

        </div>
        <!--   新增用户按钮-->
        <div class="addAndDelete">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addBtn()">新增学院
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
                <el-button slot="reference" type="danger" icon="el-icon-circle-close" size="small">批量删除
                </el-button>
            </el-popconfirm>
        </div>
<!--        主体-->
        <el-table @selection-change="handleSelectionChange"
                  row-key="id"
                  highlight-current-row
                  :header-cell-style="{background:'#eee',color:'#333366'}"
                  :data="tableData" border stripe>
            <el-table-column type="selection" width="55"></el-table-column>
<!--            <el-table-column align="center" type="expand" label="#"></el-table-column>-->
            <el-table-column align="center" prop="id" width="100" label="ID"></el-table-column>
            <el-table-column align="center" prop="code" label="编号"></el-table-column>
            <el-table-column align="center" prop="name" label="名称"></el-table-column>
            <el-table-column align="center" prop="leader" label="负责人"></el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">

                    <el-tooltip content="新增专业" placement="top">
                        <el-button @click="addBtn(scope.row.id)" v-if="!scope.row.pid" type="primary"><i class="el-icon-circle-plus"></i>
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="设置课程" placement="top">
                        <el-button @click="handleCourse(scope.row.id)" v-if="scope.row.pid" type="info"><i class="el-icon-notebook-2"></i>
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="编辑学院" placement="top">
                        <el-button @click="editBtn(scope.row)" type="success"><i class="el-icon-edit"></i>
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="查看" placement="top" :enterable="false">
                        <el-button type="warning"
                                   icon="el-icon-tickets"
                                   @click="look(scope.row)">

                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-popconfirm
                                style="margin-left: 10px"
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


    </div>
</template>

<script scoped>
    import request from "@/utils/request";

    export default {
        name: "College",
        data() {
            return {
                tableData: [],   //控制添加用户对话框隐藏
                courseDate: [],
                MajorDate: [],
                CollegeDate: [],
                dialogVisible: false,
                //添加用户表单数据
                add: {},
                //查看
                des: {},
                //批量删除
                multipleSelection: [],
                //查看用户对话框
                looldialogVisible: false,
                coursedialogVisible: false,
                colleges: [],
                code: '',
                name: '',
                collegeId: '',

                gradeId: '',
                classesId: '',
                courseId: '',

                courses: [],
                grades: [],
                classess: [],


                //添加用户表单验证
                addRules: {
                    code: [
                        {required: true, message: '请输入学院编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入学院名称', trigger: 'blur'},
                    ],
                    leader: [
                        {required: true, message: '请输入负责人', trigger: 'blur'},
                    ],

                },

                majorId: null,
                collegesId: null,
            }
        },
        created() {
            this.load()
        },
        methods: {
            //请求数据
            load() {
                this.request.get("college", {
                    params: {
                        // pageNum: this.pageNum,
                        // pageSize: this.pageSize,
                        code: this.code,
                        name: this.name,
                    }
                }).then(res => {
                    this.tableData = res.data
                    // console.log( this.tableData)
                })


                this.request.get("college/children").then(res => {
                    // console.log(res);
                    this.MajorDate = res.data
                    // console.log( this.MajorDate[0].pid)
                })
                this.request.post("course/findCompulsory").then(res => {
                    // console.log(res);
                    this.courses = res.data
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
            loadCourse() {
                this.request.get("select/major/" + this.majorId ).then(res => {
                    this.courseDate = res.data
                })
            },//设置课程里边的新增按钮
            addSelect() {
                // this.request.get("course").then(res => {
                // })
                this.courseDate.push({majorId: this.majorId})
                // this.courseDate.push({collegeId: this.collegeId})
            },
            //删除课程
            delCourse(id) {
                const index = this.courseDate.findIndex(v => v.id === id)
                this.courseDate.splice(index, 1)
            },
            //点击修改课程里边的取消按钮
            editCancelBtn1() {
                this.coursedialogVisible = false
                this.$message.info('取消添加课程')

            },
            coursehandleClose() {
                this.coursedialogVisible = false
                this.$message.info('取消操作')
                this.gradeId = ""
                this.classesId = ""
                this.courseId = ""
            },
            saveCourse() {
                if (!this.courseDate.length) {
                    this.$message.info('未选课程')
                    this.coursedialogVisible = false
                }
                // 多课程id进行去重 然后对比原数组是否有重复的课程
                if (new Set(this.courseDate.map(v => v.courseId + v.gradeId + v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                    this.$message.error('课程冲突')
                    return
                }
                if (new Set(this.courseDate.map(v => v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                    this.$message.error('时间冲突')
                    return;
                }
                this.request.post("http://localhost:9090/select/teacher/" + this.majorId, this.courseDate).then(res => {
                    if (res.code === '200') {
                        //可以发起添加用户网络请求
                        this.$message.success('保存成功');
                        //隐藏添加对话框
                        this.coursedialogVisible = false
                        this.loadCourse()
                    } else {
                        this.$message.warning(res.message)
                        this.coursedialogVisible = true
                    }
                })
            },
            //搜索框
            searchBtn() {
                this.load()
            },
            //重置按钮
            releaseBtn() {
                this.code = ""
                this.name = ""
                this.load()
            },
            releaseCourseBtn() {
                this.gradeId = ""
                this.classesId = ""
                this.courseId = ""
                this.load()
                this.loadCourse()
            },
            searchCourseBtn() {
                this.request.get("select/course", {
                    params: {
                        gradeId: this.gradeId,
                        majorId: this.majorId,
                        classesId: this.classesId,
                        courseId: this.courseId
                    }
                }).then(res => {
                    this.courseDate = res.data
                    this.load()
                })

            },
            // 添加按钮
            addBtn(pid) {
                this.dialogVisible = true
                this.add = {}
                if (pid) {
                    this.add.pid = pid
                }

            },
            //设置课程按钮
            handleCourse(majorId) {
                this.majorId = majorId
                this.load()
                this.loadCourse()
                this.coursedialogVisible = true
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
                        this.request.post("college", this.add).then(res => {
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
                this.request.delete("college/" + id).then(res => {
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
                request.post("college/del/batch", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
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
        margin-top: 5px;
        height: 40vh;
        overflow: auto;
    }



</style>
