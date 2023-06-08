export const APP_NOTIFICATON_MESSAGES={
    loading:{
        title:'Loading',
        message:'Data is being loaded'
    },
    success:{
        title:'Sucess',
        message:'Data loaded successfully'
    },
    responseFailure:{
        title:'Error',
        message:'Error while fetching the data from the server'
    },
    requestFailure:{
        title:'Error',
        message:'Error while parsing the data',
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server'
    }
}

//API SERVICE CALL
export const SERVICE_URLS={
    userSignup: { url: '/signup', method: 'POST' },
    userLogin:{url:'/login', method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'}
}