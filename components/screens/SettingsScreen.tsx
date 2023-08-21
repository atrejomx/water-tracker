import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import styles from "../../styles";
import { User } from "../../interfaces/user.interface";
import RNPickerSelect from "react-native-picker-select";
import { validateInput } from "../../utils/validateInputs";
import {
  convertLToOz,
  getDailyWaterIntake,
} from "../../utils/getDailyWaterIntake";

export const SettingsScreen = () => {
  const [values, setValues] = useState<User>({
    name: "",
    weight: 70,
    weightMeasure: "kg",
  });
  const [invalidInputs, setInvalidInputs] = useState<{
    [key in User as string]: boolean;
  }>({
    weight: false,
  });
  const [intake, setIntake] = useState<number>(
    getDailyWaterIntake(values.weight)
  );

  const handleChange = (value: string, inputName: keyof typeof values) => {
    const isValid = validateInput(inputName, value);
    setInvalidInputs({ ...invalidInputs, [inputName]: !isValid });
    setValues({ ...values, [inputName]: value });
  };

  useEffect(() => {
    if (invalidInputs.weight) {
      return;
    }

    if (!values.weight) {
      return;
    }

    if (values.weightMeasure === "kg") {
      setIntake(getDailyWaterIntake(+values.weight));
      return;
    }

    const oz = convertLToOz(getDailyWaterIntake(+values.weight));
    setIntake(oz);
  }, [values.weight, values.weightMeasure, invalidInputs.weight]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Set up your profile to calculate your daily water intake
      </Text>
      <View style={styles.subcontainer}>
        <View style={{ width: "100%", gap: 8 }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={values.name}
            onChangeText={(v) => handleChange(v, "name")}
            autoCapitalize="words"
            placeholder="Your name"
            maxLength={50}
          />
        </View>
        <View style={{ width: "100%", gap: 8, flexDirection: "row" }}>
          <View style={{ width: "50%", gap: 8 }}>
            <Text style={styles.label}>Weight</Text>
            {invalidInputs.weight && <Text>Weight should be a number.</Text>}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(values.weight)}
              onChangeText={(v) => handleChange(v, "weight")}
              autoCapitalize="words"
              placeholder="70"
              maxLength={3}
            />
          </View>
          <View style={{ width: "50%", gap: 8 }}>
            <Text style={styles.label}>Measure</Text>
            <RNPickerSelect
              style={{
                inputAndroid: styles.input,
                inputIOS: styles.input,
              }}
              placeholder={"Select a metric"}
              value={values.weightMeasure}
              onValueChange={(value) => handleChange(value, "weightMeasure")}
              items={[
                { label: "Pounds", value: "lb", key: "lb" },
                { label: "Kilograms", value: "kg", key: "kg" },
              ]}
              key={"Picker select"}
            />
          </View>
        </View>
      </View>
      <View style={styles.subcontainer}>
        <Text style={styles.subtitle}>You should take </Text>
        <Text style={styles.mainText}>{intake.toFixed(2)}</Text>
        <Text style={styles.subtitle}>
          {values.weightMeasure === "kg" ? "liters" : "ounces"} daily
        </Text>
      </View>
    </View>
  );
};
