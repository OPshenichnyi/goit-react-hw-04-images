import { StyleImageGallery } from "./ImageGallery.styled"

export const ImageGallery = ({ children, onModalWindow }) => {
    return (
        <StyleImageGallery className="gallery" onClick={onModalWindow}>
            {children}
        </StyleImageGallery>
    )
}