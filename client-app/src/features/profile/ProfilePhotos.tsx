import { observer } from "mobx-react-lite";
import { Card, Header, Tab , Image, Grid, Button } from "semantic-ui-react";
import { Photo, Profile } from "../../app/model/profile";
import { useStore } from "../../app/store/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/ImageUploads/PhotoUploadWidget";

interface Props{
    profile : Profile
}

export default observer(function ProfilePhoto({profile}:Props){

    const {profileStore:{isCurrentUser , deletePhoto , setMainPhoto , uploadPhoto , uploading , loading , loadingProfile}} = useStore()
    const [addPhotoMode , setAddPhotoMode] = useState(false)
    const [target, setTarget] =  useState('')


    function handlePhotoUpload(file:Blob){
        uploadPhoto(file).then(()=> setAddPhotoMode(false))
    }

    function handleDeletePhoto(photo:Photo , e : SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        deletePhoto(photo)
    }

    function handleSetMainPhoto(photo:Photo , e:SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        setMainPhoto(photo)
    }

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button floated="right" basic content={addPhotoMode ? "Cancle" : "Add Photo"}  onClick={()=>setAddPhotoMode(!addPhotoMode)}/>
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
                    ): (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                        <Card key={photo.id}>
                        <Image src={photo.url}/>
                        {isCurrentUser && (
                            <Button.Group fluid widths={2}>
                                <Button basic color="green" content="Main"
                                 name={'main' + photo.id} disabled={photo.isMain}
                                 loading={target === 'main' + photo.id && loading}
                                 onClick={e=>handleSetMainPhoto(photo,e)}
                                 />
                            
                                <Button basic color="red" icon='trash'
                                 loading={target === photo.id && loading}
                                 onClick={e=>handleDeletePhoto(photo,e)}
                                 disabled={photo.isMain}
                                 name={photo.id}/>

                            </Button.Group>
                        )}
                    </Card>
                ))}
              
            
            </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
            
        </Tab.Pane>
    )
})