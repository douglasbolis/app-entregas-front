# Plano do Projeto

## Tecnologias
- **Frontend:** React com Vite, TypeScript
- **Estilização:** TailwindCSS (com foco mobile-first responsivo)
- **Gerenciamento de Estado:** Zustand
- **Persistência de Dados:** localStorage

## Arquitetura
- Componentes funcionais
- Hooks customizados

## API
- Consumo de API REST externa
- Variável de Ambiente: `API_URL` para a URL do backend
- Isolamento de chamadas de API em `services/api`


## Diretrizes de Qualidade de Código e Melhores Práticas

Todo o código gerado deve seguir as seguintes diretrizes:

1.  **Arquitetura Limpa e Separação de Responsabilidades**: Implementar uma arquitetura limpa, garantindo separação estrita entre UI (componentes visuais), lógica de negócio (hooks customizados, utilitários) e serviços de API (módulos `services/api`).
2.  **Padrões de Design Atuais do React**: Utilizar componentes funcionais e hooks customizados para encapsular lógicas reutilizáveis. Zustand será usado para gerenciamento de estado global.
3.  **Padrões de Nomenclatura Semanticamente Claros**:
    *   **Componentes**: `PascalCase` (ex: `MeuComponente`, `BotaoPrimario`).
    *   **Funções/Variáveis**: `camelCase` (ex: `minhaFuncao`, `valorTotal`).
    *   **Constantes Globais**: `UPPER_CASE` (ex: `API_BASE_URL`).
    *   **Tipagem**: Assinaturas de função e variáveis devem ser fortemente tipadas com TypeScript.
4.  **Documentação Inline Clara**: Funções complexas, hooks customizados e componentes reutilizáveis devem ser documentados usando JSDoc para explicar propósito, parâmetros, retornos e efeitos colaterais.

## Estratégia de Testes Automatizados

O projeto deve seguir a seguinte estratégia de testes automatizados:

1.  **Ferramentas de Teste**: Utilizar Vitest como test runner e React Testing Library para testar componentes React.
2.  **Testes Unitários Abrangentes**: Cada hook customizado, store do Zustand e serviço de API DEVE ter um arquivo de teste unitário correspondente (ex: `meuHook.test.ts`, `minhaStore.test.ts`, `apiService.test.ts`).
3.  **Testes de Componentes de UI**: Os componentes principais da interface do usuário DEVERÃO ter testes de renderização e comportamento para verificar a interação do usuário e a resposta esperada (ex: `expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument(); fireEvent.click(loginButton);`).
4.  **Instalação de Dependências**: As seguintes dependências de teste DEVERÃO ser instaladas antes do início da codificação:
    *   `vitest`
    *   `@testing-library/react`
    *   `@testing-library/jest-dom`
