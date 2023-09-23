import axios from '@/util/axios.config'

function upload(path,userform){
  // 因为UserForm中有文件对象所以得new FormData()
        // 因为UserForm中有文件对象所以得new FormData()
      // 如果上传的数据办函文件，需要添加headers为"Content-Type":"multipart/form-data"
  const params = new FormData()
  console.log(params);
  console.log(userform);
  for (let i in userform) {
    params.append(i, userform[i])
  }
  // console.log(params)
  // 如果上传的数据办函文件，需要添加headers为"Content-Type":"multipart/form-data"
  return  axios.post(path, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{return res.data})
}

export default upload