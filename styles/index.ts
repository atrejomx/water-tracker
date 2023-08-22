import { StyleSheet } from "react-native";

export const colors = {
  primary: "#023047",
  secondary: "#219EBC",
  selected: "#49c4e0",
  third: "#8ECAE6",
  fourh: "#FFB703",
  fifth: "#FB8500",
  text: "#f0f6f6",
  white: "#ffffff",
  lightBlue: "#4dd8e6",
  turquoise: "#bbe6e4",
  gray: "#bdbdbd",
  green: "#558C8C",
  red: "#E15554",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  subcontainer: {
    flex: 1,
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    width: "100%",
    textAlign: "left",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tabNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabNav: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  tabNavSelected: {
    flex: 1,
    backgroundColor: colors.selected,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    textAlign: "center",
    color: colors.text,
  },
  title: {
    color: colors.turquoise,
    fontSize: 24,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 14,
  },
  subtitle: {
    color: colors.turquoise,
    fontSize: 16,
  },
  mainText: {
    color: colors.turquoise,
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  text: {
    color: colors.text,
  },
  label: {
    color: colors.text,
    width: "100%",
    textAlign: "left",
    fontSize: 14,
  },
  input: {
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.text,
    color: colors.text,
    width: "100%",
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: colors.gray,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    color: colors.white,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fff",
  },
});

export default styles;
