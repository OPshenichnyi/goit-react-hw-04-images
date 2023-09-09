import { useEffect } from "react";
import { StyleModal } from "./Modal.styled";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('.Modal-root')

export const Modal = ({ imgModal, closeModalWindow}) => {
  
    const handlerOverlay = (evt) => {
        if (evt.target.localName === 'div') {
            closeModalWindow()
        }
    }
    useEffect(() => {
        const handlerKeydown = (evt) => {
            if (evt.code === 'Escape') {
                closeModalWindow()
            }
        }
        window.addEventListener('keydown', handlerKeydown)
        return () => {
            window.removeEventListener('keydown', handlerKeydown)
        }
    }, [closeModalWindow])

   


    return createPortal(
        <StyleModal className="overlay" onClick={handlerOverlay}>
            <div className="modal">
                <img src={imgModal} alt="" />
            </div>
        </StyleModal>, modalRoot
  )
}
