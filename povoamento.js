/* Para rodar o código, acesse o Mongoshdb Shell pelo terminal, já executando,
    Nome do banco de dados: GestaoBar, se não existir, cria de forma implícita
    Inicialize com:
      use GestaoBar
*/

// Caso precise droppar as informações: fica ativado para teste
db.funcionario.drop()
db.produto.drop()
db.caixa.drop()
db.comanda.drop()
db.vendas.drop()

// Criação das coleções (o equivalente a tabelas)
// Embora a criação implícita funcione, é bom garantir
db.createCollection("funcionario")
db.createCollection("produto")
db.createCollection("caixa")
db.createCollection("comanda")
db.createCollection("vendas")

// O povoamento foi feito com apenas 5 exemplos de cada, mas pode ser facilmente incrementado
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

// Povoando a coleção funcionario
db.funcionario.insertMany([
  {"id_func": "func_01", "nome_func": "Felipe Almeida", "cargo": "garcom", "salario": 2000.00}, 
  {"id_func": "func_02", "nome_func": "Kaynan Roberth", "cargo": "barista", "salario": 2500.00}, 
  {"id_func": "func_03", "nome_func": "Guilherme Zloccowick", "cargo": "gerente", "salario": 3000.00 },
  {"id_func": "func_04", "nome_func": "Caio Daltro", "cargo": "faxineiro", "salario": 1700.00 }, 
  {"id_func": "func_05", "nome_func": "Clara Pereira", "cargo": "garcom", "salario": 2600.00 }
]) 

// Povoando a coleção produto
db.produto.insertMany([
  { "id_prod": "id_p01", "nome_prod": "Chopp Artesanal", "categoria": "bebida", "preco": 8.00, "estoque": 150 },
  { "id_prod": "id_p02", "nome_prod": "Batata Frita", "categoria": "porção", "preco": 15.00, "estoque": 40 },
  { "id_prod": "id_p03", "nome_prod": "Caipirinha de Limão", "categoria": "bebida", "preco": 8.00, "estoque": 80 },
  { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "categoria": "porção", "preco": 28.00, "estoque": 50 },
  { "id_prod": "id_p05", "nome_prod": "Breja", "categoria": "bebida", "preco": 6.00, "estoque": 200 }
])

// Povoando a coleção caixa
db.caixa.insertMany( [
  { "id_cx": "id_cx260608", "hora_abertura": ISODate("2026-06-08T17:00:00Z"), "hora_fechamento": ISODate("2026-06-09T02:00:00Z"), "valor_abertura": 200.00, "valor_fechamento": 1850.00, "status": "fechado" },
  { "id_cx": "id_cx260609", "hora_abertura": ISODate("2026-06-09T17:00:00Z"), "hora_fechamento": ISODate("2026-06-10T02:30:00Z"), "valor_abertura": 200.00, "valor_fechamento": 2100.00, "status": "fechado" },
  { "id_cx": "id_cx260610", "hora_abertura": ISODate("2026-06-10T17:00:00Z"), "hora_fechamento": ISODate("2026-06-11T01:15:00Z"), "valor_abertura": 250.00, "valor_fechamento": 1550.00, "status": "fechado" },
  { "id_cx": "id_cx260611", "hora_abertura": ISODate("2026-06-11T17:00:00Z"), "hora_fechamento": ISODate("2026-06-11T16:00:00Z"), "valor_abertura": 150.00, "valor_fechamento": 720.00, "status": "fechado" },
  { "id_cx": "id_cx260612", "hora_abertura": ISODate("2026-06-12T17:00:00Z"), "hora_fechamento": null, "valor_abertura": 300.00, "valor_fechamento": null, "status": "aberto" }
])

// Povoando a coleção comanda
db.comanda.insertMany([
  { "id_co": "com_mesa_04",  "numero_mesa": 4, "quantidade_pessoas": 2, "status": "ocupada",  "id_garcom": "01",
    "itens": (
      { "id_prod": "id_p01", "nome_prod": "Chopp Artesanal", "quantidade_prod": 3,  "preco_unitario_prod": 8.00},
      { "id_prod": "id_p02", "nome_prod": "Batata Frita", "quantidade_prod": 1, "preco_unitario_prod": 15.00 } ),
    "total_parcial": 71.00 },

  { "id_co": "com_mesa_12", "numero_mesa": 12, "quantidade_pessoas": 4, "status": "ocupada", "id_garcom": "05",
    "itens": (
      { "id_produto": "id_p03", "nome_produto": "Caipirinha de Limão", "quantidade_produto": 4, "preco_unitario_produto": 18.00 },
      { "id_produto": "id_p04", "nome_produto": "Hambúrguer", "quantidade_produto": 4, "preco_unitario_produto": 28.00 } ),
    "total_parcial": 184.00 },

  {"id_co": "com_mesa_01", "numero_mesa": 1, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

  { "id_co": "com_mesa_07", "numero_mesa": 7, "quantidade_pessoas": 1, "status": "ocupada", "id_garcom": "01",
    "itens": [
    	  { "id_produto": "id_p05", "nome_prod": "Café Espresso", "quantidade_produto": 1, "preco_unitario_produto": 6.00 } ],
    "total_parcial": 6.00 },

  { "id_co": "com_mesa_02", "numero_mesa": 2, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 } 
])

// Povoando a coleção vendas
db.vendas.insertMany([
  { "_id": "venda_001", "id_comanda_origem": "com_antiga_101", "data": ISODate("2026-06-08T21:40:00Z"), "id_caixa": "cx_20260608",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal 500ml", "quantidade_produto": 5, "preco_pago": 12.00 },
      { "nome_produto": "Batata Frita com Queijo", "quantidade_produto": 2, "preco_pago": 35.00 }],
    "total_pago": 130.00,
    "forma_pagamento": "cartão" },

  { "_id": "venda_002", "id_comanda_origem": "com_antiga_102", "data": ISODate("2026-06-08T23:15:00Z"), "id_caixa": "cx_20260608",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer da Casa", "quantidade_produto": 1, "preco_pago": 28.00 },
      { "nome_produto": "Caipirinha de Limão", "quantidade_produto": 2, "preco_pago": 18.00 }],
    "total_pago": 64.00,
    "forma_pagamento": "pix" },

  { "_id": "venda_003", "id_comanda_origem": "com_antiga_103", "data": ISODate("2026-06-09T22:00:00Z"), "id_caixa": "cx_20260609",
    "itens_vendidos": [
      { "nome_produto": "Café Espresso", "quantidade_produto": 2, "preco_pago": 6.00 }],
    "total_pago": 12.00,
    "forma_pagamento": "dinheiro" },

  { "_id": "venda_004", "id_comanda_origem": "com_antiga_104", "data": ISODate("2026-06-09T23:55:00Z"), "id_caixa": "cx_20260609",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal 500ml", "quantidade_produto": 10, "preco_pago": 12.00 },
      { "nome_produto": "Batata Frita com Queijo", "quantidade_produto": 3, "preco_pago": 35.00 }],
    "total_pago": 225.00,
    "forma_pagamento": "cartão" },

  { "_id": "venda_005", "id_comanda_origem": "com_antiga_105", "data": ISODate("2026-06-10T20:10:00Z"), "id_caixa": "cx_20260610",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer da Casa", "quantidade_produto": 2, "preco_pago": 28.00 },
      { "nome_produto": "Chopp Artesanal 500ml", "quantidade_produto": 4, "preco_pago": 12.00 }],
    "total_pago": 104.00,
    "forma_pagamento": "pix" }
])