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
        <!--分配菜单-->
        <div>

            <el-dialog title="分配菜单" :visible.sync="dialogMenu" width="40%">
                <el-tree
                        :props="props"
                        :data="menuDate"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :check-strictly="true"
                        :default-expanded-keys="expends"
                        :default-checked-keys="checks">

                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i :class="data.icon"></i> {{ data.name }}</span>
                </span>
                </el-tree>

                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="colseMenu">取 消</el-button>
                    <el-button type="primary" @click="saveRoleMenu">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <!--        面包屑-->
        <el-breadcrumb style="font-size: 15px;font-weight: 300" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">
            <el-input style="width: 200px"
                      placeholder="请输入名称"
                      suffix-icon="el-icon-search"
                      v-model.trim="name"
                      clearable>
            </el-input>

            <el-input style="width: 200px;margin-left: 5px" placeholder="请输入描述"
                      suffix-icon="el-icon-message"
                      v-model.trim="description"
                      clearable>
            </el-input>
            <el-button style="margin-left: 8px" @click="searchBtn" type="primary"> 搜索</el-button>
            <el-button style="margin-left: 8px" type="warning" @click="releaseBtn" icon="el-icon-s-release">
                重置
            </el-button>

        </div>
        <!--   新增用户-->
        <div class="addAndDelete">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addBtn">新增
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
            <el-table-column align="center" prop="name" label="名称"></el-table-column>
            <el-table-column align="center" prop="description" label="描述"></el-table-column>
            <el-table-column align="center" label="操作" width="230px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <el-button @click="editBtn(scope.row)" type="success"><i class="el-icon-edit"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="分配菜单" placement="top">
                        <el-button @click="selectMenu(scope.row.id)" type="info"><i class="el-icon-menu"></i>
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
                menuDate: [],

                dialogVisible: false,
                dialogMenu: false,
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
                description: '',
                name: '',
                expends: [],
                checks: [],
                props: {
                    label: 'name',
                },
                roleId: 0,

                //添加用户表单验证
                addRules: {
                    name: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    description: [
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
                this.request.get("role/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        description: this.description,
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
                this.pageSize = pageSize
                this.load()
            },
            //监听页码值 改变的事件
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load()
            },
            //搜索框
            searchBtn() {
                this.load()
            },
            //重置按钮
            releaseBtn() {
                this.description = ""
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

            selectMenu(roleId) {
                this.dialogMenu = true
                this.roleId = roleId

                //请求菜单数据
                this.request.get("menu", {
                    params: {
                        name: ""
                    }
                }).then(res => {
                    this.menuDate = res.data
                    this.expends = this.menuDate.map(v => v.id)

                })
                this.request.get("role/roleMenu/" + roleId).then(res => {
                    // console.log(res)
                    this.checks = res.data
                    console.log(this.checks)

                })

            },
            //点击添加用户确定按钮 添加用户
            saveDialogBtn() {
                this.$refs['addFormRef'].validate((valid) => {
                    if (valid) {
                        this.request.post("role", this.add).then(res => {
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

            saveRoleMenu() {
                this.request.post("role/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys()).then(res => {
                    if (res.code === "200") {
                        this.$message.success("绑定成功")
                        this.dialogMenu = false

                    } else {
                        this.$message.error(res.message)
                    }

                })
            },
            colseMenu() {
                this.dialogMenu = false
                this.$message.info("取消绑定")
            },
            //点击查看按钮
            look(row) {
                this.load()
                this.des = row
                this.looldialogVisible = true
            },
            //根据id删除对应用户
            deleteById(id) {
                this.request.delete("role/" + id).then(res => {
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
                request.post("role/del/batch", ids).then(res => {
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
