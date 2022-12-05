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
                    <el-form-item label="管理员编号" prop="no">
                        <el-input v-model.trim="add.no" placeholder="请输入管理员编号"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员账号" prop="name">
                        <el-input v-model.trim="add.name" placeholder="请输入管理员账号"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员姓名" prop="nickname">
                        <el-input v-model.trim="add.nickname" placeholder="请输入管理员姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="add.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="add.phone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <template>
                            <el-radio v-model="add.sex" label="男">男</el-radio>
                            <el-radio v-model="add.sex" label="女">女</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model.trim="add.address" placeholder="请输入地址"></el-input>
                    </el-form-item>

                    <!--                        <el-form-item label="个人头像">-->
                    <!--                            <el-upload ref="addUploadRef" action="http://localhost:9090/files/upload/" :on-success="filesUploadSuccessAdd">-->
                    <!--                                <el-button size="small" type="primary">点击上传</el-button>-->
                    <!--                            </el-upload>-->
                    <!--                        </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="CancelBtn">取 消</el-button>
                    <el-button type="primary" @click="saveDialogBtn">确 定
                    </el-button>
                </div>
            </el-dialog>

        </div>

        <!--            修改用户对话框-->
        <div>
            <el-dialog
                    title="添加用户"
                    :visible.sync="editdialogVisible"
                    width="40%"
                    :before-close="edithandleClose"
            >
                <!--修改用户内容主体区域-->
                <el-form class="add" size="small" label-width="130px" :model="edit" :rules="editRules"
                         ref="editFormRef">
                    <el-form-item label="管理员编号" prop="no">
                        <el-input v-model.trim="edit.no" placeholder="请输入管理员编号"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员账号" prop="name">
                        <el-input v-model.trim="edit.name" placeholder="请输入管理员账号"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员姓名" prop="nickname">
                        <el-input v-model.trim="edit.nickname" placeholder="请输入管理员姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="edit.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="edit.phone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <template>
                            <el-radio v-model="edit.sex" label="男">男</el-radio>
                            <el-radio v-model="edit.sex" label="女">女</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model.trim="edit.address" placeholder="请输入地址"></el-input>
                    </el-form-item>

                    <!--                        <el-form-item label="个人头像">-->
                    <!--                            <el-upload ref="addUploadRef" action="http://localhost:9090/files/upload/" :on-success="filesUploadSuccessAdd">-->
                    <!--                                <el-button size="small" type="primary">点击上传</el-button>-->
                    <!--                            </el-upload>-->
                    <!--                        </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!-- 添加用户底部按钮区-->
                    <el-button @click="editCancelBtn">取 消</el-button>
                    <el-button type="primary" @click="updateDialogBtn">确 定
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
                        <el-tag size="small">管理员</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-star-on"></i>
                            编号
                        </template>
                        {{this.des.no}}
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
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>管理员</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0;margin-top: 5px">
            <el-input style="width: 200px"
                      placeholder="请输入编号"
                      suffix-icon="el-icon-search"
                      v-model.trim="no"
                      clearable>
            </el-input>

            <el-input style="width: 200px;margin-left: 5px" placeholder="请输入地址"
                      suffix-icon="el-icon-message"
                      v-model.trim="address"
                      clearable>
            </el-input>
            <el-select style="width: 200px;margin-left: 5px" placeholder="请选择性别" v-model.trim="sex">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
            </el-select>
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
                <el-button  slot="reference" type="danger" icon="el-icon-circle-close" size="small">批量删除
                </el-button>
            </el-popconfirm>
            <el-upload action="http://localhost:9090/admin/import" :show-file-list="false" :on-success="importSuccess"
                       accept=".xlsx" style="display: inline-block;margin-right: 10px">
                <el-button style="margin-left: 10px" type="success" icon="el-icon-bottom-left" size="small">导入
                </el-button>
            </el-upload>

            <el-button type="info" icon="el-icon-bottom-right" @click="exp" size="small">导出</el-button>
        </div>

        <el-table @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#eee',color:'#333366'}" :data="tableData" border stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" type="index" label="#"></el-table-column>
            <!--            <el-table-column align="center" prop="no" label="编号"></el-table-column>-->
            <!--            <el-table-column align="center" prop="name" label="账号"></el-table-column>-->
            <el-table-column align="center" prop="nickname" label="姓名"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别"></el-table-column>
            <!--            <el-table-column align="center" prop="email" label="邮箱"></el-table-column>-->
            <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
            <el-table-column align="center" prop="role" label="角色">
                <el-tag size="small">管理员</el-tag>
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

                    <el-tooltip content="查看" placement="top" :enterable="false">
                        <el-button style="margin-left: 5px" type="warning"
                                   icon="el-icon-s-data"
                                   @click="look(scope.row)">

                        </el-button>
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
        name: "Main",
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
                editdialogVisible: false,
                //添加用户表单数据
                add: {},
                edit: {},
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
                address: '',
                sex: '',

                //添加用户表单验证
                addRules: {
                    no: [
                        {required: true, message: '请输入管理员编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入管理员账号', trigger: 'blur'},
                    ],
                    nickname: [
                        {required: true, message: '请输入管理员姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入家庭地址', trigger: 'blur'},
                    ],
                },
                editRules: {
                    no: [
                        {required: true, message: '请输入管理员编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入管理员账号', trigger: 'blur'},
                    ],
                    nickname: [
                        {required: true, message: '请输入管理员姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入家庭地址', trigger: 'blur'},
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
                this.request.get("admin/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        no: this.no,
                        address: this.address,
                        sex: this.sex
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
                })

            },

            changeStatus(row) {
                let admin =localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : {}
                if (admin.id===row.id && !row.status){
                    row.status=true
                    this.$message.warning('禁止修改本人状态');
                    return
                }
                this.request.put("admin", row).then(res => {
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
                this.no = ""
                this.address = ""
                this.sex = ""
                this.load()
            },
            //导出按钮
            exp() {
                window.open("http://localhost:9090/admin/export")
            },
            importSuccess() {
                this.$message.success("文件导入成功")
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
            editCancelBtn() {
                this.$message.warning('取消操作')
                this.editdialogVisible = false
            },
            addhandleClose() {
                this.$refs.addFormRef.resetFields();
                this.$message.warning('取消操作')
                this.dialogVisible = false
                this.add = {}
            },
            //修改用户按钮
            edithandleClose() {
                this.$message.warning('取消操作')
                this.editdialogVisible = false
            },
            //编辑用户按钮
            editBtn(row) {
                this.load()
                this.edit = row
                this.editdialogVisible = true
            },
            //点击修改用户确定按钮 添加用户
            updateDialogBtn() {
                this.$refs['editFormRef'].validate((valid) => {
                    if (valid) {
                        this.request.put("admin", this.edit).then(res => {
                            if (res.code === '200') {
                                //可以发起添加用户网络请求
                                this.$message.success('操作成功');
                                //隐藏添加对话框
                                this.editdialogVisible = false
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
            //点击添加用户确定按钮 添加用户
            saveDialogBtn() {
                this.$refs['addFormRef'].validate((valid) => {
                    if (valid) {
                        this.request.post("admin", this.add).then(res => {
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
                this.request.delete("admin/" + id).then(res => {
                    if (res.code === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.load()
                    }
                })
            },
            //批量删除
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val
            },
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id)
                request.post("admin/del/batch", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败");
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
