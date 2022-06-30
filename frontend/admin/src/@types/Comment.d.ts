export interface Comment {
  _id?: string;
  comment: string;
  email: string;
  commentedOn?: string;
  articleId: string;
}
