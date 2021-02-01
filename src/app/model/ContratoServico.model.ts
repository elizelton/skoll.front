import { ServicoPrestado } from "./ServicoPrestado.model"

export class ContratoServico {
    id: number;
    idContrato: number;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
    servicoPrestado: ServicoPrestado
}
