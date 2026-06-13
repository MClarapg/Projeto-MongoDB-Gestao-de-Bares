// Para rodar o código, acesse o Mongoshdb Shell pelo terminal, já executando

use ("Caipivaras");     // Nome do nosso bar (Caipirinha + Capivaras)

// Caso precise droppar as informações: 
db.funcionario.drop()
db.produto.drop()
db.caixa.drop()
db.comanda.drop()
db.vendas.drop()
db.venda.drop()         // é renomeado na parte de consultas, fica como garantia

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
  {"id_func": "func_07", "nome_func": "Carmy Berzatto", "cargo": "barman", "salario": 3000.00},
  {"id_func": "func_08", "nome_func": "Sydney Adamu", "cargo": "barman", "salario": 3000.00},
  {"id_func": "func_09", "nome_func": "Tiana", "cargo": "garcom", "salario": 2600.00},
  {"id_func": "func_10", "nome_func": "Don Lotário", "cargo": "garcom", "salario": 2600.00},
  {"id_func": "func_11", "nome_func": "Lula Molusco", "cargo": "caixa", "salario": 2600.00},
  {"id_func": "func_12", "nome_func": "Bob Panqueca", "cargo": "caixa", "salario": 2600.00}
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
  { "id_prod": "id_p05", "nome_prod": "Breja", "categoria": "bebida", "preco": 6.00, "estoque": 200 },
  { "id_prod": "id_p06", "nome_prod": "Gin Tônica", "categoria": "bebida", "preco": 25.00, "estoque": 60 },
  { "id_prod": "id_p07", "nome_prod": "Moscow Mule", "categoria": "bebida", "preco": 28.00, "estoque": 45 },
  { "id_prod": "id_p08", "nome_prod": "Beats", "categoria": "bebida", "preco": 9.00, "estoque": 80 },
  { "id_prod": "id_p09", "nome_prod": "Dose de Cachaça", "categoria": "bebida", "preco": 7.00, "estoque": 60 },
  { "id_prod": "id_p10", "nome_prod": "Cosmopolitan", "categoria": "bebida", "preco": 23.00, "estoque": 50 },
  { "id_prod": "id_p11", "nome_prod": "Água Mineral", "categoria": "bebida", "preco": 5.00, "estoque": 150 },
  { "id_prod": "id_p12", "nome_prod": "Refrigerante", "categoria": "bebida", "preco": 6.00, "estoque": 150 },
  { "id_prod": "id_p13", "nome_prod": "Frango a Passarinho", "categoria": "porção", "preco": 35.00, "estoque": 30 },
  { "id_prod": "id_p14", "nome_prod": "Calabresa Acebolada", "categoria": "porção", "preco": 32.00, "estoque": 35 },
  { "id_prod": "id_p15", "nome_prod": "Macaxeica Frita", "categoria": "porção", "preco": 20.00, "estoque": 45 }
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
  { "id_cx": "id_cx20260529", "hora_abertura": ISODate("2026-05-29T17:00:00Z"), "hora_fechamento": ISODate("2026-05-30T02:00:00Z"), "valor_abertura": 200.00, "valor_fechamento": 1950.00, "status": "fechado" },
  { "id_cx": "id_cx20260530", "hora_abertura": ISODate("2026-05-30T17:00:00Z"), "hora_fechamento": ISODate("2026-05-31T03:00:00Z"), "valor_abertura": 300.00, "valor_fechamento": 3200.00, "status": "fechado" },
  { "id_cx": "id_cx20260531", "hora_abertura": ISODate("2026-05-31T16:00:00Z"), "hora_fechamento": ISODate("2026-06-01T01:30:00Z"), "valor_abertura": 250.00, "valor_fechamento": 1800.00, "status": "fechado" },
  { "id_cx": "id_cx20260601", "hora_abertura": ISODate("2026-06-01T17:00:00Z"), "hora_fechamento": ISODate("2026-06-02T01:00:00Z"), "valor_abertura": 150.00, "valor_fechamento": 950.00, "status": "fechado" },
  { "id_cx": "id_cx20260602", "hora_abertura": ISODate("2026-06-02T17:00:00Z"), "hora_fechamento": ISODate("2026-06-03T01:15:00Z"), "valor_abertura": 150.00, "valor_fechamento": 1100.00, "status": "fechado" },
  { "id_cx": "id_cx20260603", "hora_abertura": ISODate("2026-06-03T17:00:00Z"), "hora_fechamento": ISODate("2026-06-04T02:00:00Z"), "valor_abertura": 200.00, "valor_fechamento": 1350.00, "status": "fechado" },
  { "id_cx": "id_cx20260604", "hora_abertura": ISODate("2026-06-04T17:00:00Z"), "hora_fechamento": ISODate("2026-06-05T02:30:00Z"), "valor_abertura": 200.00, "valor_fechamento": 1600.00, "status": "fechado" },
  { "id_cx": "id_cx20260605", "hora_abertura": ISODate("2026-06-05T17:00:00Z"), "hora_fechamento": ISODate("2026-06-06T03:30:00Z"), "valor_abertura": 300.00, "valor_fechamento": 2900.00, "status": "fechado" },
  { "id_cx": "id_cx20260606", "hora_abertura": ISODate("2026-06-06T17:00:00Z"), "hora_fechamento": ISODate("2026-06-07T03:00:00Z"), "valor_abertura": 300.00, "valor_fechamento": 3150.00, "status": "fechado" },
  { "id_cx": "id_cx20260607", "hora_abertura": ISODate("2026-06-07T16:00:00Z"), "hora_fechamento": ISODate("2026-06-08T01:30:00Z"), "valor_abertura": 250.00, "valor_fechamento": 1700.00, "status": "fechado" },
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
  { "id_co": "com_mesa_04", "numero_mesa": 4, "quantidade_pessoas": 2, "status": "ocupada", "id_garcom": "func_01",
    "itens": [
      { "id_prod": "id_p01", "nome_prod": "Chopp Artesanal", "quantidade_prod": 3, "preco_unitario_prod": 8.00 },
      { "id_prod": "id_p02", "nome_prod": "Batata Frita", "quantidade_prod": 1, "preco_unitario_prod": 15.00 } ],
    "total_parcial": 39.00 },
  
    { "id_co": "com_mesa_03", "numero_mesa": 3, "quantidade_pessoas": 5, "status": "ocupada", "id_garcom": "func_09",
    "itens": [
      { "id_prod": "id_p01", "nome_prod": "Chopp", "quantidade_prod": 3, "preco_unitario_produto": 8.00 },
      { "id_prod": "id_p04", "nome_prod": "Hamburguer", "quantidade_prod": 2, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p05", "nome_prod": "Breja", "quantidade_prod": 3, "preco_unitario_produto": 6.00 },
      { "id_prod": "id_p13", "nome_prod": "Frango", "quantidade_prod": 1, "preco_unitario_produto": 35.00 },
      { "id_prod": "id_p14", "nome_prod": "Calabresa", "quantidade_prod": 2, "preco_unitario_produto": 32.00 } ],
    "total_parcial": 197.00 },

  { "id_co": "com_mesa_12", "numero_mesa": 12, "quantidade_pessoas": 4, "status": "ocupada", "id_garcom": "func_05",
    "itens": [
      { "id_prod": "id_p03", "nome_prod": "Caipirinha de Limão", "quantidade_prod": 4, "preco_unitario_produto": 18.00 },
      { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "quantidade_prod": 4, "preco_unitario_produto": 28.00 } ],
    "total_parcial": 184.00 },

  { "id_co": "com_mesa_01", "numero_mesa": 1, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

  { "id_co": "com_mesa_07", "numero_mesa": 7, "quantidade_pessoas": 1, "status": "ocupada", "id_garcom": "func_01",
    "itens": [
      { "id_prod": "id_p05", "nome_prod": "Breja", "quantidade_prod": 1, "preco_unitario_produto": 6.00 } ],
    "total_parcial": 6.00 },

  { "id_co": "com_mesa_02", "numero_mesa": 2, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

  { "id_co": "com_mesa_17", "numero_mesa": 17, "quantidade_pessoas": 2, "status": "ocupada", "id_garcom": "func_05",
    "itens": [
      { "id_prod": "id_p03", "nome_prod": "Batata", "quantidade_prod": 3, "preco_unitario_produto": 15.00 },
      { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "quantidade_prod": 4, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p01", "nome_prod": "chopp", "quantidade_prod": 1, "preco_unitario_produto": 8.00 } ],
    "total_parcial": 165.00 },

  { "id_co": "com_mesa_08", "numero_mesa": 8, "quantidade_pessoas": 0, "status": "livre", "id_garcom": null, 
    "itens": [], 
    "total_parcial": 0.00 },

  { "id_co": "com_mesa_05", "numero_mesa": 5, "quantidade_pessoas": 2, "status": "ocupada", "id_garcom": "func_10",
    "itens": [
      { "id_prod": "id_p07", "nome_prod": "Moscow Mule", "quantidade_prod": 2, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p13", "nome_prod": "Frango a Passarinho", "quantidade_prod": 1, "preco_unitario_produto": 35.00 }, 
      { "id_prod": "id_p14", "nome_prod": "Calabresa", "quantidade_prod": 2, "preco_unitario_produto": 32.00 } 
    ],
    "total_parcial": 155.00 },

  { "id_co": "com_mesa_13", "numero_mesa": 13, "quantidade_pessoas": 5, "status": "ocupada", "id_garcom": "func_09",
    "itens": [
      { "id_prod": "id_p08", "nome_prod": "Beats", "quantidade_prod": 6, "preco_unitario_produto": 9.00 },
      { "id_prod": "id_p12", "nome_prod": "Refrigerante", "quantidade_prod": 2, "preco_unitario_produto": 6.00 },
      { "id_prod": "id_p14", "nome_prod": "Calabresa", "quantidade_prod": 2, "preco_unitario_produto": 32.00 } ],
    "total_parcial": 130.00 },

  { "id_co": "com_mesa_15", "numero_mesa": 15, "quantidade_pessoas": 6, "status": "ocupada", "id_garcom": "func_10",
    "itens": [
      { "id_prod": "id_p06", "nome_prod": "Gin Tônica", "quantidade_prod": 4, "preco_unitario_produto": 25.00 },
      { "id_prod": "id_p04", "nome_prod": "Hambúrguer", "quantidade_prod": 3, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p15", "nome_prod": "Mandioca Frita", "quantidade_prod": 1, "preco_unitario_produto": 20.00 } ],
    "total_parcial": 204.00 },

  { "id_co": "com_mesa_06", "numero_mesa": 6, "quantidade_pessoas": 3, "status": "ocupada", "id_garcom": "func_01",
    "itens": [
      { "id_prod": "id_p09", "nome_prod": "Dose de Cachaça", "quantidade_prod": 3, "preco_unitario_produto": 7.00 },
      { "id_prod": "id_p10", "nome_prod": "Cosmopolitan", "quantidade_prod": 2, "preco_unitario_produto": 23.00 },
      { "id_prod": "id_p11", "nome_prod": "Agua Mineral", "quantidade_prod": 2, "preco_unitario_produto": 5.00 } ],
    "total_parcial": 77.00 },

  { "id_co": "com_mesa_10", "numero_mesa": 10, "quantidade_pessoas": 4, "status": "ocupada", "id_garcom": "func_05",
    "itens": [
      { "id_prod": "id_p04", "nome_prod": "Hamburguer", "quantidade_prod": 2, "preco_unitario_produto": 28.00 },
      { "id_prod": "id_p13", "nome_prod": "Frango", "quantidade_prod": 1, "preco_unitario_produto": 35.00 },
      { "id_prod": "id_p14", "nome_prod": "Calabresa", "quantidade_prod": 1, "preco_unitario_produto": 32.00 } ],
    "total_parcial": 123.00 }
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
  { "id_venda": "venda_001", "id_comanda_origem": "com_antiga_101", "data": ISODate("2026-06-10T21:40:00Z"), "id_caixa": "id_cx20260610",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 5, "preco_pago": 8.00 },
      { "nome_produto": "Batata Frita", "quantidade_prod": 2, "preco_pago": 15.00 }],
    "total_pago": 70.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_002", "id_comanda_origem": "com_antiga_102", "data": ISODate("2026-06-11T23:15:00Z"), "id_caixa": "id_cx20260611",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer", "quantidade_prod": 1, "preco_pago": 28.00 },
      { "nome_produto": "Caipirinha de Limão", "quantidade_prod": 2, "preco_pago": 8.00 }],
    "total_pago": 44.00,
    "forma_pagamento": "pix",
    "cpf_venda": "780.678.678-09" },

  { "id_venda": "venda_003", "id_comanda_origem": "com_antiga_103", "data": ISODate("2026-06-12T22:00:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Breja", "quantidade_prod": 2, "preco_pago": 6.00 }],
    "total_pago": 12.00,
    "forma_pagamento": "dinheiro" },

  { "id_venda": "venda_004", "id_comanda_origem": "com_antiga_104", "data": ISODate("2026-06-12T23:55:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 10, "preco_pago": 8.00 },
      { "nome_produto": "Batata Frita", "quantidade_prod": 3, "preco_pago": 15.00 }],
    "total_pago": 125.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_005", "id_comanda_origem": "com_antiga_105", "data": ISODate("2026-06-12T20:10:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Hambúrguer", "quantidade_prod": 2, "preco_pago": 28.00 },
      { "nome_produto": "Chopp Artesanal", "quantidade_prod": 4, "preco_pago": 8.00 }],
    "total_pago": 88.00,
    "forma_pagamento": "pix",
    "cpf_venda": "234.324.432-00" },

  { "id_venda": "venda_006", "id_comanda_origem": "com_mesa_03", "data": ISODate("2026-06-11T20:45:00Z"), "id_caixa": "id_cx20260611",
    "itens_vendidos": [
      { "nome_produto": "Chopp", "quantidade_prod": 3, "preco_pago": 8.00 },
      { "nome_produto": "Hamburguer", "quantidade_prod": 2, "preco_pago": 28.00 },
      { "nome_produto": "Breja", "quantidade_prod": 3, "preco_pago": 6.00 },
      { "nome_produto": "Frango", "quantidade_prod": 1, "preco_pago": 35.00 },
      { "nome_produto": "Calabresa", "quantidade_prod": 2, "preco_pago": 32.00 }],
    "total_pago": 197.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_007", "id_comanda_origem": "com_mesa_05", "data": ISODate("2026-06-12T19:30:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Moscow Mule", "quantidade_prod": 2, "preco_pago": 28.00 },
      { "nome_produto": "Frango a Passarinho", "quantidade_prod": 1, "preco_pago": 35.00 }],
    "total_pago": 91.00,
    "forma_pagamento": "pix",
    "cpf_venda": "415.892.351-12" },

  { "id_venda": "venda_008", "id_comanda_origem": "com_mesa_13", "data": ISODate("2026-06-12T21:15:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Beats", "quantidade_prod": 6, "preco_pago": 9.00 },
      { "nome_produto": "Refrigerante", "quantidade_prod": 2, "preco_pago": 6.00 },
      { "nome_produto": "Calabresa", "quantidade_prod": 2, "preco_pago": 32.00 }],
    "total_pago": 130.00,
    "forma_pagamento": "cartão" },

  { "id_venda": "venda_009", "id_comanda_origem": "com_mesa_15", "data": ISODate("2026-06-12T22:50:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Gin Tônica", "quantidade_prod": 4, "preco_pago": 25.00 },
      { "nome_produto": "Hambúrguer", "quantidade_prod": 3, "preco_pago": 28.00 },
      { "nome_produto": "Mandioca Frita", "quantidade_prod": 1, "preco_pago": 20.00 }],
    "total_pago": 204.00,
    "forma_pagamento": "pix" },

  { "id_venda": "venda_010", "id_comanda_origem": "com_mesa_06", "data": ISODate("2026-06-12T23:40:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Dose de Cachaça", "quantidade_prod": 3, "preco_pago": 7.00 },
      { "nome_produto": "Cosmopolitan", "quantidade_prod": 2, "preco_pago": 23.00 },
      { "nome_produto": "Agua Mineral", "quantidade_prod": 2, "preco_pago": 5.00 }],
    "total_pago": 77.00,
    "forma_pagamento": "dinheiro" },

  { "id_venda": "venda_011", "id_comanda_origem": "com_mesa_10", "data": ISODate("2026-06-13T01:10:00Z"), "id_caixa": "id_cx20260612",
    "itens_vendidos": [
      { "nome_produto": "Hamburguer", "quantidade_prod": 2, "preco_pago": 28.00 },
      { "nome_produto": "Frango", "quantidade_prod": 1, "preco_pago": 35.00 },
      { "nome_produto": "Calabresa", "quantidade_prod": 1, "preco_pago": 32.00 }],
    "total_pago": 123.00,
    "forma_pagamento": "cartão",
    "cpf_venda": "523.114.782-44" }
])