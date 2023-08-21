import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>

      <CalendarPicker
        onDateChange={(date: Moment, type: "START_DATE" | "END_DATE") =>
          setSelectedDate(moment(date).toString())
        }
      />
      <View>
        <Text>SELECTED DATE:{selectedDate}</Text>
      </View>
    </View>
  );
};
