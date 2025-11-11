// styles/globalStyles.ts
import { StyleSheet } from "react-native";
import { Colors, Spacing, FontSizes } from "./theme";

const globalStyles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.background,
paddingTop: 60,
paddingHorizontal: Spacing.md,
},
headerRow: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginBottom: Spacing.md,
},
headerText: {
fontSize: FontSizes.lg,
fontWeight: "bold",
color: Colors.textPrimary,
},
});

export default globalStyles;
