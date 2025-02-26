import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface Props {
    imagePreview: string;
    setCropped: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({ imagePreview, setCropped }: Props) {
    return (
        <Cropper 
            src={imagePreview} // ✅ Ispravljen src
            style={{ height: 200, width: 200 }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropped(cropper)} // ✅ Sada je usklađen naziv funkcije
        />
    )
}
