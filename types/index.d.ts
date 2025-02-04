interface VideoProps extends Models.Document {
  title: string;
  video: string;
  creator: {
    avatar: string;
    username: string;
  };
  thumbnail: string;
}
