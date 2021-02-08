export class Usuario {
    id: number;
    Nome: string;
    userName: string;
    email:string
    senha: string;
    ativo: boolean;
    autenticado: boolean;
    acessToken: string;
    sessaoExpira: Date;
}