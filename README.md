# Documentação do Projeto ConectaTrens 🚂

## Visão Geral
O ConectaTrens é um sistema web desenvolvido para facilitar a experiência dos usuários do transporte ferroviário. O projeto possui uma interface intuitiva e responsiva, focada em fornecer informações sobre estações, horários e serviços relacionados ao transporte de trens.

## Estrutura do Projeto

### Páginas Principais

1. **Home (index.html)**
   - Página inicial com apresentação do sistema
   - Seção de ações rápidas
   - FAQ (Perguntas Frequentes)
   - Busca rápida de estações
   - Informações de horários de funcionamento

2. **Estações (estacoes.html)**
   - Mapa das linhas de trem
   - Sistema de busca de estações
   - Filtros por linha e estação

3. **Comprovantes (comprovantes.html)**
   - Sistema para geração de comprovantes de atraso
   - Listagem por linha de trem
   - Status das ocorrências

4. **Contato (contato.html)**
   - Formulário de contato
   - Informações de atendimento

5. **Integrantes (integrantes.html)**
   - Informações sobre a equipe do projeto
   - Links para redes sociais dos desenvolvedores

### Componentes Comuns

#### Header
- Logo da empresa
- Menu de navegação responsivo
- Links rápidos para contato

#### Footer
- Informações de contato
- Links de navegação
- Horários de funcionamento
- Endereço
- Copyright

## Recursos de Acessibilidade

O projeto implementa diversas práticas de acessibilidade:

- Uso apropriado de tags semânticas (`header`, `main`, `footer`, `nav`)
- Atributos ARIA para melhor navegação por leitores de tela
- Labels descritivos para formulários
- Textos alternativos para imagens
- Estrutura hierárquica de cabeçalhos

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 para estilização
- JavaScript para interatividade
- Biblioteca Lucide para ícones
- Fontes do Google Fonts (Inter e Inter Tight)

## Instruções de Uso

### Para Desenvolvedores

1. Clone o repositório
2. Estrutura de arquivos:
   ```
   ├── index.html
   ├── estacoes.html
   ├── comprovantes.html
   ├── contato.html
   ├── integrantes.html
   ├── css/
   │   ├── global.css
   │   ├── header.css
   │   ├── home.css
   │   ├── faq.css
   │   ├── footer.css
   │   ├── estacoes.css
   │   ├── comprovante.css
   │   └── contato.css
   ├── js/
   │   ├── faq.js
   │   └── menu.js
   └── img/
       └── [arquivos de imagem]
   ```

### Para Usuários

1. **Busca de Estações**
   - Use o campo de busca na página inicial ou na seção de estações
   - Selecione a linha desejada no filtro
   - Digite o nome da estação

2. **Geração de Comprovantes**
   - Acesse a página de comprovantes
   - Selecione a linha e estação
   - Baixe o comprovante disponível

3. **Contato**
   - Preencha o formulário de contato
   - Todos os campos marcados com * são obrigatórios

## Funcionalidades Principais

- Busca de estações e linhas
- Sistema de geração de comprovantes
- FAQ interativo
- Formulário de contato
- Informações de horários e funcionamento
- Menu responsivo para dispositivos móveis

## Manutenção

Para adicionar novas funcionalidades ou fazer alterações:

1. Mantenha a estrutura semântica do HTML
2. Siga os padrões de acessibilidade estabelecidos
3. Atualize a documentação quando necessário
4. Teste em diferentes dispositivos e navegadores

## Status do Projeto

O projeto está em desenvolvimento contínuo, com algumas seções marcadas como "Em Desenvolvimento" (como o mapa na página de estações).