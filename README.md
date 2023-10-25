# WeScore-API - Documentação de Requisitos
Este documento descreve os objetivos e funcionalidades do projeto WeScore-API, uma API para controle de jogos de vôlei.

## Estrutura do documento
O documento de requisitos será dividido nos seguintes tópicos:

* **Objetivos:** Este tópico descreve os objetivos do projeto.
* **Coleta de requisitos:** Este tópico descreve a metodologia de coleta de requisitos.
* **Funcionalidades:** Este tópico descreve as funcionalidades da API através de uma breve descrição de cada funcionalidade.
* **Requisitos:** Este tópico descreve os requisitos com Entradas, Saídas, Restrições e Status de cada funcionalidade.
* **Atualizações:** Este tópico descreve a frequência que o documento será atualizado.
* **Público-alvo:** Este tópico descreve o público-alvo do documento de requisitos.

## Objetivos
O objetivo do projeto WeScore-API é fornecer uma API que permita controlar jogos de vôlei. A API deve ser fácil de ser consumida e deve fornecer uma variedade de funcionalidades para atender às necessidades do projeto.

## Metodologia de coleta de requisitos
Os requisitos do projeto WeScore foram coletados através de uma combinação de entrevistas com usuários, pesquisas e análise de dados.

## Funcionalidades
A API WeScore deve fornecer as seguintes funcionalidades:

* **Registro de usuários:** Os usuários devem poder se registrar na API fornecendo um nome, E-mail e senha.
* **Login de usuários:** Os usuários devem poder fazer login na API usando o E-mail e a senha fornecidos.
* **Criação de partidas:** Os usuários devem poder criar partidas fornecendo informações sobre os times e jogadores participantes.
* **Controle de pontos:** Os usuários devem poder controlar os pontos da partida, incluindo pontos marcados, saques vencedores, bloqueios, recepções e erros.
* **Consulta de estatísticas:** Os usuários devem poder consultar estatísticas de partidas, incluindo pontos marcados por cada jogador, saques vencedores por cada jogador, bloqueios por cada jogador, recepções por cada jogador e erros por cada jogador.
Restrições.

## Requisitos de cada funcionalidade
### Time
#### Registro de Time
* **Entradas:** Nome, logo e ID do Usuario criador do Time.
* **Saídas:** Status da operação, Objeto criado.
* **Restrições:** O nome deve ser único. ID de usuário deve ser existente, logo deve ser inserida no source.
* **Status:** Implementado.
#### Retorno todos os Time
* **Entradas:** Nenhuma.
* **Saídas:** JSON com todos os times cadastrado no DB.
* **Restrições:** Sem autenticação via token, retornar todos os atributos dos times.
* **Status:** Implementado.
#### Retorno de Time por ID
* **Entradas:** ID do time por parâmetro.
* **Saídas:** JSON com todos os times cadastrado no DB.
* **Restrições:** Autenticação via token, retornar todos os atributos dos times.
* **Status:** Implementado.
#### Retorno jogadores dos Times
* **Entradas:** Nenhuma.
* **Saídas:** JSON com todos os times e seus jogadores cadastrado no DB.
* **Restrições:** Autenticação via token, retornar todos os atributos dos times e de seus jogadores.
* **Status:** Implementado.
### Retorno jogadores dos Times por ID
* **Entradas:** ID do time por parâmetro.
* **Saídas:** JSON com todos os times e seus jogadores cadastrado no DB.
* **Restrições:** Autenticação via token, retornar todos os atributos dos times e de seus jogadores.
* **Status:** Implementado.
#### Atualização de Time
* **Entradas:** ID do time por parâmetro, Nome, logo e ID do Usuario criador do Time.
* **Saídas:** Status da operação, Objeto atualizado.
* **Restrições:** Autenticação via token, time deve estar cadastrado no DB, nome deve ser único. ID de usuário deve ser existente, logo deve ser removida do source.
* **Status:** Implementado.
### Remoção de Time
* **Entradas:** ID do time por parâmetro.
* **Saídas:** Status da operação.
* **Restrições:** Autenticação via token,Time deve estar cadastrado no DB.
* **Status:** Implementado.

### Jogador
#### Registro de Jogador
* **Entradas:** Nome, sobrenome, cpf, telefone, numero da camiseta, ID do time.
* **Saídas:** Status da operação, Objeto atualizado.
* **Restrições:** O CPF deve ser único. ID de usuário deve ser existente.
* **Status:** Implementado.
#### Retorno todos os Jogador
* **Entradas:** Nenhuma.
* **Saídas:** JSON com todos os jogador cadastrado no DB.
* **Restrições:** Autenticação via token, retornar todos os atributos dos jogador.
* **Status:** Implementado.
#### Atualização de Jogador
* **Entradas:** ID do Jogador por parâmetro, Nome, sobrenome, cpf, telefone, numero da camiseta, ID do time.
* **Saídas:** Status da operação, Objeto atualizado.
* **Restrições:** Autenticação via token, Jogador deve estar cadastrado no DB, CPF deve ser único.
* **Status:** Implementado.
### Remoção de Time
* **Entradas:** ID do Jogador por parâmetro.
* **Saídas:** Status da operação.
* **Restrições:** Autenticação via token, Jogador deve estar cadastrado no DB.
* **Status:** Implementado.

### Usuário
#### Registro de Usuários
* **Entradas:** Nome, E-mail, senha e logo.
* **Saídas:** Status da operação, Objeto criado.
* **Restrições:** Autenticação via token, O E-mail deve ser único.
* **Status:** Implementado.
#### Token de Usuários
**Entradas:** E-mail e senha.
**Saídas:** Status da operação, token de autenticação, E-mail.
**Restrições:** O E-mail deve existir. A senha deve ser correta.
* **Status:** Implementado.
#### Retorno de todos os Usuários
* **Entradas:** Nenhuma..
* **Saídas:** JSON com todos os Usuários cadastrado no DB.
* **Restrições:** Autenticação via token, senha não deve retornar, retornar os atributos dos Usuários.
* **Status:** Implementado.
#### Retorno de Usuários por ID
* **Entradas:** ID do Usuários por parâmetro.
* **Saídas:** JSON com todos os Usuários cadastrado no DB.
* **Restrições:** Autenticação via token, senha não deve retornar, retornar os atributos dos Usuários.
* **Status:** Implementado.
### Retorno Usuários por nome
* **Entradas:** Nome do Usuários por parâmetro.
* **Saídas:** JSON com todos os Usuários que posuem o nome cadastrado no DB.
* **Restrições:** Autenticação via token, senha não deve retornar, retornar os atributos dos Usuários.
* **Status:** Implementado.
#### Atualização de Usuários
* **Entradas:** Nome, E-mail, senha e logo.
* **Saídas:** Status da operação, Objeto atualizado.
* **Restrições:** Autenticação via token, O E-mail deve ser único, Usuários deve estar cadastrado no DB.
* **Status:** Implementado.
### Remoção de Usuários
* **Entradas:** ID do Usuários por parâmetro.
* **Saídas:** Status da operação.
* **Restrições:** Autenticação via token, Usuários deve estar cadastrado no DB.
* **Status:** Implementado.

### Campeonato


#### Criação de partidas
**Entradas:** Nome da partida, data e hora da partida, nomes dos times e jogadores participantes.
**Saídas:** Um ID da partida.
**Restrições:** Partida deve ser única. partida deve ter dois times.
* **Status:** Implementado.
#### Controle de pontos
**Entradas:** ID da partida, time, jogador e pontuação.
**Saídas:** Nenhuma.
**Restrições:** A pontuação deve ser um número inteiro.
#### Consulta de estatísticas
**Entradas:** ID da partida.
**Saídas:** Estatísticas da partida.
**Restrições:** A partida deve existir.
## Atualizações
Este documento será atualizado sempre que houver alterações no projeto ou houver necessidade.
## Público-alvo
O público-alvo do documento de requisitos é a equipe de desenvolvimento do projeto WeScore.