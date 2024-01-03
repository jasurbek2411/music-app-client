export interface ITrack {
  _id: string;
  artist: string;
  audio: string;
  comments: IComment[];
  name: string;
  picture: string;
  text: string;
  listens: number;
}

export interface IComment {
  username: string;
  text: string;
  trackId: string;
}
