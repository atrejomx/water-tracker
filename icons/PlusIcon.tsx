import { Svg, Path } from "react-native-svg";
import styles, { colors } from "../styles";
export const PlusIcon = () => {
  return (
    <Svg
      color={colors.text}
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <Path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
