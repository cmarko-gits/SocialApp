import axios, { AxiosResponse } from "axios";
import { Activity } from "../model/activity";


axios.defaults.baseURL = 'http://localhost:5000'

const responseBody = <T> (response : AxiosResponse<T>) => response.data

const sleep = (delay : number) =>{
    return new Promise((resorve) => {
        setTimeout(resorve,delay)
    })
}

const request = {
    get : <T>  (url:string) => axios.get<T>(url).then(responseBody), 
    post :<T> (url : string , body : {}) => axios.post<T>(url,body).then(responseBody) ,
    put : <T> (url:string , body : {}) => axios.put<T>(url,body).then(responseBody),
    delete :<T> (url:string) => axios.delete<T>(url).then(responseBody )
}

axios.interceptors.response.use(async response=>{
   
    try{
        sleep(3000)
        return response;
    }catch(error){
        return await Promise.reject(error)
    }
})

const Activities = {
    list  : () => request.get<Activity[]>('/Activities'),
    details : (id:string) => request.get<Activity>(`/Activities/${id}`),
    create : (activity : Activity) => axios.post<void>('/Activities',activity),
    update : (activity:Activity) => axios.put<void>(`/Activities/${activity.id}`,activity) ,
    delete : (id:string) => axios.delete<void>(`/Activities/${id}`)
}

const agent = {
    Activities
}

export default agent;