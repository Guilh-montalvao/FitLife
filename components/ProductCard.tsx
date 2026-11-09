import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { ProductImage } from './ProductImage';
import { AddToBag } from './StoreProvider';
export function ProductCard({ product }: { product: Product; index?: number }) { return <article className="product-card"><Link className={`product-visual ${product.image ? 'has-photo' : ''}`} href={`/loja/${product.slug}/`}><span className="product-category">{product.category}</span><ProductImage product={product}/><span className="product-view">Conhecer produto</span></Link><div className="product-card-meta"><Link href={`/loja/${product.slug}/`}><span className="eyebrow">{product.brand}</span><h3>{product.name}</h3></Link><div className="product-card-bottom"><span>Consulte o valor</span><AddToBag product={product} compact/></div></div></article>; }
