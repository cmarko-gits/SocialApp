import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Photo, Profile } from "../model/profile";
import agent from "../api/agent";
import { store } from "./store";



export default class ProfileStore{
    activeTab = 0
    profile : Profile | null = null 
    loadingFollowings:boolean = false
    loadingProfile = false 
    uploading = false
    loading = false
    followings :  Profile[] = []
    constructor(){
        makeAutoObservable(this)

        reaction(()=>this.activeTab,activeTab=>{
            if(this.activeTab === 3 || activeTab === 4){
                const predicate = activeTab === 3 ? 'followers' : "following";
                this.loadFollowings(predicate)
            }else{
                this.followings = []
            }
            
        })
    }  

    setActiveTab = (activeTab : number) =>{
        this.activeTab = activeTab
    }

    get isCurrentUser(){
        if(store.userStore.user && this.profile) return store.userStore.user.username === this.profile.username

        return false;
    }

    loadProfile = async (username: string) => {
        console.log(`Fetching provera profile for ${username}...`); // ✅ Provera da se metoda poziva
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            console.log("Fetched profile provera:", profile); // Provera odgovora iz API-ja
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error) {
            console.log("Error loading profile:", error); // ✅ Provera grešaka
            runInAction(() => (this.loadingProfile = false));
        }
    };
    
    uploadPhoto = async (file:Blob) =>{
        this.uploading = true
        try{
            const response = await agent.Profiles.uploadPhoto(file)
            const photo = response.data

            runInAction(()=>{
                if(this.profile){
                    this.profile.photos?.push(photo)
                    if(photo.isMain && store.userStore.user){
                        store.userStore.setImage(photo.url)
                        this.profile.image = photo.url
                    }
                }

                this.uploading = false
            })
        }catch(e){
            console.log(e)

            runInAction(()=>this.uploading = false)
        }
    }

    setMainPhoto = async (photo:Photo) =>{
        this.loading = true
        try{
            await agent.Profiles.setMainPhoto(photo.id)
            store.userStore.setImage(photo.url)
            runInAction(()=>{
                if(this.profile && this.profile.photos){
                    this.profile.photos.find(p=>p.isMain)!.isMain = false
                    this.profile.photos.find(p=>p.id === photo.id)!.isMain = true
                    this.profile.image = photo.url
                    this.loading = false
                }
            })
        }catch(error){
            runInAction(()=> this.loading = false)
            console.log(error)
        }
    }

    deletePhoto = async (photo:Photo) => {
        this.loading = true 
        try{
            await agent.Profiles.deletePhoto(photo.id)
            runInAction(()=>{
                 if(this.profile)
                    this.profile.photos = this.profile.photos?.filter(p=>p.id !== photo.id)
            })
        }catch(error){
            runInAction(()=> this.loading = false)
            console.log(error)
        }
    }

    
    updateProfile = async(profile:Partial<Profile>) =>{
        this.loading = true; 

        try{

            await agent.Profiles.updateProfile(profile)
                runInAction(()=>{

                    if (profile.displayName && profile.displayName !==
                        store.userStore.user?.displayName) {
                        store.userStore.setDisplayName(profile.displayName);
                        }
                        this.profile = {...this.profile, ...profile as Profile};
                    this.loading = false;
                })

        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading = false 
            })
        }

    }

    updateFollowing = async (username:string , following:boolean) =>{
        this.loading = true
        try{
            await agent.Profiles.updateFollowing(username)
            store.activityStore.updateAttendeFollowing(username)

            runInAction(()=>{
                if(this.profile && this.profile.username !== store.userStore?.user?.username&& this.profile.username !== username){
                    this.profile.followersCounts += following ? 1 : -1;
                    this.profile.following= !this.profile.following
                }

                if(this.profile && this.profile.username === store.userStore?.user?.username)
                {
                    this.profile.followersCounts += following ? 1 : -1;
                }
                if(this.profile?.username === username){
                    this.profile.followersCounts += following ? 1 : -1;
                    this.profile.following= !this.profile.following
                }

                this.loading = false;
            })
        }catch(error){
            console.log(error)
            runInAction(()=>this.loading = false)
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate); // Dodato await
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => (this.loadingFollowings = false));
        }
    };
    
}

