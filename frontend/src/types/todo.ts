export interface Todo {
  _id: string;
  text: string;
  completado?:boolean;
  fechaHoraCompletado?:Date,
  usuarioCompleta:any;
  description:string;
  user?:any;
}

export interface UserForm {
  username: string;
  password: string;
}