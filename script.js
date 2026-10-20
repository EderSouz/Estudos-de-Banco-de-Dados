const tables = [
 {name:"alunos",group:"biblioteca",description:"Cadastro e identificação dos alunos da biblioteca.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador único do aluno."],
  ["registro_matricula","CHAR(6)","NOT NULL, UNIQUE","Matrícula com seis caracteres; não pode se repetir."],
  ["aluno","VARCHAR(100)","NOT NULL","Nome do aluno."],
  ["telefone","VARCHAR(20)","NULL permitido","Telefone do aluno."],
  ["email","VARCHAR(200)","NULL permitido","E-mail do aluno."],
  ["formacao_tecnica","VARCHAR(50)","NOT NULL","Formação técnica."],
  ["grau_ensino","SET('1','2','3')","NOT NULL","Aceita um ou mais valores do conjunto 1, 2 e 3."],
  ["ativo","TINYINT(1)","NOT NULL, DEFAULT 1","Indicador de situação; o significado depende da aplicação."]
 ]},
 {name:"emprestimos",group:"biblioteca",description:"Controle de retirada, prazo e devolução de livros.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador do empréstimo."],
  ["id_aluno","BIGINT UNSIGNED","FK, NOT NULL","Referência a alunos.id."],
  ["id_livro","BIGINT UNSIGNED","FK, NOT NULL","Referência a livros.id."],
  ["id_usuario","BIGINT UNSIGNED","FK, NULL permitido","Referência a usuarios.id; pode não ser informado."],
  ["data_emprestimo","DATE","NOT NULL","Data da retirada."],
  ["data_limite","DATE","NOT NULL","Data prevista para devolução."],
  ["data_devolucao","DATE","NULL permitido","Data efetiva da devolução, se registrada."],
  ["status","TINYINT(1)","NOT NULL, DEFAULT 1","Código de situação do empréstimo."]
 ]},
 {name:"itens_venda",group:"vendas",description:"Itens e quantidades vinculados a vendas.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, UNIQUE, NOT NULL","Identificador do item."],
  ["venda_id","INT","NOT NULL, INDEX","Identificador da venda; não há FK declarada no arquivo."],
  ["produto_id","INT","NOT NULL, INDEX","Identificador do produto; não há FK declarada no arquivo."],
  ["quantidade","INT","NOT NULL","Quantidade de unidades."]
 ]},
 {name:"livros",group:"biblioteca",description:"Cadastro e localização física dos livros.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador único do livro."],
  ["livro","VARCHAR(100)","NOT NULL","Título ou nome do livro."],
  ["autor","VARCHAR(100)","NOT NULL","Autor armazenado como texto."],
  ["corredor","INT","NOT NULL","Número do corredor."],
  ["coluna","INT","NOT NULL","Número da coluna."],
  ["nivel","INT","NOT NULL","Nível ou prateleira."],
  ["ativo","TINYINT(1)","NOT NULL, DEFAULT 1","Indicador de situação do livro."]
 ]},
 {name:"modelos_notificacao",group:"biblioteca",description:"Modelos reutilizáveis de mensagens.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador do modelo."],
  ["nome","VARCHAR(100)","NOT NULL, UNIQUE","Nome do modelo sem duplicatas."],
  ["tipo","VARCHAR(50)","NOT NULL, INDEX","Classificação do modelo."],
  ["assunto","VARCHAR(200)","NULL permitido","Assunto opcional."],
  ["mensagem","TEXT","NOT NULL","Conteúdo do modelo."],
  ["ativo","TINYINT(1)","NOT NULL, DEFAULT 1","Indicador de modelo ativo."]
 ]},
 {name:"notificacoes",group:"biblioteca",description:"Histórico de notificações registradas para alunos.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador da notificação."],
  ["id_aluno","BIGINT UNSIGNED","FK, NOT NULL, INDEX","Referência a alunos.id."],
  ["id_emprestimo","BIGINT UNSIGNED","FK, NULL permitido, INDEX","Referência a emprestimos.id."],
  ["id_modelo","BIGINT UNSIGNED","FK, NULL permitido, INDEX","Referência a modelos_notificacao.id."],
  ["tipo","VARCHAR(50)","NOT NULL, INDEX","Tipo da notificação."],
  ["canal","VARCHAR(20)","NOT NULL","Canal utilizado, conforme a aplicação."],
  ["conteudo_enviado","TEXT","NOT NULL","Conteúdo registrado como enviado."],
  ["data_criacao","DATETIME","NOT NULL, DEFAULT CURRENT_TIMESTAMP","Data e hora de criação."],
  ["data_envio","DATETIME","NULL permitido","Data e hora do envio, quando registrada."],
  ["status","TINYINT UNSIGNED","NOT NULL, DEFAULT 1, INDEX","Código de situação da notificação."]
 ]},
 {name:"renovacoes",group:"biblioteca",description:"Solicitações e análise de renovação de empréstimos.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador da renovação."],
  ["id_emprestimo","BIGINT UNSIGNED","FK, NOT NULL, INDEX","Referência a emprestimos.id."],
  ["id_usuario","BIGINT UNSIGNED","FK, NULL permitido, INDEX","Referência a usuarios.id."],
  ["data_solicitacao","DATETIME","NOT NULL, DEFAULT CURRENT_TIMESTAMP","Data e hora da solicitação."],
  ["data_analise","DATETIME","NULL permitido","Data e hora da análise."],
  ["status","TINYINT UNSIGNED","NOT NULL, DEFAULT 1, INDEX","Código de situação da renovação."],
  ["observacao","TEXT","NULL permitido","Observações sobre a solicitação."]
 ]},
 {name:"reservas",group:"biblioteca",description:"Fila e estado das reservas de livros.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador da reserva."],
  ["id_aluno","BIGINT UNSIGNED","FK, NOT NULL, INDEX","Referência a alunos.id."],
  ["id_livro","BIGINT UNSIGNED","FK, NOT NULL, INDEX","Referência a livros.id."],
  ["data_reserva","DATETIME","NOT NULL, DEFAULT CURRENT_TIMESTAMP","Data e hora da reserva."],
  ["status","TINYINT UNSIGNED","NOT NULL, DEFAULT 1, INDEX","Código de situação da reserva."],
  ["data_atendimento","DATETIME","NULL permitido","Data e hora do atendimento."],
  ["data_cancelamento","DATETIME","NULL permitido","Data e hora do cancelamento."]
 ]},
 {name:"usuarios",group:"biblioteca",description:"Contas de funcionários e administradores.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, NOT NULL","Identificador do usuário."],
  ["email","VARCHAR(200)","NOT NULL, UNIQUE","E-mail único para a conta."],
  ["senha","VARCHAR(255)","NOT NULL","Campo para senha ou hash; o dump contém um hash."],
  ["is_admin","TINYINT(1)","NOT NULL, DEFAULT 0","Indicador de privilégio administrativo."],
  ["turno","CHAR(5)","NOT NULL","Texto de tamanho fixo de cinco caracteres."],
  ["horario_inicio","TIME","NOT NULL","Horário de início do expediente."],
  ["horario_final","TIME","NOT NULL","Horário de encerramento do expediente."],
  ["ativo","TINYINT(1)","NOT NULL, DEFAULT 1","Indicador de situação da conta."]
 ]},
 {name:"vendas",group:"vendas",description:"Registro de vendas; usa a engine MyISAM no arquivo.",fields:[
  ["id","BIGINT UNSIGNED","PK, AI, UNIQUE, NOT NULL","Identificador da venda."],
  ["cliente_id","INT","NOT NULL, INDEX","Identificador do cliente; sem FK declarada no arquivo."],
  ["data_venda","TIMESTAMP","NOT NULL, DEFAULT CURRENT_TIMESTAMP","Data e hora padrão da venda."]
 ]}
];

const relations = [
 ["alunos","id","emprestimos","id_aluno"],
 ["livros","id","emprestimos","id_livro"],
 ["usuarios","id","emprestimos","id_usuario"],
 ["alunos","id","notificacoes","id_aluno"],
 ["emprestimos","id","notificacoes","id_emprestimo"],
 ["modelos_notificacao","id","notificacoes","id_modelo"],
 ["emprestimos","id","renovacoes","id_emprestimo"],
 ["usuarios","id","renovacoes","id_usuario"],
 ["alunos","id","reservas","id_aluno"],
 ["livros","id","reservas","id_livro"]
];

const $ = s => document.querySelector(s);
const tableList = $("#tableList"), detail = $("#tableDetail");
let selectedTable = "alunos";

function escapeHtml(value) {
 return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function filteredTables() {
 const q = $("#searchInput").value.trim().toLowerCase();
 const group = $("#categoryFilter").value;
 return tables.filter(t => (group === "all" || t.group === group) &&
  (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) ||
   t.fields.some(f => f.join(" ").toLowerCase().includes(q))));
}
function renderList() {
 const list = filteredTables();
 if (!list.some(t => t.name === selectedTable)) selectedTable = list[0]?.name || "";
 tableList.innerHTML = list.length ? list.map(t => `
  <button class="table-option ${t.name===selectedTable?"active":""}" type="button" data-table="${escapeHtml(t.name)}" aria-pressed="${t.name===selectedTable}">
   <span class="table-symbol">▤</span><span><strong>${escapeHtml(t.name)}</strong><small>${t.group==="biblioteca"?"Biblioteca":"Vendas"}</small></span><span class="count">${t.fields.length}</span>
  </button>`).join("") : `<div class="no-results">Nenhuma tabela encontrada.</div>`;
 tableList.querySelectorAll("[data-table]").forEach(btn => btn.addEventListener("click", () => {selectedTable=btn.dataset.table;renderList();renderDetail();}));
 renderDetail();
}
function fieldFlags(flags) {
 return flags.split(", ").map(flag => {
  const cls = flag.startsWith("PK") ? "pk" : flag.startsWith("FK") ? "fk" : flag.includes("NULL") ? "warn" : "";
  return `<span class="flag ${cls}">${escapeHtml(flag)}</span>`;
 }).join("");
}
function renderDetail() {
 const t = tables.find(x=>x.name===selectedTable);
 if (!t) {detail.innerHTML='<div class="empty-state"><div class="database-icon">⌕</div><h3>Nenhuma tabela encontrada</h3><p>Altere a busca ou o filtro para ver resultados.</p></div>';return;}
 const q = $("#searchInput").value.trim().toLowerCase();
 const fields = t.fields.filter(f=>!q || f.join(" ").toLowerCase().includes(q) || t.name.toLowerCase().includes(q));
 detail.innerHTML = `<div class="detail-head"><div><h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.description)}</p></div><span class="pill">${t.fields.length} campos</span></div>
 <div class="table-wrap"><table><thead><tr><th>Campo</th><th>Tipo de dado</th><th>Características</th><th>Descrição</th></tr></thead><tbody>
 ${fields.map(f=>`<tr><td><code>${escapeHtml(f[0])}</code></td><td><span class="type-tag">${escapeHtml(f[1])}</span></td><td><div class="flags">${fieldFlags(f[2])}</div></td><td>${escapeHtml(f[3])}</td></tr>`).join("")}
 </tbody></table>${fields.length?"":'<div class="no-results">Nenhum campo corresponde à busca.</div>'}</div>`;
}
function renderRelations() {
 $("#relationList").innerHTML = relations.map(r=>`<article class="relation-card"><div class="relation-node"><strong>${escapeHtml(r[0])}</strong><small>PK · ${escapeHtml(r[1])}</small></div><span class="relation-arrow" aria-label="referencia">→</span><div class="relation-node"><strong>${escapeHtml(r[2])}</strong><small>FK · ${escapeHtml(r[3])}</small></div></article>`).join("");
}
function updateStats() {
 const fields = tables.reduce((n,t)=>n+t.fields.length,0);
 $("#tableCount").textContent = tables.length;
 $("#fieldCount").textContent = fields;
 $("#metricTables").textContent = tables.length;
 $("#metricFields").textContent = fields;
 $("#metricRelations").textContent = relations.length;
}
function downloadCsv() {
 const rows = [["tabela","grupo","campo","tipo","caracteristicas","descricao"]];
 tables.forEach(t=>t.fields.forEach(f=>rows.push([t.name,t.group,...f])));
 const csv = "\uFEFF" + rows.map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\r\n");
 const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
 const url = URL.createObjectURL(blob), a = document.createElement("a");
 a.href=url; a.download="bd_prototipo_campos.csv"; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
$("#searchInput").addEventListener("input",renderList);
$("#categoryFilter").addEventListener("change",renderList);
$("#downloadCsv").addEventListener("click",downloadCsv);
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchInput").focus();}});
updateStats();renderRelations();renderList();
