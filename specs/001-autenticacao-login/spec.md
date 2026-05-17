# Feature Specification: Autenticação e Login para Entregadores

**Feature Branch**: `001-autenticacao-entregadores`

**Created**: May 17, 2026

**Status**: Draft

**Input**: User description: "Autenticação e Login para entregadores"

## User Scenarios & Testing (mandatory)

### User Story 1 - Login de Entregador (Priority: P1)

Como um entregador do Maré Manguinhos, eu quero fazer login com minhas credenciais (usuário/senha) para acessar minhas entregas, para que eu possa gerenciar minhas tarefas diárias.

**Why this priority**: É a funcionalidade mais crítica, pois sem ela o entregador não consegue acessar nenhuma outra feature do aplicativo.

**Independent Test**: Pode ser testado independentemente com a tentativa de login e verificação do acesso ao dashboard de entregas.

**Acceptance Scenarios**:

1. **Given** que o entregador está na tela de login, **When** ele insere credenciais válidas e clica em "Entrar", **Then** ele é redirecionado para o dashboard de entregas.
2. **Given** que o entregador está na tela de login, **When** ele insere credenciais inválidas e clica em "Entrar", **Then** uma mensagem de erro é exibida informando que as credenciais são inválidas e ele permanece na tela de login.
3. **Given** que o entregador está na tela de login, **When** ele deixa campos obrigatórios em branco e clica em "Entrar", **Then** uma mensagem de validação é exibida para cada campo obrigatório.

---

### User Story 2 - Recuperação de Senha (Priority: P2)

Como um entregador do Maré Manguinhos, eu quero ter a opção de recuperar minha senha caso eu a esqueça, para que eu possa ter acesso novamente ao aplicativo e às minhas entregas.

**Why this priority**: É uma funcionalidade importante para a usabilidade e para evitar bloqueios de acesso, mas pode ser implementada após a funcionalidade de login principal.

**Independent Test**: Pode ser testado independentemente com o fluxo de solicitação de recuperação de senha e verificação do recebimento do e-mail ou SMS (dependendo do método escolhido).

**Acceptance Scenarios**:

1. **Given** que o entregador está na tela de login, **When** ele clica em "Esqueci minha senha", **Then** ele é redirecionado para uma tela de recuperação de senha.
2. **Given** que o entregador está na tela de recuperação de senha, **When** ele insere seu e-mail ou número de telefone cadastrado e clica em "Recuperar Senha", **Then** uma mensagem de sucesso é exibida informando que as instruções foram enviadas e ele é redirecionado para a tela de login.
3. **Given** que o entregador está na tela de recuperação de senha, **When** ele insere um e-mail ou número de telefone não cadastrado e clica em "Recuperar Senha", **Then** uma mensagem de erro é exibida informando que o e-mail/número não foi encontrado.

---

### Edge Cases

- O que acontece quando o serviço de autenticação está indisponível? O app deve informar o usuário e permitir tentar novamente.
- Como o sistema lida com múltiplas tentativas de login inválidas? Deve implementar um mecanismo de bloqueio temporário ou captcha para evitar ataques de força bruta.
- O que acontece se a sessão do entregador expirar? O app deve redirecionar o entregador para a tela de login.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: O sistema DEVE permitir que o entregador se autentique utilizando usuário (e-mail ou CPF) e senha.
- **FR-002**: O sistema DEVE validar as credenciais do entregador com o backend.
- **FR-003**: O sistema DEVE redirecionar o entregador para o dashboard de entregas após login bem-sucedido.
- **FR-004**: O sistema DEVE exibir mensagens de erro claras para credenciais inválidas ou campos obrigatórios não preenchidos.
- **FR-005**: O sistema DEVE permitir que o entregador solicite a recuperação de senha, via SMS.
- **FR-006**: O sistema DEVE exibir uma tela de recuperação de senha com campo para inserção do identificador (e-mail ou CPF) do entregador.
- **FR-007**: O sistema DEVE enviar as instruções de recuperação de senha via SMS após a solicitação bem-sucedida.
- **FR-008**: O sistema DEVE proteger as informações de senha do entregador, utilizando criptografia e práticas seguras de armazenamento.

### Key Entities (include if feature involves data)

- **Entregador**: Representa o usuário do aplicativo, com atributos como ID, usuário (e-mail ou CPF) e senha (hash).
- **Sessão**: Representa o estado de autenticação do entregador, incluindo token de acesso e tempo de expiração.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Entregadores podem realizar o login em menos de 5 segundos em condições de rede normais.
- **SC-002**: A taxa de sucesso de login de entregadores é de 99%.
- **SC-003**: Entregadores podem solicitar a recuperação de senha e receber as instruções em até 2 minutos.
- **SC-004**: A funcionalidade de login deve estar disponível 99.9% do tempo.

## Assumptions

- O backend da aplicação fornecerá uma API RESTful para autenticação de entregadores e recuperação de senha.
- A comunicação entre o front-end e o backend será segura (HTTPS).
- O backend será responsável pelo envio de e-mails/SMS para recuperação de senha.
- O aplicativo terá acesso à internet para realizar as operações de login e recuperação de senha.
- O processo de recuperação de senha pode envolver etapas adicionais (ex: código de verificação) que serão definidas pelo backend.
