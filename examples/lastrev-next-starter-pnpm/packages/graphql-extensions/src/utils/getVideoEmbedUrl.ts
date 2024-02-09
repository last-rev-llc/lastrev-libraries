export const getVideoEmbedUrl = (assetURL: string) => {
  if (typeof assetURL !== 'string') {
    return null;
  }
  if (assetURL?.includes('youtu.be/')) {
    const vidId = assetURL?.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }
  //https://www.youtube.com/watch?v=xxxxxx
  if (assetURL?.includes('youtube.com/watch?v=')) {
    const vidId = assetURL?.split('youtube.com/watch?v=')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }
  //https://vimeo.com/xxxxxx
  if (assetURL?.includes('vimeo.com/')) {
    const vidId = assetURL?.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${vidId}`;
  }
  //https://www.facebook.com/photo.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetURL?.split('facebook.com/photo.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }
  //https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetURL?.split('facebook.com/video/video.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }
  return null;
};

export const getThumbnailURL = (assetURL: string) => {
  if (typeof assetURL !== 'string') {
    return null;
  }
  if (assetURL?.includes('youtu.be/')) {
    const vidId = assetURL?.split('youtu.be/')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://www.youtube.com/watch?v=xxxxxx
  if (assetURL?.includes('youtube.com/watch?v=')) {
    const vidId = assetURL?.split('youtube.com/watch?v=')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://vimeo.com/xxxxxx
  if (assetURL?.includes('vimeo.com/')) {
    const vidId = assetURL?.split('vimeo.com/')[1];
    return `https://i.vimeocdn.com/video/${vidId}_640.jpg`;
  }
  //https://www.facebook.com/photo.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetURL?.split('facebook.com/photo.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  //https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetURL?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetURL?.split('facebook.com/video/video.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  return null;
};
