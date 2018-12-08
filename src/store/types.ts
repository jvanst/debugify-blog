import { QuerySnapshot } from "firebase/firestore";

export interface RootState {
  dark: boolean;
}

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  isLoggedIn: boolean;
  permission: number;
  photoURL: string;
  loading: boolean;
}

export interface Post {
  id: string;
  author: string;
  title: string;
  date: number;
  short_description: string;
  contentHTML: string;
  saved: boolean;
}

export interface PostState {
  posts: { [id: string]: Post };
  snapshot: QuerySnapshot;
  loading: boolean;
}
