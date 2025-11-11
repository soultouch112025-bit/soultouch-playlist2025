export type RootStackParamList = {
Home: undefined;
Playlist: { playlist: Playlist };
};

export type Playlist = {
id: string;
title: string;
songs: number;
image: string;
};
