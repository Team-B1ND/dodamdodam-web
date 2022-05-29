import { createGlobalStyle } from "styled-components";

const MaterialStyle = createGlobalStyle`
  .MuiInputBase-input {
    font-size: 2.4rem !important;
  }

  .MuiOutlinedInput-input {
    font-size: 1.8rem !important;
    padding: 0 1rem !important;
  }

  .MuiTypography-body1, .MuiTypography-body2 {
    font-size: 1.4rem !important;
  }

  .MuiInputBase-root {
    color: ${({ theme }) => theme.contrast} !important;
  }

  .MuiSvgIcon-root {
    font-size: 2rem !important;
  }

  .MuiPickersCalendarHeader-dayLabel {
    font-size: 1.4rem !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

export default MaterialStyle;
