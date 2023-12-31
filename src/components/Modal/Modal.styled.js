import { styled } from "styled-components";


export const StyleModal = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  img{
    max-width: calc(80vw - 46px);
    max-height: calc(80vh - 45px);
  }
`