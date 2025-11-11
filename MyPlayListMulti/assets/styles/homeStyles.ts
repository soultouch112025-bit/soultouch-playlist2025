import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    margin: 8,
    overflow: "hidden",
    elevation: 3,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
  },
  playButton: {
    position: "absolute",
    right: 10,
    bottom: 40,
  },
  cardInfo: {
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },
});

export default homeStyles;
