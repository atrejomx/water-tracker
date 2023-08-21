import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import { HomeIcon } from "../icons/HomeIcon";
import { CogIcon } from "../icons/CogIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
export const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabNavContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;

        const Icon = {
          Home: <HomeIcon />,
          Settings: <CogIcon />,
          Calendar: <CalendarIcon/>
        }[label];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
             key={`tab-${label}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={isFocused ? styles.tabNavSelected : styles.tabNav}
          >
            {Icon ? Icon : <Text style={styles.tabText}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
