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
                    <el-form-item label="班级编号" prop="no">
                        <el-input v-model.trim="add.no" placeholder="请输入班级编号"></el-input>
                    </el-form-item>
                    <el-form-item label="班级名称" prop="name">
                        <el-input v-model.trim="add.name" placeholder="请输入班级名称"></el-input>
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
                        <el-tag size="small">班级</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-star-on"></i>
                            班级编号
                        </template>
                        {{this.des.no}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            班级名称
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
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">
            <el-input style="width: 200px"
                      placeholder="请输入编号"
                      suffix-icon="el-icon-search"
                      v-model.trim="no"
                      clearable>
            </el-input>

            <el-input style="width: 200px;margin-left: 5px" placeholder="请输入班级名称"
                      suffix-icon="el-icon-message"
                      v-model.trim="name"
                      clearable>
            </el-input>
            <el-button style="margin-left: 8px" @click="searchBtn" type="primary"> 搜索</el-button>
            <el-button style="margin-left: 8px" type="warning" @click="releaseBtn" icon="el-icon-s-release">
                重置
            </el-button>

        </div>
        <!--   新增用户-->
        <div class="addAndDelete">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addBtn">新增学院
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

        <el-table @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#eee',color:'#333366'}" :data="tableData" border stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" type="index" label="#"></el-table-column>
            <el-table-column align="center" prop="no" label="班级编号"></el-table-column>
            <el-table-column align="center" prop="name" label="班级名称"></el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑学院" placement="top">
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
        name: "Classes",
        data() {
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
                pageSize: 5,
                no: '',
                name: '',

                //添加用户表单验证
                addRules: {
                    no: [
                        {required: true, message: '请输入学院编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入学院名称', trigger: 'blur'},
                    ],

                },
            }
        },
        created() {
            this.load()
        },
        methods: {
            //请求数据
            load() {
                this.request.get("classes/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        no: this.no,
                        name: this.name,
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
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
                this.code = ""
                this.name = ""
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
                        this.request.post("classes", this.add).then(res => {
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
                this.request.delete("classes/" + id).then(res => {
                    if (res.code === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.load()
                    }else {
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
                request.post("classes/del/batch", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error(res.message);
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


</style>
