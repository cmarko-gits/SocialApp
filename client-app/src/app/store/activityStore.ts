import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../model/activity';
import agent from '../api/agent';
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    activities: Activity[] = [];
    activityRegistry = new Map<string , Activity>()
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date))
    }

    loadingActivities = async () => {

        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activityRegistry.set(activity.id , activity)
                });
                this.activities = activities; // Postavi prerađene aktivnosti
                this.setLoadingInitial(false);
            });
        } catch (e) {
            this.setLoadingInitial(false);
            console.error(e);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        if (id) {
            this.selectActivity(id);
        } else {
            this.cancelSelectedActivity();
        }
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity:Activity) => {
        this.loading = true
        activity.id = uuid()

        try{
            await agent.Activities.create(activity)
            runInAction(()=>{
                this.activityRegistry.set(activity.id , activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false
            })
        }catch(e){
            console.error(e)
            runInAction(()=>{
                this.editMode = false
                this.loading = false
            })
        }
    }


    updateActivity = (activity:Activity) =>{

           try{

                agent.Activities.update(activity)
                runInAction(()=>{
                    this.activityRegistry.set(activity.id,activity)
                    console.log(this.activities.filter(x=>x.id !==  activity.id))
                    this.selectedActivity = activity
                    this.editMode = false 
                    this.loading = false

                })

           }catch(error){
            
                console.log(error)
                runInAction(()=>{
                    this.editMode = false 
                    this.loading = false
                })
           }
    }

    deleteActivity = (id:string) =>{

        try{
                
              agent.Activities.delete(id);
              runInAction(()=>{
                  this.activityRegistry.delete(id)
                  if(this.selectedActivity?.id === id) this.cancelSelectedActivity;
                  this.loading = false
              })

        }catch(e){
            console.log(e)   
            runInAction(()=>{
                this.loading = false
            })
        }

    }

}
