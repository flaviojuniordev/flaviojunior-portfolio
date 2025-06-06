# Projeto de Portfólio Inspirado em Sistema Operacional

Este projeto é um website de portfólio criativo inspirado na interface de um Sistema Operacional, proporcionando uma maneira única e interativa de mostrar habilidades, projetos e informações. O website simula o ambiente de desktop de um sistema operacional com componentes funcionais como barra de tarefas, menu inicial e sistema de gerenciamento de janelas.

## Funcionalidades

- **Interface de Sistema Operacional**: Recriação autêntica da experiência de desktop de um sistema operacional
- **Desktop Interativo**: Desktop funcional com ícones clicáveis e janelas
- **Gerenciamento de Janelas**: Abrir, fechar, minimizar e redimensionar janelas
- **Menu Inicial**: Menu inicial interativo com atalhos para aplicativos
- **Barra de Tarefas**: Barra de tarefas dinâmica mostrando aplicativos abertos
- **Central de Notificações**: Notificações do sistema e configurações rápidas
- **Design Responsivo**: Adapta-se tanto para dispositivos desktop quanto para dispositivos móveis usando um layout responsivo
- **Modo Claro/Escuro**: Alternância de tema suportando modos claro e escuro

## Stack Técnica

- **Framework**: Next.js
- **Biblioteca UI**: React
- **Estilização**: Tailwind CSS
- **Biblioteca de Componentes**: Componentes UI personalizados baseados em [shadcn/ui](https://ui.shadcn.com)
- **Gráficos**: Recharts para visualização de dados
- **Animações**: Transições suaves para operações de janelas e elementos da interface
- **TypeScript**: Código seguro em termos de tipagem em todo o projeto

## Estrutura do Projeto

- `app`: Diretório app do Next.js contendo layout principal e páginas
- `components`: Componentes React incluindo:
  - Ambiente de desktop
  - Gerenciador de janelas
  - Barra de tarefas
  - Menu inicial
  - Tela de login
  - Central de notificações
  - Componentes UI (botões, toasts, gráficos, etc.)
- `hooks`: Hooks React personalizados para funcionalidades como:
  - Detecção de dispositivos móveis
  - Notificações toast
- `lib`: Funções utilitárias e código compartilhado
- `public`: Ativos estáticos como imagens e ícones
- `styles`: Estilização adicional não coberta pelo Tailwind

## Comportamento Responsivo

O projeto detecta dispositivos móveis usando hooks personalizados e ajusta a UI adequadamente:

```tsx
// Breakpoint para dispositivos móveis definido em 768px
const MOBILE_BREAKPOINT = 768
```

## Sistema de Notificações

O projeto inclui um sistema de notificação toast personalizado inspirado no react-hot-toast, permitindo notificações semelhantes às do sistema:

```tsx
// Exemplo de uso
toast({
  title: "Título da Notificação",
  description: "Esta é uma mensagem de notificação",
})
```

## Visualização de Dados

O projeto inclui componentes de gráficos baseados no Recharts com opções de personalização para temas, cores e interatividade:

```tsx
<ChartContainer config={config}>
  {/* Componentes de gráfico */}
</ChartContainer>
```

Este portfólio inspirado em sistema operacional é uma maneira criativa de mostrar habilidades de desenvolvimento enquanto proporciona aos visitantes uma interface familiar e interativa para explorar seu trabalho.

## Demonstração

Você pode visualizar o projeto em funcionamento aqui: [https://flaviojunior-portfolio.vercel.app/](https://flaviojunior-portfolio.vercel.app/)