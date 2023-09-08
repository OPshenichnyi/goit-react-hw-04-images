import { StyleImageGalleryItem } from "./ImageGalleryItem.styled"
export const ImageGalleryItem = ({ content }) => {
    return (
            content.map(({ id, webformatURL, largeImageURL }) => (
                <StyleImageGalleryItem className="gallery-item" key={id}>
                    <img src={webformatURL} alt={largeImageURL} className="open"/>
                </StyleImageGalleryItem> 
            ))
    )
}