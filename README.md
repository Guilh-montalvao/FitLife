# FitLife

Site em Next.js, TypeScript, React e Tailwind CSS. GSAP controla as revelações e o movimento de imagens no scroll; Motion anima interações da sacola. Fontes e imagens são locais.

## Executar

```sh
npm ci
npm run dev
```

`npm run build` exporta as páginas estáticas em `out/`. `npm run typecheck` valida os tipos. O ZIP inclui a pasta `out/`, pronta para hospedagem estática.

## Conteúdo

- `lib/catalog.ts`: 21 produtos únicos transcritos dos dois prints fornecidos. Gold Whey estava repetido e foi unificado. Preços, disponibilidade, dosagens e quantidades de embalagem não foram presumidos.
- Cinco páginas principais e 21 páginas de produto. Imagens de produto são recortes de exibição, feitos em CSS sobre os prints originais, para manter as embalagens reais.
- Dez imagens produzidas na conversa, exportadas em WebP para navegação. Originais de referência em `assets/source/`. As versões de Victor geradas por IA foram aprovadas para uso na conversa, mas não são retoques fotográficos idênticos às fotos originais.
- Sacola em armazenamento local, com quantidades e campo de observações. O visitante copia seu pedido e abre o Instagram da FitLife para enviá-lo. O site não cobra, envia mensagens automaticamente nem confirma pedidos.
- O e-book é apresentado a partir do material fornecido. A foto de refeição é ilustrativa. A compra e o acesso são consultados pelo contato oficial.

## Dados para a próxima etapa comercial

Cadastrar preços, SKUs, apresentações, sabores, estoque, fotos individuais dos produtos e condições de pagamento e entrega. Acrescentar telefone e checkout oficiais se disponibilizados. Nenhum desses dados foi inventado nesta versão.

O site é publicado como privado. A configuração de metadados evita indexação desta versão.
