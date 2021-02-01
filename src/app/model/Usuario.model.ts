export class Usuario {
    id: number;
    Nome: string;
    UserName: string;
    senha: string;
    autenticado: boolean;
    acessToken: string;
    sessaoExpira: Date;
}