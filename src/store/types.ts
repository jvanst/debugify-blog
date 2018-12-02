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
  title: String;
}

export interface PostState {
  posts: Array<Post>;
}
