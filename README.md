Projeto MongoDB 
Tema: Gestão de Bares

Requisitos:
1. MongoDB Comunity Server
2. MongoDB Shell

Também tem o MongoDB Compass que tem interface gráfica, mas não é necessário.
A linguagem dos arquivos é JavaScript apenas por formalidade, também pode ser usada a variante mongodb.js.

Como executar:
1. Esteja com o mongodb Shell executando no terminal e inicialize com: 
> use GestaoBar

2. Copie o código de povoamento.js no terminal e dê enter.
    Não sei como fica para vocês, mas não consegui inicializar direto pelo VSCode, nem colocar para carregar no mongodb Shell. 
    Para colar no mongodb Shell, basta copiar o código e pressionar o botão direito do mouse 
    (Crtl+V, não funcionava).

As demais consultas e operações do checklist ainda serão feitas e muito provavelmente precisaremos aumentar nosso banco de dados.

Link importante:
    Ele tem várias tabelas comparativas de operações em SQL x MongoDB
>   https://www.mongodb.com/pt-br/docs/manual/reference/sql-comparison/


Sobre as coleções (equivalente às tabelas em SQL):
* Funcionário:
    id_func                             (identificador)
    nome_func
    cargo                               (caixa, garcom, gerente, barista)
    salario

* Produto:
    id_prod                             (identificador)
    nome_prod
    categoria                           (bebida, porção)
    preco
    estoque

* Comanda
    id_co                               (identificador)
    numero_mesa
    quantidade_pessoas                  (na mesa)
    status                              (livre, ocupada)
    id_garcom                           (referencia funcionario)
    itens (pedido):					    // array, podem ser vários itens
        id_produto                      (referencia produto)
        nome_produto
        quantidade_produto
        preco_unitario_produto 		    
    total_parcial

* Caixa
    id_cx                               (identificador)
    hora_abertura                       // em ISODate
    hora_fechamento                     // em ISODate
    valor_abertura                      (troco)
    valor_fechamento
    status                              (fechado, aberto)

* Vendas
    id_venda
    id_comanda_origem                   (referencia comanda)
    data
    id_caixa
    itens_vendidos:				        // array, podem ser vários itens
        nome_produto                    (referencia produto)
        quantidade_produto
        preco_pago
    total_pago
    forma_pagamento                     (dinheiro, pix, cartão)

Dependências:
    Uma instância só é adicionada a vendas logo antes da comanda ser fechada, já que os valores são copiados para vendas, e então a comanda é liberada (volta a ter seus valores nulos).

Espaço de melhoria:
    Podemos adicionar mais coleções, como explorar a relação com fornecedores (faz menção ao estoque de produto).