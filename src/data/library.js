import gifsData from "../gifsData";
import songData from "../songData";
import { toRawGitHubUrl } from "../utils/media";

export const gifs = gifsData.gifs;

export const songs = songData.songs.map((song) => ({
  ...song,
  url: toRawGitHubUrl(song.url),
}));
