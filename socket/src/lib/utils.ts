export function cleanYTData(data: Array<any>) {
  return data.map((ytItem) => {
    const { id, snippet } = ytItem;
    return {
      videoId: id.videoId,
      image: snippet.thumbnails.high.url,
      title: snippet.title,
      description: snippet.description,
      author: snippet.channelTitle,
    };
  });
}
