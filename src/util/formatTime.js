import moment from "moment"
// moment.locale();         // zh-cn中文模式
moment.locale("zh-cn");         // zh-cn
const formatTime = {
    getTime:(date)=>{
        return moment(date).format('YYYY/MM/DD')
    }
}

export default formatTime