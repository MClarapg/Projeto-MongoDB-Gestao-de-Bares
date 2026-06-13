// Para rodar o código, acesse o Mongoshdb Shell pelo terminal, já executando

use ("Caipivaras");     // Nome do nosso bar (Caipirinha + Capivaras)

// Caso precise droppar as informações: 
db.funcionario.drop()
db.produto.drop()
db.caixa.drop()
db.comanda.drop()
db.vendas.drop()

// O povoamento foi feito com 15 instâncias em cada coleção
/*
    Observações:
      A ordem de criação importa, há coleções que dependem de outras, então a ordem de criação deve ser:
      1. "funcionario", "produto", "caixa"
      2. "comanda"
      3. "vendas"
      
      O formato de data é diferente pelo próprio padrão do MongoDB:
      A data é conhecida como: YYYY-MM-DDTHH:MM:SSZ
      Por exemplo: 2026-06-08T17:00:00, ou seja, dia 08 de 06 de 2026, às 17h
*/

// Criação da coleção funcionario
db.createCollection("funcionario")

/* Povoando a coleção funcionario
    Funcionário:
        id_func                  (identificador)
        nome_func
        cargo                    (caixa, garcom, gerente, barman)
        salario                   
*/

db.funcionario.insertMany([
  {"id_func": "func_01", "nome_func": "Felipe Almeida", "cargo": "garcom", "salario": 2600.00}, 
  {"id_func": "func_02", "nome_func": "Kaynan Roberth", "cargo": "barman", "salario": 3000.00}, 
  {"id_func": "func_03", "nome_func": "Guilherme Zloccowick", "cargo": "gerente", "salario": 3600.00},
  {"id_func": "func_04", "nome_func": "Caio Daltro", "cargo": "caixa", "salario": 2600.00}, 
  {"id_func": "func_05", "nome_func": "Clara Pereira", "cargo": "garcom", "salario": 2600.00},
  {"id_func": "func_06", "nome_func": "Jonas Barbosa", "cargo": "garcom", "salario": 2600.00},
]) 

// Criação da coleção produto
db.createCollection("produto")

/* Povoando a coleção produto
    Produto:
        id_prod                     (identificador)
        nome_prod
        categoria                   (bebida, porção)
        preco
        estoque
*/

db.produto.insertMany([
  { "id_prod": "id_p01", "nome_prod": "Chopp Artesanal", "categoria": "bebida", "preco": 8.00, "estoque": 150 },
  { "id_prod": "id_p02", "nome_prod": "Batata Frita", "categoria": "porção", "preco": 15.00, "estoque": 40 },
  { "id_prod": "id_p03", "nome_prod": "Caipirinha de Limão", "categoria": "bebida", "preco": 8.00, "estoque": 80 },
  { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "categoria": "porção", "preco": 28.00, "estoque": 50 },
  { "id_prod": "id_p05", "nome_prod": "Breja", "categoria": "bebida", "preco": 6.00, "estoque": 200 }
])

// Criação da coleção caixa
db.createCollection("caixa")

/* Povoando a coleção caixa
    Caixa:    
      id_cx                               (identificador)
      hora_abertura                       
      hora_fechamento                     
      valor_abertura                      
      valor_fechamento
      status                              (fechado, aberto)
*/

db.caixa.insertMany( [
  { "id_cx": "id_cx20260608", "hora_abertura": ISODate("2026-06-08T17:00:00Z"), "hora_fechamento": ISODate("2026-06-09T02:00:00Z"), "valor_abertura": 200.00, "valor_fechamento": 1850.00, "status": "fechado" },
  { "id_cx": "id_cx20260609", "hora_abertura": ISODate("2026-06-09T17:00:00Z"), "hora_fechamento": ISODate("2026-06-10T02:30:00Z"), "valor_abertura": 200.00, "valor_fechamento": 2100.00, "status": "fechado" },
  { "id_cx": "id_cx20260610", "hora_abertura": ISODate("2026-06-10T17:00:00Z"), "hora_fechamento": ISODate("2026-06-11T01:15:00Z"), "valor_abertura": 250.00, "valor_fechamento": 1550.00, "status": "fechado" },
  { "id_cx": "id_cx20260611", "hora_abertura": ISODate("2026-06-11T17:00:00Z"), "hora_fechamento": ISODate("2026-06-11T16:00:00Z"), "valor_abertura": 150.00, "valor_fechamento": 720.00, "status": "fechado" },
  { "id_cx": "id_cx20260612", "hora_abertura": ISODate("2026-06-12T17:00:00Z"), "hora_fechamento": null, "valor_abertura": 300.00, "valor_fechamento": null, "status": "aberto" }
])

// Criação da coleção comanda
db.createCollection("comanda")

/* Povoando a coleção comanda
    Comanda:
      id_co                               (identificador)
      numero_mesa
      quantidade_pessoas                  (na mesa)
      status                              (livre, ocupada)
      id_garcom                           (referencia funcionario, apenas quando for garçom)
      itens (pedido):	[{		 		            (array, podem ser vários itens)
          id_produto                      (referencia produto)
          nome_produto
          quantidade_prod
          preco_unitario_produto }]    
      total_parcial
*/

db.comanda.insertMany([
  { "id_co": "com_mesa_04",  "numero_mesa": 4, "quantidade_pessoas": 2, "status": "ocupada",  "id_garcom": "func_01",
    "itens": (
      { "id_prod": "id_p01", "nome_prod": "Chopp Artesanal", "quantidade_prod": 3,  "preco_unitario_prod": 8.00},
      { "id_prod": "id_p02", "nome_prod": "Batata Frita", "quantidade_prod": 1, "preco_unitario_prod": 15.00 } ),
    "total_parcial": 39.00 },

  { "id_co": "com_mesa_12", "numero_mesa": 12, "quantidade_pessoas": 4, "status": "ocupada", "id_garcom": "func_05",
    "itens": (
      { "id_prod": "id_p03", "nome_prod": "Caipirinha de Limão", "quantidade_prod": 4, "preco_unitario_produto": 18.00 },
      { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "quantidade_prod": 4, "preco_unitario_produto": 28.00 } ),
    "total_parcial": 184.00 },

  {"id_co": "com_mesa_01", "numero_mesa": 1, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

  { "id_co": "com_mesa_07", "numero_mesa": 7, "quantidade_pessoas": 1, "status": "ocupada", "id_garcom": "func_01",
    "itens": [
    	  { "id_prod": "id_p05", "nome_prod": "Breja", "quantidade_prod": 1, "preco_unitario_produto": 6.00 } ],
    "total_parcial": 6.00 },

  { "id_co": "com_mesa_02", "numero_mesa": 2, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

    {"id_co": "com_mesa_23", "numero_mesa": 17, "quantidade_pessoas": 2, "status": "ocupada", "id_garcom": "func_05",
    "itens": [
      { "id_prod": "id_p03", "nome_prod": "Batata", "quantidade_prod": 3, "preco_unitario_produto": 15.00 },
      { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "quantidade_prod": 4, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p01", "nome_prod": "chopp", "quantidade_prod": 1, "preco_unitario_produto": 8.00 }],
    "total_parcial": 165.00 }
])

// Criação da coleção vendas
db.createCollection("vendas")

/* Povoando a coleção vendas
    Vendas:
      id_venda
      id_comanda_origem                   (referencia comanda)
      data
      id_caixa
      itens_vendidos:				              // array, podem ser vários itens
          nome_prod                    (referencia produto)
          quantidade_prod
          preco_pago
      total_pago
      forma_pagamento                     (dinheiro, pix, cartão)
      cpf_venda                           (cpf na nota)

    Só é inserida uma instância em vendas logo antes da comanda correspondente ser fechada,
    os atributos são copiados como valores da nova instância, então a mesa é dada como livre novamente
*/

db.vendas.insertMany([
  { "id_venda": "venda_001", "id_comanda_origem": "com_antiga_101", "data": ISODate("2026-06-08T21:40:00Z"), "id_caixa": "id_cx20260610",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 5, "preco_pago": 8.00 },
      { "nome_produto": "Batata Frita", "quantidade_prod": 2, "preco_pago": 15.00 }],
    "total_pago": 70.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_002", "id_comanda_origem": "com_antiga_102", "data": ISODate("2026-06-08T23:15:00Z"), "id_caixa": "id_cx20260611",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer", "quantidade_prod": 1, "preco_pago": 28.00 },
      { "nome_produto": "Caipirinha de Limão", "quantidade_prod": 2, "preco_pago": 8.00 }],
    "total_pago": 44.00,
    "forma_pagamento": "pix",
    "cpf_venda": "780.678.678-09" },

  { "id_venda": "venda_003", "id_comanda_origem": "com_antiga_103", "data": ISODate("2026-06-09T22:00:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Breja", "quantidade_prod": 2, "preco_pago": 6.00 }],
    "total_pago": 12.00,
    "forma_pagamento": "dinheiro" },

  { "id_venda": "venda_004", "id_comanda_origem": "com_antiga_104", "data": ISODate("2026-06-09T23:55:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 10, "preco_pago": 8.00 },
      { "nome_produto": "Batata Frita", "quantidade_prod": 3, "preco_pago": 15.00 }],
    "total_pago": 125.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_005", "id_comanda_origem": "com_antiga_105", "data": ISODate("2026-06-10T20:10:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer", "quantidade_prod": 2, "preco_pago": 28.00 },
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 4, "preco_pago": 8.00 }],
    "total_pago": 88.00,
    "forma_pagamento": "pix",
    "cpf_venda": "234.324.432-00" },
])