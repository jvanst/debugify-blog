import { QuerySnapshot } from "firebase/firestore";

export interface RootState {
  dark: Boolean;
}

export interface UserState {
  displayName: String;
  email: String;
  isLoggedIn: Boolean;
  permission: Number;
  loading: Boolean;
  error: Boolean;
}

export interface Post {
  author: String;
  title: String;
  date: Number;
  short_description: String;
}

export interface PostState {
  posts: Array<Post>;
  snapshot: QuerySnapshot;
  loading: Boolean;
}
