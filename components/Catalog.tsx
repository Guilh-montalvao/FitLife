'use client';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { brands, categories, products } from '@/lib/catalog';
import { ProductCard } from './ProductCard';

function normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }

function CustomSelect({ label, value, options, onChange, icon, compact = false }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; icon?: ReactNode; compact?: boolean }) {
 const [open, setOpen] = useState(false);
 const ref = useRef<HTMLDivElement>(null);
 const selected = options.find(o => o.value === value) ?? options[0];
 useEffect(() => {
  if (!open) return;
  const onPointer = (e: MouseEvent | TouchEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
  document.addEventListener('mousedown', onPointer);
  document.addEventListener('touchstart', onPointer);
  document.addEventListener('keydown', onKey);
  return () => {
   document.removeEventListener('mousedown', onPointer);
   document.removeEventListener('touchstart', onPointer);
   document.removeEventListener('keydown', onKey);
  };
 }, [open]);
 return (
  <div ref={ref} className={`custom-select ${compact ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
   <button type="button" className="custom-select-trigger" aria-label={label} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(v => !v)}>
    {icon}
    <span>{selected.label}</span>
    <ChevronDown size={15} className="custom-select-chevron"/>
   </button>
   {open && (
    <div className="custom-select-menu" role="listbox" aria-label={label}>
     {options.map(opt => {
      const active = opt.value === value;
      return (
       <button key={opt.value} type="button" role="option" aria-selected={active} className={`custom-select-option ${active ? 'is-selected' : ''}`} onClick={() => { onChange(opt.value); setOpen(false); }}>
        <span>{opt.label}</span>
        {active && <Check size={14}/>}
       </button>
      );
     })}
    </div>
   )}
  </div>
 );
}

const brandOptions = [{ value: 'Todas', label: 'Todas as marcas' }, ...brands.map(b => ({ value: b, label: b }))];
const sortOptions = [{ value: 'catalogo', label: 'Nosso catálogo' }, { value: 'nome', label: 'Nome A–Z' }, { value: 'marca', label: 'Marca A–Z' }];

export function Catalog() {
 const [query,setQuery] = useState(''); const [category,setCategory] = useState('Todos'); const [brand,setBrand] = useState('Todas'); const [sort,setSort] = useState('catalogo');
 const filtered = useMemo(() => products.filter(p => (category === 'Todos' || p.category === category) && (brand === 'Todas' || p.brand === brand) && normalize(`${p.name} ${p.brand} ${p.category}`).includes(normalize(query.trim()))).sort((a,b) => sort === 'nome' ? a.name.localeCompare(b.name,'pt-BR') : sort === 'marca' ? a.brand.localeCompare(b.brand,'pt-BR') : 0),[query,category,brand,sort]);
 const clear = () => { setQuery('');setCategory('Todos');setBrand('Todas');setSort('catalogo'); };
 return <section className="catalog container" id="catalogo"><div className="catalog-search-row"><div className="search-field"><Search size={19}/><label className="sr-only" htmlFor="product-search">Buscar produtos ou marcas</label><input id="product-search" type="search" placeholder="O que você está procurando?" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="Limpar busca" onClick={() => setQuery('')}><X size={17}/></button>}</div><CustomSelect label="Filtrar por marca" value={brand} options={brandOptions} onChange={setBrand} icon={<SlidersHorizontal size={15}/>}/></div>
 <div className="category-tabs" role="group" aria-label="Categorias de produtos">{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}{c === 'Todos' && <span>{products.length}</span>}</button>)}</div>
 <div className="catalog-status"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p><div className="catalog-sort"><span>Ordenar:</span><CustomSelect label="Ordenar produtos" value={sort} options={sortOptions} onChange={setSort} compact/></div></div>
 {filtered.length ? <div className="product-grid catalog-grid">{filtered.map((p,i) => <ProductCard key={p.slug} product={p} index={i}/>)}</div> : <div className="search-empty"><Search size={34} strokeWidth={1}/><h2>Nenhum produto por aqui.</h2><p>Tente outro nome, marca ou categoria.</p><button className="button button-green" onClick={clear}>Limpar os filtros</button></div>}
 </section>;
}
