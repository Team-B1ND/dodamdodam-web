import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const DarkModeButtonContainer = styled.button`
  width: 150px;
  height: 40px;

  border-radius: 45px 15px 45px 45px;
  border: 0px;

  position: fixed;
  bottom: 80px;
  right: 30px;

  transition: all 0.3s;
  outline: none;
  box-shadow: 5px 5px 5px 0 rgb(0 0 0 / 10%);

  color: ${({ theme }) => theme.contrast};
  background-color: ${({ theme }) => theme.darkmodeButtonColor};

  ${Flex({ $alignItems: "center" })}

  &:hover {
    color: white;
    background-color: #575757;
  }
`;

export const DarkModeButtonWrap = styled.div`
  width: 100%;
  height: 17px;

  ${Flex({ $justifyContent: "space-evenly" })}

  span {
    font-size: 0.8rem;
  }
`;
