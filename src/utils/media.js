export function toRawGitHubUrl(url) {
  return url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
}

export function getCircularIndex(index, direction, collectionLength) {
  if (!collectionLength) {
    return 0;
  }

  return (index + direction + collectionLength) % collectionLength;
}

export function pickDifferentSong(songs, excludedUrl) {
  if (!songs.length) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);
  const selectedSong = songs[randomIndex];

  if (selectedSong.url !== excludedUrl) {
    return selectedSong;
  }

  return songs[(randomIndex + 1) % songs.length];
}

export function preloadImages(urls) {
  urls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}
