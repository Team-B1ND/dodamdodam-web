import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 800px;
  height: 110px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  position: relative;
  overflow: hidden;
  display: flex;

  .slick-initialized {
    width: 100%;
  }

  .slick-slide {
    width: 800px !important;
  }

  .slick-track {
    display: flex;
  }

  .slick-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;

    .slick-active {
      opacity: 100%;
    }

    li {
      list-style: none;
      width: 13px;
      height: 13px;
      border-radius: 100%;
      border: 0px;
      opacity: 50%;
      background-color: black;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        opacity: 100%;
      }

      button {
        width: 100%;
        height: 100%;
        background: transparent;
        color: transparent;
        border: 0px;
        border-radius: 100%;
        cursor: pointer;
      }
    }
  }

  .slick-active {
    text-decoration: none;
  }
`;
