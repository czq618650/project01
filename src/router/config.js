
// 动态添加路由，第一个参数表示父亲路由名
// path加/表示不用添加父亲路由前缀，不加泽直接使用该路由
const routes = [
    {
        path:'/home',
        name:"home",
        component:()=>import("@/views/home/Home.vue")
    },
    {
        path:'/center',
        component:()=>import("@/views/center/Center.vue")
    },
    // {
    //     path:"/dataScreen",
    //     component:DataScreen
    // },
    {
        path:'/message/messagelist',
        component:()=>import("@/views/message/MessageList.vue"),
        // 表示只有管路员才可以看到
        // requireAdmin:true
    },
    {
        path:'/message/usmessage',
        component:()=>import("@/views/message/UsMessage.vue"),
    },
    {
        path:"/user-manage/useradd",
        component:()=>import("@/views/user-manage/UserAdd.vue"),
        // 表示只有管路员才可以看到
        requireAdmin:true
    },    {
        path:"/user-manage/userlist",
        component:()=>import("@/views/user-manage/UserList.vue"),

        // 表示只有管路员才可以看到
        requireAdmin:true

    },    {
        path:"/news-manage/newsadd",
        component:()=>import("@/views/news-manage/NewsAdd.vue"),
    },
    {
        path:"/news-manage/newslist",
        component:()=>import("@/views/news-manage/NewsList.vue"),
    }, 
    {
        path:"/news-manage/editnews/:id",
        component:()=>import("@/views/news-manage/EditNews.vue"),
    }, 
    {
        path:"/product-manage/productadd",
        component:()=>import("@/views/product-manage/ProductAdd.vue"),
    },    {
        path:"/product-manage/productlist",
        component:()=>import("@/views/product-manage/ProductList.vue"),
    },
    {
        path:"/product-manage/editproduct/:id",
        component:()=>import("@/views/product-manage/EditProduct.vue"),
    }, 
    {
        path:"/",
        redirect:"/home"
    },{
        path:"/:pathMatch(.*)*",//匹配任意路径
        name:"Notfound",
        component:()=>import("@/views/notfound/NotFound.vue"),
    }
]

export default routes