import { Svg, Path } from "react-native-svg";
import styles, { colors } from "../styles";
export const MinusIcon = () => {
  return (
    <Svg
      color={colors.fifth}
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <Path
        fillRule="evenodd"
        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
