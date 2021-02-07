import { PoMenuItem } from "@po-ui/ng-components";

export default function menu(): Array<PoMenuItem> {
    return [
        {
            label: 'Home',
            icon: 'po-icon-home',
            link: '/',
        },
        {
            label: 'Contas a Pagar',
            icon: 'po-icon po-icon-sale',
            link: 'conta-pagar',
        },
        {
            label: 'Contratos',
            icon: 'po-icon-document-filled',
            link: 'contrato',
        },
        {
            label: 'Comissão',
            icon: 'po-icon po-icon-finance',
            link: 'comissao',
        },
        {
            label: 'Clientes',
            icon: 'po-icon-user',
            shortLabel: 'Clientes',
            link: 'cliente',
        },
        {
            label: 'Formas de Pagamento',
            icon: 'po-icon-credit-payment',
            link: 'forma-pagamento',
        },
        {
            label: 'Fornecedores',
            icon: 'po-icon-truck',
            shortLabel: 'Fornecedores',
            link: 'fornecedor',
        },
        {
            label: 'Produtos/Serviços',
            icon: 'po-icon po-icon-stock',
            link: 'produto',
        },
        {
            label: 'Vendedores',
            icon: 'po-icon po-icon-handshake',
            link: 'vendedor',
        },
        {
            label: 'Relatórios',
            icon: 'po-icon-print',
            link: 'relatorio',
            subItems: [
                {
                    label: 'Parcelas a vencer',
                    icon: 'po-icon-print',
                    link: 'relatorio',
                },
                {
                    label: 'Contrato vendedor',
                    icon: 'po-icon-print',
                    link: 'relatorio',
                }
            ]
        },
        {
            label: 'Usuários',
            icon: 'po-icon-users',
            shortLabel: 'Usuários',
            link: 'usuario',
        },
    ];
}