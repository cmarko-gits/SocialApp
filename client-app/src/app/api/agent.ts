/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../model/activity";
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { store } from "../store/store";
import { User, UserFormValues } from "../model/user";
import { Photo, Profile } from "../model/profile";
import { PaginationResult } from "../model/paggination";
import { UserActivity } from "../model/userActivity";


axios.defaults.baseURL = 'http://localhost:5000/api'

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

axios.interceptors.response.use(async response => {
    await sleep(1000);

    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginationResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginationResult<Activity[]>>;
    }

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
    list  : (params:URLSearchParams) => axios.get<PaginationResult<Activity[]>>('/Activities',{params}).then(responseBody),
    details : (id:string) => request.get<Activity>(`/Activities/${id}`),
    create : (activity : ActivityFormValues) => axios.post<void>('/Activities',activity),
    update : (activity:ActivityFormValues) => axios.put<void>(`/Activities/${activity.id}`,activity) ,
    delete : (id:string) => axios.delete<void>(`/Activities/${id}`),
    attend : (id:string) => request.post<void>(`Activities/${id}/attend` , {})
}

const Account = {
    current: () => request.get<User>('account'),
    register: (user: UserFormValues) => request.post<User>('/Account/register', user),
    login: (user: UserFormValues) => request.post<User>('/Account/login', user)
  }
  const Profiles = {
    get : (username:string) => request.get<Profile>(`/Profiles/${username}`),
    updateProfile: (profile: Partial<Profile>) => request.put(`/profiles`,profile),
       uploadPhoto : (file:Blob) => {
        let formData = new FormData()
        formData.append('File' , file)
        return axios.post<Photo>('photos' , formData , {
            headers : {'Content-type' : 'multipart/form-data'}
        })
    } , 
    setMainPhoto: (id:string) => request.post(`/photos/${id}/setMain`, {}),
    deletePhoto : (id:string) => request.delete(`/photos/${id}`),
    updateFollowing: (username:string) => request.post(`Follow/${username}`,{}),
    listFollowings : (username:string,predicate:string) => request.get(`Follow/${username}?predicate=${predicate}`),
    listActivities: (username: string, predicate: string) =>
        request.get<UserActivity[]>(`/Profiles/${username}/activities?
        predicate=${predicate}`)

}

const agent = {
    Activities , 
    Account ,
    Profiles
}


export default agent;