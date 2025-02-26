import { Button, Header, Segment } from "semantic-ui-react";
import { Activity, ActivityFormValues } from "../../../app/model/activity";
import {  useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik , Form} from "formik";
import *  as Yup from 'yup'
import MyTextInput from "../../../app/common/Form/MyTextInput";
import MyTextArea from "../../../app/common/Form/MyTextArea";
import MySelectInput from "../../../app/common/Form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/Form/MyDateInput";
import { v4 as uuid } from 'uuid';


export default observer (function ActivityForm() {

    const  {activityStore} = useStore()
    const {  loadActivity , createActivity , updateActivity ,  loadingInitial} = activityStore
    const {id} = useParams()
    const [activity , setActivity] = useState<Activity>
    ({
        id: "",
        title: "",
        category: "",
        description: "",
        date: null,
        city: "",
        venue: ""
    })

    const validationShema = Yup.object({
        title : Yup.string().required("The activity title is required"),
        description : Yup.string().required('The activity description is required'),
        category : Yup.string().required(),
        date : Yup.string().required().nullable(),
        venue : Yup.string().required(),
        city : Yup.string().required(),
    })

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    } , [id , loadActivity])

    //const [activity, setActivity] =  useState<Activity>(initialState);

    const handleForSubmit = (activity:ActivityFormValues) => {
        if(!activity.id){
            const newActivity = {
                ...activity , 
                id:uuid()
            }

            createActivity(newActivity).then(()=> navigator.nav(`/activities/${activity.id}`))
        }else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
        }
    };



    if(loadingInitial) return <LoadingComponent content="Loading activity " />

    return (
        <Segment clearing>
            <Header color="teal" content="Activity Details" sub/>
            <Formik validationSchema={validationShema} enableReinitialize initialValues={activity} onSubmit={values => handleForSubmit(values) }>
                {({handleSubmit,isSubmitting})=>(
                <Form onSubmit={handleSubmit} autoComplete="off" className="ui form"> {/* Ispravljeno */}
                    <MyTextInput name="title" placeholder="Title" />
                    <MyTextArea rows={3}   placeholder="Description"  name="description" />
                    <MySelectInput options={categoryOptions} placeholder="Category" name="category"/>
                    <MyDateInput placeholder="Date" name="date" showTimeSelect timeCaption="time" dateFormat="MMMM d , yyyy h:mm aa"/>
                    <MyTextInput   placeholder="City"  name="city" />
                    <MyTextInput   placeholder="Venue"  name="venue" />
                    <Button loading={isSubmitting} floated="right" positive type="submit" content="Submit" /> 
                    <Button as={Link} to={'/activities'} floated="right" type="button" content="Cancel" /> {/* Ispravljeno */}
                </Form>   
                )}
            </Formik>
       
        </Segment>
    );
})