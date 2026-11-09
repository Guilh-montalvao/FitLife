# Site FitLife — como usar

Este pacote inclui o código-fonte completo, as imagens, as fontes e a versão estática pronta na pasta `out`.

## Rodar e editar no computador

1. Instale o Node.js 22 ou superior.
2. Extraia o ZIP e abra o terminal na pasta `fitlife`.
3. Execute:

```sh
npm ci
npm run dev
```

4. Abra http://localhost:3000 no navegador.

## Gerar a versão para hospedagem

```sh
npm run build
```

O resultado fica em `out/`. Você também pode usar a pasta `out` já incluída no ZIP em uma hospedagem de sites estáticos. Sirva essa pasta por HTTP; abrir `index.html` diretamente pelo explorador de arquivos não equivale a uma hospedagem.

## Onde editar

- `app/`: páginas e estilos.
- `components/`: navegação, catálogo e sacola.
- `lib/catalog.ts`: produtos e contatos oficiais.
- `public/images/`: imagens otimizadas usadas pelo site.
- `assets/source/`: arquivos de imagem de referência, incluindo as dez imagens geradas.
- `README.md`: informações de conteúdo e funcionamento.

A loja permite consultar produtos e preparar uma mensagem de pedido. Preços, estoque, pagamento e entrega são confirmados no atendimento; não há checkout de pagamento integrado nesta versão.

A publicação privada no ChatGPT é uma configuração da hospedagem. Este código exportado não exige login no ChatGPT para rodar em outra hospedagem.
