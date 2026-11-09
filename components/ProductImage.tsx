import type { CSSProperties } from 'react';
import type { Product } from '@/lib/catalog';
export function ProductImage({ product, large = false }: { product: Product; large?: boolean }) {
 if (product.image) {
  return <div className={`product-photo ${large ? 'is-large' : ''}`}><img src={encodeURI(product.image)} alt={`${product.name} — ${product.brand}, foto do catálogo FitLife`} loading="lazy" decoding="async" /></div>;
 }
 const y = (product.source === 'a' ? 53 : 51) + product.row * 80;
 const style = { '--source-width': product.source === 'a' ? 575 : 564, '--source-y': y } as CSSProperties;
 return <div className={`product-crop ${large ? 'is-large' : ''}`} style={style}><img src={`/images/catalogo-${product.source}.webp`} alt={`${product.name} — ${product.brand}, foto do catálogo FitLife`} loading="lazy" decoding="async" /></div>;
}
