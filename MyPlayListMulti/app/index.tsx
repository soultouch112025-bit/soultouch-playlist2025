// app/index.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../assets/styles/homeStyles";

export default function HomeScreen() {
  const router = useRouter();

  const playlists: Playlist[] = [
    {
      id: "1",
      title: "Chill Vibes",
      songs: 24,
      image: require("../assets/images/vibe.jpg"),
    },
    {
      id: "2",
      title: "Workout Beats",
      songs: 18,
      image: require("../assets/images/image-run.jpg"),
    },
    {
      id: "3",
      title: "Romantic Hits",
      songs: 30,
      image: require("../assets/images/cassette-girl.jpg"),
    },
    {
      id: "4",
      title: "Top 50 Global",
      songs: 50,
      image: require("../assets/images/cassette.jpg"),
    },
  ];

  const renderPlaylist = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/playlist", params: item })}
    >
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle" size={40} color="#1DB954" />
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.songs} songs</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.header}>🎵 Soul Touch</Text>
        <Ionicons name="person-circle" size={32} color="#fff" />
      </View>

      <FlatList
        data={playlists}
        renderItem={renderPlaylist}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
