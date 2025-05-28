export interface Todo {
  _id: string;
  text: string;
  completado?:boolean;
  fechaHoraCompletado?:Date,
  usuarioCompleta:string;

  user?:any;
}

export interface UserForm {
  username: string;
  password: string;
}