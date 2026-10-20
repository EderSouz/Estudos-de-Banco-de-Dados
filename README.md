# BD Protótipo — Explorador do banco

Site estático educativo feito com HTML, CSS e JavaScript, com base no arquivo `bd_prototipo.sql`.

## Arquivos
- `index.html`: página principal.
- `style.css`: layout responsivo e estilos.
- `script.js`: catálogo de tabelas/campos, busca, filtros, relacionamentos e exportação CSV.

## Executar localmente
Abra `index.html` no navegador. Não precisa de servidor nem de banco de dados para consultar a documentação.

## Publicar para outras pessoas acessarem
O projeto é estático e pode ser hospedado publicamente em um serviço como GitHub Pages ou Netlify:
1. Extraia os arquivos do ZIP.
2. Envie `index.html`, `style.css` e `script.js` para um repositório público (ou faça upload da pasta no serviço de hospedagem).
3. Ative a publicação do site e compartilhe a URL gerada.

A criação destes arquivos não publica automaticamente o site na internet. É necessário concluir a hospedagem para obter um endereço público.

## Limites e segurança
- Este site documenta a estrutura do SQL; não faz conexão com o MySQL nem mostra registros em tempo real.
- Não coloque credenciais do banco, senhas, tokens ou dados pessoais no JavaScript público.
- O SQL fornecido inclui um registro de administrador com hash de senha. Esse dado não foi copiado para o site.
- A documentação corresponde ao dump fornecido. A tabela `categorias` não aparece nesse arquivo.
