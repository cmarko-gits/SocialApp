import { 
    
    
    Grid, Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import ActivityList from "./ActivityList";
import ActivityFiliters from "./ActivityFilters";
import { PagingParams } from "../../../app/model/paggination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

export default observer(function   ActivityDashboard(){

    const {activityStore} = useStore()
    const {activityRegistry , loadingActivities  , pagination , setPagingParams} = activityStore
    const [loadingNext,setLoadingNext] = useState(false)

    function handleGetNext(){
        setLoadingNext(true)
        setPagingParams(new PagingParams(pagination!.currentPage + 1 ))
        loadingActivities().then(() => setLoadingNext(false))
    }   

    
    useEffect(()=>{
        if(activityRegistry.size <= 1) loadingActivities()
    } ,  [activityRegistry.size])

    return(
        <Grid>
            <Grid.Column width='10'>
                {activityStore.loadingInitial && activityRegistry.size && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder/>

                    </>
                ):(
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
                </InfiniteScroll>
                )}

                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                 <ActivityFiliters/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
})