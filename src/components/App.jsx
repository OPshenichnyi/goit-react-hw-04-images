import { ThreeDots } from 'react-loader-spinner'
import { ButtonLoadMore } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { getApi } from "./Search/search";
import { Component } from "react";
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchTxt: '',
    loadMore: 'false',
    content: [],
    page: 1,
    perPage: 12,
    isLoad: false,
    isModal: false,
    imgModal: '',
    error: false,
    notFound: false,
    totalHits: 0, 
  }



  componentDidUpdate(_, prevState,) {
    const { searchTxt, page, perPage, totalHits } = this.state

    if (searchTxt !== prevState.searchTxt || page !== prevState.page) {
      this.setState({ loadMore: false, isLoad: true })
      getApi(searchTxt, page, perPage)
        .then((respons) => {

          if (respons.data.hits.length > 0) {
            this.setState(prevState => ({
              content: prevState.content.concat(respons.data.hits),
            }))
            this.setState({ loadMore: true })
            this.setState({ notFound: false })
            this.setState({ totalHits: Math.round(respons.data.totalHits / perPage) - page })
            if (totalHits === 1) {
              this.setState({ loadMore: false })
            }
          }
          else {
            this.setState({ notFound: true })
          }

        })
        .finally(
          this.setState({ isLoad: false })
      ).catch((error) => {
        this.setState({ error: true })
      })
    }
  }
  
  onModalWindow = (value) => {
    if (value.target.className === 'open') {
      this.setState({ isModal: true, imgModal: value.target.alt})
    }
  }

  closeModalWindow = () => {
    this.setState({ isModal: false, imgModal: '' })
  }

  onSubmit = (searchTxt) => {
    if (!searchTxt.name) {
      return
    }
    this.setState(({ searchTxt: searchTxt, content: [], page: 1 }))
    
  }
  
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px'
      }}
      >
        {this.state.isModal && (
          <Modal
            imgModal={this.state.imgModal}
            closeModalWindow={this.closeModalWindow}
          ></Modal>)}
        
        <Searchbar
          onSubmit={this.onSubmit}></Searchbar>

        {this.state.content.length > 0 &&(
          <ImageGallery
            onModalWindow={this.onModalWindow}>

            <ImageGalleryItem
              content={this.state.content}></ImageGalleryItem>

          </ImageGallery>
        )}

        {this.state.isLoad && (
          <ThreeDots
            wrapperStyle={{
              justifyContent: 'center',
            }}></ThreeDots>
        )}

        {this.state.loadMore === true && (
          <ButtonLoadMore
            loadMore={this.loadMore}></ButtonLoadMore>
        )}
        {this.state.error && <div
          style={{ margin: 'auto' }}>
          ERROR CONNECTION PLEASE RELOAD THE PAGE</div>}
        
        {this.state.notFound && <div
          style={{ margin: 'auto' }}>
          NOT FOUND</div>}
        
      </div>
    );
  }

};
