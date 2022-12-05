<template>
   <div>
      <el-row :gutter="20" style="margin-bottom: 20px">
         <el-col :span="6">
            <el-card>
               <div class="homeTitle" style="color: #3333CC;"><i class="el-icon-user-solid"></i>教师人数</div>
               <div class="homeConnect"
                    style="color: #409EfF;
                                font-size: 18px;
                                margin-top: 10px;
                                text-align: center">
                  {{teachertotal}}人
               </div>
            </el-card>
         </el-col>
         <el-col :span="6">
            <el-card>
               <div class="homeTitle" style="color:#FF3333;"><i class="el-icon-s-platform"></i>学生人数</div>
               <div class="homeConnect"
                    style="color:#FF3300;
                                font-size: 18px;
                                margin-top: 10px;
                                text-align: center">
                  {{1}}1人
               </div>
            </el-card>
         </el-col>
         <el-col :span="6">
            <el-card>
               <div class="homeTitle" style="color:#00CC33"><i class="el-icon-s-data"></i>专业总数</div>
               <div class="homeConnect"
                    style="color: #66FF33;
                                font-size: 18px;
                                margin-top: 10px;
                                text-align: center">
                  {{11}}个
               </div>
            </el-card>
         </el-col>
         <el-col :span="6">
            <el-card>
               <div class="homeTitle" style="color:#CC9909;"><i class="el-icon-s-opportunity"></i>课程数量</div>
               <div class="homeConnect"
                    style="color:#FF9933;
                                font-size: 18px;
                                margin-top: 10px;
                                text-align: center">
                  {{coursetotal}}个
               </div>
            </el-card>
         </el-col>
      </el-row>

   </div>
</template>

<script scoped>
   import request from "@/utils/request";

   export default {
      name: "Home",
      data() {
         return {
            teachertotal: '',
            coursetotal: '',

         }

      },
      created() {
         this.teacherTotal()
         this.courseTotal()

      },
      methods: {
         teacherTotal() {
            this.request.get("teacher/total").then(res => {
               this.teachertotal = res.data
            })
         },
         courseTotal() {
            this.request.get("course/total").then(res => {
               this.coursetotal = res.data
            })
         },
      }
   }
</script>

<style scoped>
   .homeTitle {
      font-weight: 400;
      font-size: 18px;
   }

   .homeConnect {
      padding: 10px 0;
      text-align: center;
      font-weight: 500;
      font-size: 25px;

   }
</style>
