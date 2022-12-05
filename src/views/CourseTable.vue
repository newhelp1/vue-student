<template>

    <div style="margin-top: 0px">
        <div style="height: 60px; line-height: 60px;font-size: 20px; font-weight: 700; color: brown;">
            <div style="margin-left: -5px">
                <el-select clearable style="margin-left: 5px" v-model="collegeId" placeholder="请选择学院">
                    <el-option v-for="item in colleges" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
                <el-select clearable style="margin-left: 5px" v-model="majorId" placeholder="请选择专业">
                    <el-option v-for="item in collegeMajors" v-if="item.pid===collegeId" :key="item.id"
                               :label="item.name"
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
                <el-button style="margin-left: 8px" @click="searchCourseBtn" type="success"> 搜索</el-button>
                <el-button style="margin-left: 8px" type="warning" @click="releaseCourseBtn" icon="el-icon-s-release">
                    重置
                </el-button>
                <el-button style="margin-left: 8px" type="primary" @click="lookCourseTable" icon="el-icon-monitor">
                    我的课表
                </el-button>
                <el-button style="margin-left: 8px" type="info" @click="selectCourseTable" icon="el-icon-monitor">
                    选课
                </el-button>
            </div>
        </div>
        <!-- 个人课表-->
        <div>
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="80%"
                    style="margin-top: -85px"
            >
                <el-table border stripe :data="tableData1">
                    <el-table-column label="时间/课程">
                        <template slot-scope="scope">
                            <div v-if="scope.row.section">
                                <div style="margin: 10px 0;color: #E6324A;font-weight: 700">{{scope.row.section.num}}
                                </div>
                                <div style="margin: 10px 0;color: #E6324A;font-weight: 700">{{scope.row.section.time}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="周一">
                        <template slot-scope="scope">
                            <div v-if="scope.row.mon">
                                <div style="margin: 3px 0">{{scope.row.mon.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.mon.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.mon.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.mon.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周二">
                        <template slot-scope="scope">
                            <div v-if="scope.row.tue">
                                <div style="margin: 3px 0">{{scope.row.tue.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.tue.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.tue.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.tue.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周三">
                        <template slot-scope="scope">
                            <div v-if="scope.row.wes">
                                <div style="margin: 3px 0">{{scope.row.wes.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.wes.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.wes.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.wes.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周四">
                        <template slot-scope="scope">
                            <div v-if="scope.row.thu">
                                <div style="margin: 3px 0">{{scope.row.thu.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.thu.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.thu.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.thu.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周五">
                        <template slot-scope="scope">
                            <div v-if="scope.row.fri">
                                <div style="margin: 3px 0">{{scope.row.fri.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.fri.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.fri.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.fri.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周六">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sat">
                                <div style="margin: 3px 0">{{scope.row.sat.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.sat.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.sat.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.sat.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="周日">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sun">
                                <div style="margin: 3px 0">{{scope.row.sun.name}}</div>
                                <div style="margin: 3px 0">{{scope.row.sun.room}}教室</div>
                                <div style="margin: 3px 0" v-if="scope.row.sun.type==='是'">必修课</div>
                                <div style="margin: 3px 0" v-else-if="scope.row.sun.type==='否'">选修课</div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="CancelBtn">取 消</el-button>
                    <el-button type="primary" @click="CancelBtn">确 定
                    </el-button>
                </div>
            </el-dialog>


        </div>
        <div>
            <!--设置课程对话框-->
            <el-dialog title="设置课程" :visible.sync="coursedialogVisible"
                       width="65%"
            >
                <div style="margin-top: 10px">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addSelect"
                               size="small">新增
                    </el-button>
                </div>

                <!--设置课程对话框内容主体区域-->
                <div class="zhuti">
                    <el-table :data="savecourseDate">
                        <el-table-column align="center" label="学号" prop="studentId">
                            <template v-slot="scope">
                                <span v-if="scope.row.studentId">{{StudentDate.find(v=>v.id===scope.row.studentId).sno}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="专业" prop="majorId">
                            <template v-slot="scope">
                                <span v-if="scope.row.majorId">{{MajorDate.find(v=>v.id===scope.row.majorId).name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="年级" prop="gradeId">
                            <template v-slot="scope">
                                <span v-if="scope.row.gradeId">{{GradeDate.find(v=>v.id===scope.row.gradeId).name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="班级" prop="classesId">
                            <template v-slot="scope">
                                <span v-if="scope.row.classesId">{{ClassesDate.find(v=>v.id===scope.row.classesId).name}}</span>
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
                                           @click="delStudentCourse(scope.row.id)"></el-button>

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
        </div>

        <el-table border stripe :data="tableData">
            <el-table-column label="时间/课程">
                <template slot-scope="scope">
                    <div v-if="scope.row.section">
                        <div style="margin: 10px 0;color: #E6324A;font-weight: 700">{{scope.row.section.num}}</div>
                        <div style="margin: 10px 0;color: #E6324A;font-weight: 700">{{scope.row.section.time}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="周一">
                <template slot-scope="scope">
                    <div v-if="scope.row.mon">
                        <div style="margin: 3px 0">{{scope.row.mon.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.mon.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.mon.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.mon.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周二">
                <template slot-scope="scope">
                    <div v-if="scope.row.tue">
                        <div style="margin: 3px 0">{{scope.row.tue.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.tue.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.tue.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.tue.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周三">
                <template slot-scope="scope">
                    <div v-if="scope.row.wes">
                        <div style="margin: 3px 0">{{scope.row.wes.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.wes.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.wes.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.wes.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周四">
                <template slot-scope="scope">
                    <div v-if="scope.row.thu">
                        <div style="margin: 3px 0">{{scope.row.thu.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.thu.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.thu.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.thu.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周五">
                <template slot-scope="scope">
                    <div v-if="scope.row.fri">
                        <div style="margin: 3px 0">{{scope.row.fri.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.fri.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.fri.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.fri.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周六">
                <template slot-scope="scope">
                    <div v-if="scope.row.sat">
                        <div style="margin: 3px 0">{{scope.row.sat.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.sat.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.sat.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.sat.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="周日">
                <template slot-scope="scope">
                    <div v-if="scope.row.sun">
                        <div style="margin: 3px 0">{{scope.row.sun.name}}</div>
                        <div style="margin: 3px 0">{{scope.row.sun.room}}教室</div>
                        <div style="margin: 3px 0" v-if="scope.row.sun.type==='是'">必修课</div>
                        <div style="margin: 3px 0" v-else-if="scope.row.sun.type==='否'">选修课</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script scoped>
    import request from "@/utils/request";

    export default {
        name: "CourseTable",
        data() {
            return {
                student: localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {},
                admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {},
                teacher: localStorage.getItem("teacher") ? JSON.parse(localStorage.getItem("teacher")) : {},
                tableData: [],
                tableData1: [],


                gradeId: '',
                studentId: '',
                grades: [],

                dialogVisible: false,
                coursedialogVisible: false,
                classesId: '',
                classess: [],

                collegeId: '',
                colleges: [],

                majorId: '',
                collegeMajors: [],


                courseDate: [],
                savecourseDate: [],
                MajorDate: [],
                GradeDate: [],
                ClassesDate: [],
                StudentDate: [],
                courseId: '',
                courses: [],


            }
        },
        created() {
            this.request.get("college/parent").then(res => {
                this.colleges = res.data
            })

            this.request.get("college/children").then(res => {
                this.collegeMajors = res.data
            })

            this.request.get("course").then(res => {
                this.courses = res.data.filter(v => v.type === '否')
            })
            this.request.get("grade").then(res => {
                this.grades = res.data
                this.GradeDate = res.data
            })
            this.request.get("classes").then(res => {
                this.classess = res.data
                this.ClassesDate = res.data
            })
            this.request.get("college/children").then(res => {
                this.MajorDate = res.data
            })
            this.request.get("student").then(res => {
                this.StudentDate = res.data
                console.log(this.StudentDate)
            })


        },

        methods: {
            load() {
                this.request.get("/select/courseTable", {
                    params: {
                        studentId: this.student.id,
                        gradeId: this.gradeId,
                        majorId: this.majorId,
                        classesId: this.classesId
                    }
                }).then(res => {
                    this.tableData = res.data

                })
            },
            loadAdminAndTeacher() {
                this.request.get("/select/AdminCourseTable", {
                    params: {
                        gradeId: this.gradeId,
                        majorId: this.majorId,
                        classesId: this.classesId
                    }
                }).then(res => {
                    this.tableData = res.data

                })
            },


            selectCourseTable() {
                this.coursedialogVisible = true
                this.request.get("http://localhost:9090/select/courseType/" + this.student.id).then(res => {
                    this.savecourseDate = res.data
                })

            },
            addSelect() {
                if (this.student.role === "ROLE_STUDENT") {
                    this.savecourseDate.push({
                        studentId: this.student.id,
                        majorId: this.student.majorId,
                        gradeId: this.student.gradeId,
                        classesId: this.student.classesId
                    })
                } else {
                    this.$message.info("学生进行选修课")
                }

            },
            //删除课程
            delCourse(id) {
                const index = this.courseDate.findIndex(v => v.id === id)
                this.courseDate.splice(index, 1)
            },
            delStudentCourse(id) {
                const index = this.savecourseDate.findIndex(v => v.id === id)
                this.savecourseDate.splice(index, 1)
            },
            //点击修改课程里边的取消按钮
            editCancelBtn1() {
                this.coursedialogVisible = false
                this.$message.info('取消添加课程')
            },
            saveCourse() {
                // if (!this.courseDate.length) {
                //     this.$message.info('未选课程')
                //     this.coursedialogVisible = false
                // }
                // 多课程id进行去重 然后对比原数组是否有重复的课程
                // if (new Set(this.courseDate.map(v => v.courseId + v.gradeId + v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                //     this.$message.error('课程冲突')
                //     return
                // }
                // if (new Set(this.courseDate.map(v => v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                //     this.$message.error('时间冲突')
                //     return;
                // }
                // if (new Set(this.savecourseDate.map(v => v.courseId + v.gradeId + v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                //     this.$message.error('课程冲突')
                //     return
                // }
                // if (new Set(this.savecourseDate.map(v => v.classesId + v.weekDay + v.section)).size !== this.courseDate.length) {
                //     this.$message.error('时间冲突')
                //     return;
                // }
                this.request.post("http://localhost:9090/select/student/" + this.student.majorId, this.savecourseDate, {
                    params: {
                        id: this.student.id,
                    }
                }).then(res => {
                    // console.log(this.savecourseDate)
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

            lookCourseTable() {
                this.dialogVisible = true
                this.student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : {}
                if (this.student.role === "ROLE_STUDENT") {
                    this.request.get("/select/courseTable", {
                        params: {
                            studentId: this.student.id,
                            gradeId: this.student.gradeId,
                            majorId: this.student.majorId,
                            classesId: this.student.classesId
                        }
                    }).then(res => {
                        this.tableData1 = res.data
                        console.log(this.tableData1)
                    })
                } else {
                    this.$message.info("您没有课表")
                }
            },

            searchCourseBtn() {
                if (this.gradeId.length === 0) {
                    this.$message.info('选择查看的信息')
                    return
                }
                    this.loadAdminAndTeacher()
            },
            releaseCourseBtn() {
                if (this.gradeId.length === 0) {
                    this.$message.info('选择查看的信息')
                    return
                }
                this.majorId = ''
                this.gradeId = ''
                this.classesId = ''
                this.loadAdminAndTeacher()

            },

            CancelBtn() {
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>
