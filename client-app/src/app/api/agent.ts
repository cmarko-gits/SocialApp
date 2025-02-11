/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../model/activity";
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { store } from "../store/store";
import { User, UserFormValues } from "../model/user";


axios.defaults.baseURL = 'http://localhost:5000'

const responseBody = <T> (response : AxiosResponse<T>) => response.data!

axios.interceptors.request.use(config =>{
    const token = store.commonStore.token
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config;
})

const sleep = (delay : number) =>{
    return new Promise((resorve) => {
        setTimeout(resorve,delay)
    })
}

const request = {
    get : <T>  (url:string) => axios.get<T>(url).then(responseBody), 
    
    post :<T> (url : string ,body : {}) => axios.post<T>(url,body).then(responseBody) ,
    put : <T> (url:string , body : {}) => axios.put<T>(url,body).then(responseBody),
    delete :<T> (url:string) => axios.delete<T>(url).then(responseBody )
}

axios.interceptors.response.use(async response=>{
   
    await sleep(1000)
    return response;
},(error:AxiosError)=>{
    const {data , status , config }= error.response as AxiosResponse

    switch(status){
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors , 'id')){
                router.navigate("/not-found")
            }
            if(data.errors){
                const modalStateErrors = []
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }

                throw modalStateErrors.flat()
            }else{
                toast.error(data)
            }
            break;
        case 401:
            toast.error("Unauthorised")
            break;
        case 403:
            toast.error("Forbidden")
            break;
        case 404:
            router.navigate("/not-found")
            break;
        case 500:
            store.commonStore.setServerError(data)
            router.navigate('/server-error')
            break; 
    }

    return Promise.reject(error)
})

const Activities = {
    list  : () => request.get<Activity[]>('/Activities'),
    details : (id:string) => request.get<Activity>(`/Activities/${id}`),
    create : (activity : Activity) => axios.post<void>('/Activities',activity),
    update : (activity:Activity) => axios.put<void>(`/Activities/${activity.id}`,activity) ,
    delete : (id:string) => axios.delete<void>(`/Activities/${id}`)
}

const Account = {
    current : () => request.get<User>('/api/account'),
    register: (user: UserFormValues) => request.post<User>('/api/Account/register', user),
    login: (user: UserFormValues) => request.post<User>('/api/Account/login', user)}

const agent = {
    Activities , 
    Account
}

export default agent;