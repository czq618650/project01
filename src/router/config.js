import Home from "@/views/home/Home.vue"
import Center from "@/views/center/Center.vue"
import UserAdd from "@/views/user-manage/UserAdd.vue"
import UserList from "@/views/user-manage/UserList.vue"
import NewsAdd from "@/views/news-manage/NewsAdd.vue"
import NewsList from "@/views/news-manage/NewsList.vue"
import EditNews from "@/views/news-manage/EditNews.vue"
import ProductList from "@/views/product-manage/ProductList.vue"
import ProductAdd from "@/views/product-manage/ProductAdd.vue"
import EditProduct from "@/views/product-manage/EditProduct.vue"
import NotFound from "@/views/notfound/NotFound.vue"
import MessageList from "@/views/message/MessageList.vue"
import UsMessage from "@/views/message/UsMessage.vue"
import DataScreen from "@/views/DataScreen/DataScreen.vue"
// 动态添加路由，第一个参数表示父亲路由名
// path加/表示不用添加父亲路由前缀，不加泽直接使用该路由
const routes = [
    {
        path:'/home',
        name:"home",
        component:Home
    },
    {
        path:'/center',
        component:Center
    },
    // {
    //     path:"/dataScreen",
    //     component:DataScreen
    // },
    {
        path:'/message/messagelist',
        component:MessageList,
        // 表示只有管路员才可以看到
        requireAdmin:true
    },
    {
        path:'/message/usmessage',
        component:UsMessage
    },
    {
        path:"/user-manage/useradd",
        component:UserAdd,
        // 表示只有管路员才可以看到
        requireAdmin:true
    },    {
        path:"/user-manage/userlist",
        component:UserList,

        // 表示只有管路员才可以看到
        requireAdmin:true

    },    {
        path:"/news-manage/newsadd",
        component:NewsAdd
    },
    {
        path:"/news-manage/newslist",
        component:NewsList
    }, 
    {
        path:"/news-manage/editnews/:id",
        component:EditNews
    }, 
    {
        path:"/product-manage/productadd",
        component:ProductAdd
    },    {
        path:"/product-manage/productlist",
        component:ProductList
    },
    {
        path:"/product-manage/editproduct/:id",
        component:EditProduct
    }, 
    {
        path:"/",
        redirect:"/home"
    },{
        path:"/:pathMatch(.*)*",//匹配任意路径
        name:"Notfound",
        component:NotFound
    }
]

export default routes