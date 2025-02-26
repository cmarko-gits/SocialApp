/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface Props{
    setFiles : (files:any) => void
}


export default function PhotoWidgetDropzone({setFiles}:Props) {
 
  const  dzStyles = {
    border : 'dasjed 3px #eee',
    borderColor : '#eee' ,
    borderRadius : '5px' ,
    paddingTop :  '30px' , 
    textAlign : 'center' as 'center',
    height : 200
  }

  const dzActive = {
    boderColor : 'green'
  }
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
     setFiles(acceptedFiles.map((file:any)=>(Object.assign(file , {
        preview:URL.createObjectURL(file)
     }))))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}>
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  )
}