import axios from 'axios'
import {Message}from 'element-ui'
import router from '@/router'

 const service = axios.create({
    timeout:20000
})

//添加请求拦截器
service.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        config.headers['token']=localStorage.getItem('token')
    }

    if(config.method==='post'){
        config.headers['Content-Type']='application/json'
    }

    if(config.data instanceof FormData){
        config.headers={
            'Content-Type':'multipart/form-data',
            'token':localStorage.getItem('token')
        }
    }
    return config
},
error=>{
    console.log(error)
    return Promise.reject(error)
}

)

//count是为了防止token失效，导致提示框太多
let count = 0

//添加响应拦截器
service.interceptors.response.use(
    response=>{
        const res = response.data
        if(res.code!==2000){
            if(res.code ===3001){
                if(count === 0){
                    Message({
                        message:'身份信息已过期，请重新登录',
                        type:'error',
                    })
                }
                localStorage.removeItem('token')
                router.push({path:'/login',query:{path:router.currentRoute.fullPath}})
            }
            count++;
            return Promise.reject(res)

        }else{
            return res;
        }

},
error=>{
    if(count===0){
        if(error.response.data.code==='30001'){
            Message({
                message:'登陆令牌失效，请重新登陆'，
                type:'error',
                duration:3*1000
            })
            count =0;
            localStorage.removeItem('token')
            router.push({path:'/login',query:{path:router.currentRoute.fullPath}})
        }else{
            Message({
                message:error.message,
                type:'error',
                duration:5*1000
            })
        }
    }
    count++
    return Promise.reject(error)
}

)
export default service
