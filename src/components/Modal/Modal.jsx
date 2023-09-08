import { Component } from "react";
import { StyleModal } from "./Modal.styled";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('.Modal-root')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handlerKeydown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlerKeydown) 
    }

    handlerKeydown = (evt) => {
        if (evt.code === 'Escape') {
            this.props.closeModalWindow() 
        }
    }

    handlerOverlay = (evt) => {
        if (evt.target.localName === 'div') {
            this.props.closeModalWindow()
        }
    }

    render() {
        return createPortal(
            <StyleModal className="overlay" onClick={this.handlerOverlay}>
                    <div className="modal">
                    <img src={this.props.imgModal} alt="" />
                    </div>
                </StyleModal>, modalRoot
        )
    }
}