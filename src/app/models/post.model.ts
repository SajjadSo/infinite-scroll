export interface IPostApi {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
}
