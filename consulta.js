/*  Caso 1: Demissão do garçom que não atende mesas
    Operações: find, distinct, deleteMany, insert      */

db.funcionario.insertOne(  
    {"id_func": "func_21", "nome_func": "Caleb Vatore", "cargo": "garcom", "salario": 2600.00});

// Garçons ocupados, que não serão demitidos
var garcons_ocupados = db.comanda.distinct("id_garcom", { "status": "ocupada" });

db.funcionario.find(
    { "cargo":"garcom", 
     "id_func" : {"$nin": garcons_ocupados}},
    {"Nome do funcionário": "$nome_func",
     "_id": 0,}
)

// Deleta os garçons desocupados
db.funcionario.deleteMany({
  "cargo": "garcom",
  "id_func": { "$nin": garcons_ocupados }
});

print("Funcionário demitido com sucesso!")
print("Esperamos que ele tenha mais oportunidades no futuro, só não aqui.")


/* Caso 2: Fechando o caixa do dia
    Operações: aggregate, match, group, sum, update, set, findOne   */

// O caixa começa com valor de giro que deve ser somado 
var dados_caixa_aberto = db.caixa.findOne({ "id_cx": "id_cx20260612" });
var troco_inicial = dados_caixa_aberto ? dados_caixa_aberto.valor_abertura : 0;

var resultado_vendas = db.vendas.aggregate([
  { $match: { "id_caixa": "id_cx20260612" } },      // id do caixa do dia
  { $group: {
      "_id": "$id_caixa",                           // agrupa com todas as vendas registradas no dia
      "total_acumulado": { $sum: "$total_pago" }    // soma o valor de todas as vendas
    }}
]).toArray(); 

var faturamento_vendas = resultado_vendas.length > 0 ? resultado_vendas[0].total_acumulado : 0;
var valor_total_caixa = troco_inicial + faturamento_vendas;

db.caixa.updateOne(
  { "id_cx": "id_cx20260612" },
  { "$set": {                                       // atualização
      "hora_fechamento": new Date(),                // coloca a hora de fechamento (hora do sistema)
      "valor_fechamento": valor_total_caixa,        // novo valor
      "status": "fechado"                           // atualiza, antes era aberto
    }}
);

print("Fechamento do caixa: \n");
print("Faturamento em Vendas: R$" + faturamento_vendas);
print("Valor de fechamento: R$" + valor_total_caixa);

if (faturamento_vendas > 1500.00) {
    print("Um dia mais longe da falência")}


/* Caso 3: Promoção do gerente caso o bar bata a meta de faturamento do dia
      Operações:  updateMany, gte, add, cond, set                          */

var meta_faturamento = 200.00;
var qnt_gerentes = db.funcionario.countDocuments({"cargo":"gerente"});

db.funcionario.updateMany(
  { "cargo": "gerente" },                  
  [ {$set: {
        "salario": {                                                 // atualiza o salario dos gerentes
          $cond: {
            if: { $gte: [ faturamento_vendas, meta_faturamento ] },  // se bateu a meta (>=)
            then: { $add: [ "$salario", 500.00 ] },                  // o salário aumenta em 500.00
            else: "$salario" }                                       // senão, continua
        }}
    }]
);

if (faturamento_vendas >= meta_faturamento) {
    if (qnt_gerentes == 1) { print("Meta do dia batida! O gerente merece um aumento!"); }
    else if (qnt_gerentes > 1) { print("Meta do dia batida! Os gerentes merecem um aumento")}; }
else { print("O movimento do dia foi fraco, a meta não foi batida"); }


/* Caso 4: Faz o ranking dos 3 produtos mais caros
        Operações: find, sort, limit, pretty          */

print("Trio mais caro do momento:\n")
db.produto.find(
    {},{"Nome do produto": "$nome_prod", "Preço": "$preco", "_id": 0}
    ).sort({"preco": -1}).limit(3).pretty();

// Código redundante, mas não é possível usar pretty() e salvar ao mesmo tempo
// Esta parte vai ser usada no próximo caso
var produtos_combo = db.produto.find(
    {},{"nome_prod": 1, "_id":0}
    ).sort({"preco": -1}).limit(3).toArray();


/* Caso 5: Os 3 produtos mais caros constituem um combo, caso uma mesa peça esse combo, ganha um desconto
        Operações: text, search, all, function                                                                         */

// Índice obrigatório para uso do text
db.produto.createIndex({ "nome_prod": "text" });

// Declaração de variáveis para buscar pelo combo, fazendo uma string grande com todos os elementos
var termo1 = produtos_combo[0].nome_prod.split(" ")[0];
var termo2 = produtos_combo[1].nome_prod.split(" ")[0];
var termo3 = produtos_combo[2].nome_prod.split(" ")[0];
var string_busca_textual = termo1 + " " + termo2 + " " + termo3;

// Aqui os produtos são retornados mesmo com erros de grafia ou incompletos (só o primeiro nome)
var validacao_produtos = db.produto.find({
  $text: { $search: string_busca_textual }
}).toArray();

var filtro_1 = new RegExp(termo1, "i");
var filtro_2 = new RegExp(termo2, "i");
var filtro_3 = new RegExp(termo3, "i");

// Essa parte é usada 2 vezes, então tratar o filtro como uma variável é mais prático
var filtro_combo = { 
  "status": "ocupada",
  "itens.nome_prod": { "$all": [ filtro_1, filtro_2, filtro_3 ] }
};

var mesas_sortudas = db.comanda.find(filtro_combo, { "numero_mesa": 1, "_id": 0 }).toArray();
// Aplicação do desconto
var resultado_desconto = db.comanda.updateMany(filtro_combo, { $inc: { "total_parcial": -8.00 } });

// Print das mesas 
if ( mesas_sortudas.length > 0) {
    print("Mesas sortudas da noite:");
    mesas_sortudas.forEach(
        function(comanda) {
        print("Mesa Número: " + comanda.numero_mesa); }
        ); }
else { print("Nenhuma mesa foi agraciada hoje..."); }

/* Caso 6: Renomeação da coleção vendas
   Operações: renameCollection */

// Todas as coleções têm nome no singular, exceto vendas -> ajustando isso antes do próximo caso
db.vendas.renameCollection("venda");

/* Caso 7: Gastou e deu CPF na nota? Consulta qual venda teve maior valor total e deixou cpf na nota
   Operações: existis, max, match, group */

var registro_maior_valor = db.venda.aggregate([
  { $match: { "cpf_venda": { $exists: true, $ne: "" }} },
  { $group: {
    "_id": null, 
    "maior_valor_encontrado": { $max: "$total_pago" }}          // pega o maior valor das vendas com cpf na nota
  } ]).toArray();

if (registro_maior_valor.length > 0) {
    var resultado = registro_maior_valor[0];
    print("Valor da comanda com CPF na nota que mais gastou: R$ " + resultado.maior_valor_encontrado); } 
    else {print("Não tivemos nenhuma comanda com CPF na nota hoje..."); }

/* Caso 8:Gasto médio por pessoa com produtos e as porções solicitadas em cada mesa
    Operações: match, gt, lookup, project, divide                                   */

var relatorio_porcoes_cozinha = db.comanda.aggregate([
  { $match: { 
      "status": "ocupada",                              // mesa ocupada
      $expr: { $gt: [ "$quantidade_pessoas", 0 ] }}     // há cliente na mesa
  },
  { $lookup: {                                          // como se fosse união de coleções
      from: "produto",                  
      localField: "itens.id_prod",   
      foreignField: "id_prod",                          // parece com acesso por chave primária
      as: "detalhes_dos_produtos" }
},
  { $project: {                                         // como se fosse a view
      "_id": 0,
      "numero_mesa": 1,
      "total_parcial": 1,
      "media_gasto_por_pessoa": { $divide: [ "$total_parcial", "$quantidade_pessoas" ] },
    }}
]).toArray();

print("Painel de porções da cozinha:");
printjson(relatorio_porcoes_cozinha);

/* Caso 9: Criação de relatório por categoria do produto e preço
   Operações: mapreduce                                          */
// Ao rodar o código, aparece um aviso de que a operação está depreciada, mas funciona

var funcaoMap = function() {
   this.itens_vendidos.forEach(function(item) {
       emit(item.categoria, item.preco_pago); });
};
var funcaoReduce = function(categoria, precos) {
   return Array.sum(precos); 
};

db.vendas.mapReduce(funcaoMap, funcaoReduce, { out: "relatorio_impostos_final" });

/* Caso 10: Os gastronômicos
   É uma operação que encontra mesas que pediram uma grande diversidade de produtos
   Operação: size                                                                   */

db.comanda.find({ 
  "status": "ocupada", 
  "itens": { $size: 3 }},         // as mesas que pediram 3 produtos diferentes aparecem aqui
  { "_id": 0, 
    "Número da mesa": "$numero_mesa", 
    "Nome do produto": "$itens.nome_prod"}
);

/* Caso 11: Garçom destaque! 
   Operações: find, where, function, findOne, addToSet, exists, updateOne (save)    */

db.comanda.find(
  { $where: function() {
    // filtra por mesas que gastaram considereavelmente no bar
    return this.status === "ocupada" && (this.total_parcial / this.quantidade_pessoas) > 30.00; }}
).forEach(function(mesa_gourmet) {
    // marca como destaque o garçom que atendeu a mesa
    var dados_garcom = db.funcionario.findOne({ "id_func": mesa_gourmet.id_garcom });
    var nome_atendente = dados_garcom ? dados_garcom.nome_func : mesa_gourmet.id_garcom;    

    db.funcionario.updateOne(
    { "id_func": mesa_gourmet.id_garcom },
    { $addToSet: { "comandas_destaque": mesa_gourmet.id_co } }
  );
  
  print("O garçom " + nome_atendente + " está com tudo e recebeu destaque pela mesa " + mesa_gourmet.numero_mesa + "!");
});

db.funcionario.find(
    { "comandas_destaque.0": { $exists: true }},
    {"_id": 0, 
    "Nome do funcionário": "$nome_func",
    "Comandas destaque": "$comandas_destaque"});

/* Caso 12: Analisa a produtividade média do garçom (média das vendas) 
   Operações: AVG, lookup, group, function, agreggate, project         */

// Dando um update para gerar conexão entre vendas e comandas
// Atualiza as vendas para linkar com as comandas do seu povoamento
db.venda.updateOne({ "id_venda": "venda_001" }, { $set: { "id_comanda_origem": "com_mesa_04" } });
db.venda.updateOne({ "id_venda": "venda_002" }, { $set: { "id_comanda_origem": "com_mesa_12" } });
db.venda.updateOne({ "id_venda": "venda_005" }, { $set: { "id_comanda_origem": "com_mesa_23" } });

// Análise do caso
db.venda.aggregate([
  { $lookup: {
      from: "comanda",
      localField: "id_comanda_origem",
      foreignField: "id_co",
      as: "comanda_info" }
  },
  { $unwind: "$comanda_info" },
  { $group: {
      "_id": "$comanda_info.id_garcom",
      "media_venda_garcom": { $avg: "$total_pago" }} 
  },
  { $lookup: {
      from: "funcionario",
      localField: "_id",
      foreignField: "id_func",
      as: "funcionario_info" }
  },
  { $project: {
      "_id": 0,
      "nome_garcom": { $arrayElemAt: ["$funcionario_info.nome_func", 0] },
      "media_venda_garcom": 1}
  }]).forEach(function(resultado) {
    var nome = resultado.nome_garcom ? resultado.nome_garcom : "Garçom Não Encontrado";
    print("Garçom: " + nome + " | Média de Vendas: R$ " + resultado.media_venda_garcom);
});