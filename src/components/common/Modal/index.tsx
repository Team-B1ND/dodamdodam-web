import { ModalProps } from "./type"
import styled, { CSSObject } from "styled-components";

import { Portal } from "../modalPortal";

const Modal = ({width,
    height,
    zIndex,
    isOpen,
    close,
    children,
    customStyle,}:ModalProps)=>{
        return(
            <Portal>
            {
                isOpen && (
                    
                    <Background onClick={close} customStyle={customStyle}>
                        {children}
                    </Background>
                    
                ) 
            }
            </Portal>
        )
}

export default Modal;



 const Background = styled.div<{ customStyle?: CSSObject }>`
  width: 100%;
  min-height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px 0;
  overflow: auto;

  ${({ customStyle }) => customStyle}
`;

 const ModalHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 53px;

  border-bottom: 1px solid rgb(221, 221, 221);
`;

 const Title = styled.h1`
  font-size: 17px;
  font-weight: bold;
`;

// export const CloseIcon = styled(CgClose)`
//   cursor: pointer;
//   padding: 5px;
//   border-radius: 5px;

//   transform: scale(1);
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #ddd;
//     transform: scale(0.96);
//   }
//   &:active {
//     background-color: #eee;
//   }
// `;