import { ThreeDots } from 'react-loader-spinner'
import { ButtonLoadMore } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { getApi } from "./Search/search";
import { useEffect, useState } from "react";
import { Modal } from './Modal/Modal';




export const App = () => {

  const [searchTxt, setSearchTxt] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setisLoad] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [imgModal, setImgModal] = useState('')
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const perPage = 12
 

  useEffect(() => {
    if (searchTxt) {
      setisLoad(true)
          getApi(searchTxt, page, perPage)
            .then((respons) => {
              const paginationState = (Math.round((respons.data.totalHits / perPage)))
              if (respons.data.hits.length > 0) {
                setContent(prevState => prevState.concat(respons.data.hits))
                setLoadMore(true)
                setNotFound(false)
                if (paginationState - page === 1) {
                  setLoadMore(false)
                }
              }
              else {
                setNotFound(true)
                setLoadMore(false)
              }
            })
            .finally(
              setisLoad(false)
          ).catch((error) => {
            setError(true)
          })
        }
  }, [searchTxt, page])

 


  const onModalWindow = (value) => {
    if (value.target.className === 'open') {
      setIsModal(true)
      setImgModal(value.target.alt)
    }
  }

  const closeModalWindow = () => {
    setIsModal(false)
    setImgModal('')
  }

  const onSubmit = (searchTxt) => {
    if (!searchTxt.name) {
      return
    }
    setSearchTxt(searchTxt)
    setContent([])
    setPage(1)
  }
  
  const loadMorePage = () => {
    setPage(prevState=> prevState +1)
  }


  return (
          <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px'
      }}
      >
        {isModal && (
          <Modal
            imgModal={imgModal}
            closeModalWindow={closeModalWindow}
          ></Modal>)}
        
        <Searchbar
          onSubmit={onSubmit}></Searchbar>

        {content.length > 0 &&(
          <ImageGallery
            onModalWindow={onModalWindow}>

            <ImageGalleryItem
              content={content}></ImageGalleryItem>

          </ImageGallery>
        )}

        {isLoad && (
          <ThreeDots
            wrapperStyle={{
              justifyContent: 'center',
            }}></ThreeDots>
        )}

        {loadMore === true && (
          <ButtonLoadMore
            loadMore={loadMorePage}></ButtonLoadMore>
        )}
        {error && <div
          style={{ margin: 'auto' }}>
          ERROR CONNECTION PLEASE RELOAD THE PAGE</div>}
        
        {notFound && <div
          style={{ margin: 'auto' }}>
          NOT FOUND</div>}
        
      </div>
  )
}


