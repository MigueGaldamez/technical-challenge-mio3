export interface Todo {
  _id: string;
  text: string;
  completed?: boolean;
}

export interface UserForm {
  username: string;
  password: string;
}