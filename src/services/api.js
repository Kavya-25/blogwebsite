import axios from 'axios'

import { APP_NOTIFICATON_MESSAGES ,SERVICE_URLS} from '../constants/config.js'

const API_URL='http://localhost:8000'

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
})
axiosInstance.interceptors.request.use(
    function (config){
        console.log("request interceptor",config);
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    function (response){
        console.log("response interceptor")
        return processResponse(response);
    },
    function (error){
        return Promise.reject(processError(error));
    }
)
const processResponse=(response)=>{
if(response?.status===200){
    return {isSuccess:true,data:response.data}
}
else{
    return{
        isFailure:true,
        msg:response?.msg,
        status:response?.status,
        code:response?.code
    }
}

}
const processError=(error)=>{
if(error.response){
// request made but server responded with a status other than 200
console.log('Error in response',error.toJSON());
return {
    isError:true,
    msg:APP_NOTIFICATON_MESSAGES.responseFailure,
    code:error.response.status
}
}
else if(error.request){
// request made but no response was received
console.log('Error in request',error.toJSON());
return {
    isError:true,
    msg:APP_NOTIFICATON_MESSAGES.requestFailure,
    code:""
}
}
else{
// frontend error in setting up request that triggers an error
console.log('Error in network',error.toJSON());
return {
    isError:true,
    msg:APP_NOTIFICATON_MESSAGES.networkFailure,
    code:""
}

}
}

const API={}

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){

                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){

                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            },

        },
        
        )
    
}
export {API};