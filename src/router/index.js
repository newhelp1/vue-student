import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [

    {path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')},

    {path: '/login', name: 'Login', component: () => import('../views/Login.vue')},
    {path: '/teacherLogin', name: 'TeacherLogin', component: () => import('../views/TeacherLogin.vue')},
    {path: '/studentLogin', name: 'studentLogin', component: () => import('../views/StudentLogin.vue')},

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export const setRouters = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {
        const managerRoute ={path: '/', name: 'Manage', component: () => import('../views/Manage.vue'),redirect: "/login",children: [
                {path: '/adminIndividual', name: '个人中心', component:()=>import('../views/AdminIndividual.vue')},
                {path: '/teacherIndividual', name: '教师个人中心', component:()=>import('../views/TeacherIndividual.vue')},
                {path: '/studentIndividual', name: '学生个人中心', component:()=>import('../views/StudentIndividual.vue')},
                {path: '/updatePassword', name: '修改密码', component:()=>import('../views/UpdatePassword.vue')},
                {path: '/teacherUpdatePassword', name: '教师修改密码', component:()=>import('../views/TeacherUpdatePassword.vue')},
                {path: '/studentUpdatePassword', name: '学生修改密码', component:()=>import('../views/StudentUpdatePassword.vue')}
            ]}
        const menus = JSON.parse(storeMenus);
        menus.forEach(item =>{
            if (item.path){
                let itemMenu  ={path: item.path.replace("/",""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
                managerRoute.children.push(itemMenu)
            }else if (item.children.length){
                item.children.forEach(item =>{
                    if (item.path) {
                        let itemMenu = {path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
                        managerRoute.children.push(itemMenu)
                    }
                })
            }
        })
        const cuurentRouteName =router.getRoutes().map(v =>v.name)
        if (!cuurentRouteName.includes('Manage')){
            router.addRoute(managerRoute)
        }

    }
}

setRouters()

// 挂载路由守卫
router.beforeEach((to,from,next)=>{
  //to将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数表示放行
  if (to.path ==='/login') return next()
  if (to.path ==='/teacherLogin') return next()
  if (to.path ==='/studentLogin') return next()

  const tokenStr2 = localStorage.getItem('admin')
  const tokenStr3 = localStorage.getItem('teacher')
  const tokenStr4 = localStorage.getItem('student')

  if (!tokenStr2 &&!tokenStr3 &&!tokenStr4)return  next('/login')
  next()

})
export default router
