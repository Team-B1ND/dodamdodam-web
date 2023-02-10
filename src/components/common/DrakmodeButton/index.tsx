import { useRecoilValue } from "recoil";
import { ETheme } from "../../../enum/theme/theme.enum";
import useTheme from "../../../hooks/theme/useTheme";
import { themeModeAtom } from "../../../store/theme/themeStore";
import { DarkModeButtonContainer, DarkModeButtonWrap } from "./style";

const DarkModeButton = () => {
  const { handleTheme } = useTheme();
  const currentTheme = useRecoilValue(themeModeAtom);

  const { DARK } = ETheme;

  return (
    <DarkModeButtonContainer onClick={handleTheme}>
      <DarkModeButtonWrap>
        <span>{currentTheme === DARK ? "라이트" : "다크"} 모드로 보기</span>
      </DarkModeButtonWrap>
    </DarkModeButtonContainer>
  );
};

export default DarkModeButton;
