import { customScrollBar } from "../../../../style/libStyle";
import styled from "styled-components";

export const MyInfoWakeupSongContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ${customScrollBar}
`;
