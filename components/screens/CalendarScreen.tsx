import React, { useMemo, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import styles, { colors } from "../../styles";
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";
import { useSelector } from "react-redux";
import { RootState, store } from "../../stores";
import {
  HistoryState,
  removeFromHistory,
} from "../../features/waterIntake.slice";
import { TrashIcon } from "../../icons/TrashIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { MinusIcon } from "../../icons/MinusIcon";

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const { waterConfig, history } = useSelector(
    (state: RootState) => state.waterIntakeSlice
  );
  const filteredData = useMemo<HistoryState[]>(
    () =>
      history.filter(
        (data) =>
          moment(data.date).format("DD/MM/YYYY") ===
          moment(selectedDate).format("DD/MM/YYYY")
      ),
    [selectedDate, history]
  );
  return (
    <View style={styles.container}>
      <CalendarPicker
        textStyle={{ color: colors.text }}
        onDateChange={(date: Moment, type: "START_DATE" | "END_DATE") =>
          setSelectedDate(moment(date))
        }
      />
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Text style={styles.subtitle}>Entries for this day</Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {filteredData.length > 0 ? (
          filteredData.map((data) => (
            <View
              key={`history-${data.id}`}
              style={{
                width: "100%",
                justifyContent: "space-around",
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginVertical: 2,
                alignItems: "center",
                borderRadius: 10,
                backgroundColor:
                  data.operation === "sum" ? colors.green : colors.fourh,
              }}
            >
              <Text style={styles.text}>
                {data.operation === "sum" ? <PlusIcon /> : <MinusIcon />}
              </Text>
              <Text style={styles.text}>{data.liters.toFixed(1)} L</Text>
              <Text style={styles.text}>
                {moment(data.date).format("MMMM DD YYYY, hh:mm a")}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  data.id && store.dispatch(removeFromHistory({ id: data.id }))
                }
                accessibilityLabel="delete entry"
              >
                <TrashIcon />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.subcontainer}>
            <Text style={styles.subtitle}>No data to show for this day</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
