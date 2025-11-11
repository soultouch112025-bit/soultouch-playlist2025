import { StyleSheet } from "react-native";

const playlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  songRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#2c2c2c",
    borderBottomWidth: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
  },
  songDuration: {
    color: "#aaa",
  },
});

export default playlistStyles;
