import styled from "styled-components";


export const Container = styled.div`
min-width: 300px;
  width: 25%;
  height: 24%;
  overflow: auto;
  z-index: 5;
  background-color: ${({ theme }) => theme.backgroundColor2};
  position: fixed;
  padding: 1.5rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  gap: 30px;
`;
export const Header = styled.header`
    
  display: flex;
  align-items: center;
  justify-content: space-between;
    width: 100%;
    height: 10%;
    h1{
    color: ${({ theme }) => theme.contrast};
    font-size: 20px;
    font-weight: bold;
    
    display: flex;
    align-items: center;
    column-gap: 10px;
    }
    
`
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
export const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
height: 100%;
span{
color: ${({ theme }) => theme.contrast2};
font-feature-settings: 'ss10' on;
font-size: 18px;
font-weight: 500;
}
`
export const ButtonContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`
 