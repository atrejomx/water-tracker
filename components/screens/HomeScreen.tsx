import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
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
import { RootState, store } from "../../stores";
import { addToHistory } from "../../features/waterIntake.slice";
import { Operation } from "../../interfaces/common.interface";
import { useSelector } from "react-redux";
import { getTokenNotification } from "../../notifications/getNotificationToken";
import { scheduleNotification } from "../../notifications/scheduleNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const metadataButtons = (operation: Operation) => [
  {
    label: `1 cup (236ml/${convertLToOz(0.236).toFixed(1)}oz)`,
    liters: 0.236,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: Operation
    ) => {
      store.dispatch(
        addToHistory({ date: moment().valueOf(), operation, liters })
      );
    },
  },
  {
    label: `500ml (${convertLToOz(0.5).toFixed(1)}oz)`,
    liters: 0.5,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: Operation
    ) => {
      store.dispatch(
        addToHistory({ date: moment().valueOf(), operation, liters })
      );
    },
  },
  {
    label: `1L (${convertLToOz(1).toFixed(1)}oz)`,
    liters: 1.0,
    onPress: (
      e: GestureResponderEvent,
      liters: number,
      operation: Operation
    ) => {
      store.dispatch(
        addToHistory({ date: moment().valueOf(), operation, liters })
      );
    },
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { navigate } = navigation;
  const { waterConfig, history } = useSelector(
    (state: RootState) => state.waterIntakeSlice
  );
  const { date } = route.params;
  const totalLitersByDate = useMemo<number>(
    () =>
      history
        .filter(
          (data) =>
            moment(data.date).format("DD/MM/YYYY") ===
            moment(date).format("DD/MM/YYYY")
        )
        .reduce(
          (prev, curr) =>
            curr.operation === "sum" ? prev + curr.liters : prev - curr.liters,
          0
        ),
    [date, history]
  );
  const percentage = useMemo(() => {
    if (
      (totalLitersByDate / waterConfig.waterIntake) * 100 <= 100 &&
      (totalLitersByDate / waterConfig.waterIntake) * 100 >= 0
    ) {
      return (totalLitersByDate / waterConfig.waterIntake) * 100;
    }

    if ((totalLitersByDate / waterConfig.waterIntake) * 100 > 100) {
      return 100;
    }

    return 0;
  }, [totalLitersByDate, history, waterConfig.waterIntake]);

  useEffect(() => {
    const setUpNotification = async () => {
      try {
        const token = await getTokenNotification();
        if(!token){
          return
        }
        setExpoPushToken(token);

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
          });

        await scheduleNotification();
      } catch (e: any) {
        console.log(e);
      }
    };

    setUpNotification();
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
          percent={percentage}
          radius={100}
          duration={1200}
        >
          <Text
            style={{ color: colors.white, fontSize: 24, fontWeight: "800" }}
          >
            {percentage.toFixed(0)}%
          </Text>
          <Text
            style={{ color: colors.white, fontSize: 14, fontWeight: "300" }}
          >
            {totalLitersByDate.toFixed(1)} /{" "}
            {waterConfig.waterIntake.toFixed(1)}L
          </Text>
        </CircularProgressBar>
        <View style={{ flexDirection: "row" }}>
          <View style={{ gap: 8 }}>
            <Text
              style={{ color: colors.fifth, fontSize: 16, textAlign: "center" }}
            >
              Subtract
            </Text>
            {metadataButtons("subtract").map((button) => {
              const disabled = totalLitersByDate / waterConfig.waterIntake <= 0;
              return (
                <TouchableOpacity
                  key={`touchable-substract-${button.label}`}
                  style={!disabled ? styles.button : styles.disabledButton}
                  disabled={disabled}
                  onPress={(e) => button.onPress(e, button.liters, "subtract")}
                >
                  <Text style={styles.buttonText}>- {button.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ gap: 8 }}>
            <Text
              style={{ color: colors.fifth, fontSize: 16, textAlign: "center" }}
            >
              Add
            </Text>
            {metadataButtons("sum").map((button) => {
              const disabled = totalLitersByDate / waterConfig.waterIntake > 1;
              return (
                <TouchableOpacity
                  key={`touchable-sum-${button.label}`}
                  style={!disabled ? styles.button : styles.disabledButton}
                  onPress={(e) => button.onPress(e, button.liters, "sum")}
                  disabled={disabled}
                >
                  <Text style={styles.buttonText}>+ {button.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
