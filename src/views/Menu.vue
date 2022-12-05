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
                    <el-form-item label="名称" prop="name">
                        <el-input v-model.trim="add.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="路径" prop="path">
                        <el-input v-model.trim="add.path" placeholder="请输入路径"></el-input>
                    </el-form-item>
                    <el-form-item label="页面路径" prop="pagePath">
                        <el-input v-model.trim="add.pagePath" placeholder="请输入路径"></el-input>
                    </el-form-item>
                    <el-form-item label="图标" prop="icon">
                        <template>
                            <el-select style="margin-left: 5px" v-model="add.icon" placeholder="请选择图标">
                                <el-option v-for="item in icons" :key="item.id" :label="item.name"
                                           :value="item.value">
                                    <i :class="item.value" />{{item.name}}
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model.trim="add.description" placeholder="请输入描述"></el-input>
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


        <!--        面包屑-->
        <el-breadcrumb style="font-size: 15px;font-weight: 300" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">

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
        <!--   新增新增用户按钮-->
        <div class="addAndDelete">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addBtn()">新增
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
            <el-table-column align="center" prop="name" label="名称"></el-table-column>
            <el-table-column align="center" prop="path" label="路径"></el-table-column>
            <el-table-column align="center" prop="pagePath" label="页面路径"></el-table-column>
            <el-table-column align="center"  label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon" style="font-size: 20px"></i>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="description" label="描述"></el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">

                    <el-tooltip content="新增子菜单" placement="top">
                        <el-button @click="addBtn(scope.row.id)" v-if="!scope.row.pid && !scope.row.path" type="primary"><i class="el-icon-circle-plus"></i>
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="编辑" placement="top">
                        <el-button @click="editBtn(scope.row)" type="success"><i class="el-icon-edit"></i>
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
                dialogVisible: false,
                //添加用户表单数据
                add: {},
                name:'',

                //批量删除
                multipleSelection: [],
                icons:[],
                //添加用户表单验证
                addRules: {

                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
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
                this.request.get("menu", {
                    params: {
                        name: this.name,
                    }
                }).then(res => {
                    this.tableData = res.data
                })
                //请求图标数据
                this.request.get("/menu/icons").then(res =>{
                    console.log(res)
                    this.icons=res.data
                })
            },
            //搜索框
            searchBtn() {
                this.load()
            },
            //重置按钮
            releaseBtn() {
                this.name = ""
                this.load()
            },

            // 添加按钮
            addBtn(pid) {
                this.dialogVisible = true
                this.add = {}
                if (pid) {
                    this.add.pid = pid
                }



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
                        this.request.post("menu", this.add).then(res => {
                            if (res.code === '200') {
                                //可以发起添加用户网络请求
                                this.$message.success('操作成功');
                                //隐藏添加对话框
                                this.dialogVisible = false
                                this.load()
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
            //根据id删除对应用户
            deleteById(id) {
                this.request.delete("menu/" + id).then(res => {
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
                request.post("menu/del/batch", ids).then(res => {
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
