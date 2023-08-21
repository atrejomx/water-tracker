import React from "react";
import {
  Button,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles, { colors } from "../../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import moment from "moment";
import CircularProgressBar from "../UI/CircleAnimated";
import { convertLToOz } from "../../utils/getDailyWaterIntake";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const metadataButtons = (operation: "sum" | "subtract") => [
  {
    label: `1 cup (236ml/${convertLToOz(0.236).toFixed(1)}oz)`,
    liters: 236,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: "sum" | "substract"
    ) => {
      console.log(liters);
    },
  },
  {
    label: `500ml (${convertLToOz(0.5).toFixed(1)}oz)`,
    liters: 500,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: "sum" | "substract"
    ) => {
      console.log(liters);
    },
  },
  {
    label: `1L (${convertLToOz(1).toFixed(1)}oz)`,
    liters: 1000,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: "sum" | "substract"
    ) => {
      console.log(liters);
    },
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { date } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            navigate("Home", {
              date: moment(date).subtract(1, "days").valueOf(),
            });
          }}
        >
          <Text style={styles.subtitle}>Previous day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate("Home", {
              date: moment(date).add(1, "days").valueOf(),
            });
          }}
        >
          <Text style={styles.subtitle}>Next day</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.title, marginBottom: 0, marginTop: 10 }}>
        {moment(date).format("dddd, MMMM DD YYYY")}
      </Text>
      <View style={styles.subcontainer}>
        <CircularProgressBar
          activeColor={colors.third}
          passiveColor={colors.primary}
          baseColor={colors.fifth}
          width={50}
          percent={85}
          radius={100}
          duration={1200}
        >
          <Text
            style={{ color: colors.white, fontSize: 24, fontWeight: "800" }}
          >
            100%
          </Text>
        </CircularProgressBar>
        <View style={{ flexDirection: "row" }}>
          <View style={{ gap: 8 }}>
            <Text
              style={{ color: colors.fifth, fontSize: 16, textAlign: "center" }}
            >
              Add
            </Text>
            {metadataButtons("subtract").map((button) => (
              <TouchableOpacity
                key={`touchable-substract-${button.label}`}
                style={styles.button}
                onPress={(e) => button.onPress(e, button.liters, "substract")}
              >
                <Text>- {button.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ gap: 8 }}>
            <Text
              style={{ color: colors.fifth, fontSize: 16, textAlign: "center" }}
            >
              Subtract
            </Text>
            {metadataButtons("sum").map((button) => (
              <TouchableOpacity
                key={`touchable-sum-${button.label}`}
                style={styles.button}
                onPress={(e) => button.onPress(e, button.liters, "sum")}
              >
                <Text style={{ fontWeight: "500" }}>+ {button.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
