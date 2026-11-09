'use client';
import { Instagram } from './InstagramIcon';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Check, Copy, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { products, conversation, type Product } from '@/lib/catalog';
import { ProductImage } from './ProductImage';

type CartLine = { slug: string; quantity: number };
type Store = { lines: CartLine[]; count: number; add: (p: Product) => void; open: () => void };
const StoreContext = createContext<Store | null>(null);
export function useStore() { const v = useContext(StoreContext); if (!v) throw new Error('StoreProvider missing'); return v; }
const key = 'fitlife-sacola-v1';
export function StoreProvider({ children }: { children: ReactNode }) {
 const [lines, setLines] = useState<CartLine[]>([]);
 const [loaded, setLoaded] = useState(false);
 const [isOpen, setOpen] = useState(false);
 const [copied, setCopied] = useState(false);
 const [copyError, setCopyError] = useState(false);
 const [message, setMessage] = useState('');
 const [toast, setToast] = useState('');
 const dialog = useRef<HTMLDialogElement>(null);
 const summary = useRef<HTMLTextAreaElement>(null);
 const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 useEffect(() => {
  try { const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
   if (Array.isArray(saved)) {
    const seen = new Set<string>();
    setLines(saved.filter((v): v is CartLine => { if (!v || typeof v.slug !== 'string' || !products.some(p => p.slug === v.slug) || !Number.isInteger(v.quantity) || v.quantity < 1 || v.quantity > 99 || seen.has(v.slug)) return false; seen.add(v.slug); return true; }));
   }
  } catch { /* A fresh bag is used if the saved data is invalid. */ }
  setLoaded(true);
  return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
 }, []);
 useEffect(() => { if (loaded) try { localStorage.setItem(key, JSON.stringify(lines)); } catch { /* Bag remains usable for this visit. */ } }, [lines, loaded]);
 useEffect(() => {
  if (isOpen) { dialog.current?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }
  dialog.current?.close();
 }, [isOpen]);
 useEffect(() => { setCopied(false); setCopyError(false); }, [lines, message]);
 const add = useCallback((p: Product) => {
  setLines(previous => previous.some(l => l.slug === p.slug) ? previous.map(l => l.slug === p.slug ? { ...l, quantity: Math.min(99, l.quantity + 1) } : l) : [...previous, { slug: p.slug, quantity: 1 }]);
  setToast(`${p.name} adicionado à sacola`);
  if (toastTimer.current) clearTimeout(toastTimer.current);
  toastTimer.current = setTimeout(() => setToast(''), 3200);
 }, []);
 const change = (slug: string, n: number) => setLines(previous => previous.map(l => l.slug === slug ? { ...l, quantity: Math.max(1, Math.min(99, l.quantity + n)) } : l));
 const order = `Olá, FitLife! Gostaria de consultar valores e disponibilidade:\n\n${lines.map(l => { const p = products.find(p => p.slug === l.slug)!; return `${l.quantity} × ${p.name} — ${p.brand}`; }).join('\n')}${message.trim() ? `\n\nObservações: ${message.trim()}` : ''}\n\nPodem me informar as apresentações, os sabores, o valor total e as opções de entrega?`;
 const copy = async () => { try { await navigator.clipboard.writeText(order); setCopied(true); setCopyError(false); } catch { setCopyError(true); summary.current?.focus(); summary.current?.select(); } };
 const count = lines.reduce((sum, l) => sum + l.quantity, 0);
 return <MotionConfig reducedMotion="user"><StoreContext.Provider value={{ lines, count, add, open: () => setOpen(true) }}>
  {children}
  <AnimatePresence>{toast && <motion.div role="status" className="toast" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:16 }}><Check size={17}/><span>{toast}</span><button onClick={() => { setToast(''); setOpen(true); }}>Ver sacola</button></motion.div>}</AnimatePresence>
  <dialog ref={dialog} className="cart-dialog" aria-labelledby="cart-title" onCancel={e => { e.preventDefault(); setOpen(false); }} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
   {isOpen && <motion.div className="cart-panel" initial={{ x:50, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:.3 }}>
    <div className="cart-header"><div><span className="eyebrow">SEU PRÓXIMO PASSO</span><h2 id="cart-title">Sua sacola <span>({count})</span></h2></div><button className="icon-button" autoFocus aria-label="Fechar sacola" onClick={() => setOpen(false)}><X size={23}/></button></div>
    {lines.length === 0 ? <div className="cart-empty"><ShoppingBag size={48} strokeWidth={1}/><h3>Um espaço para suas escolhas.</h3><p>Explore o catálogo e adicione os produtos que você quer conhecer.</p><a className="button button-green" href="/loja/" onClick={() => setOpen(false)}>Explorar a loja</a></div> : <>
     <div className="cart-content"><p className="cart-intro">Monte sua lista. A FitLife confirma valores, sabores e disponibilidade com você.</p>
      <div className="cart-lines">{lines.map(l => { const p = products.find(p => p.slug === l.slug)!; return <div className="cart-line" key={l.slug}><ProductImage product={p}/><div className="cart-line-info"><span className="eyebrow">{p.brand}</span><h3>{p.name}</h3><div className="quantity"><button aria-label={`Diminuir quantidade de ${p.name}`} disabled={l.quantity === 1} onClick={() => change(l.slug, -1)}><Minus size={13}/></button><span aria-label={`Quantidade: ${l.quantity}`}>{l.quantity}</span><button aria-label={`Aumentar quantidade de ${p.name}`} disabled={l.quantity === 99} onClick={() => change(l.slug, 1)}><Plus size={13}/></button></div></div><button className="remove-button" aria-label={`Remover ${p.name}`} onClick={() => setLines(previous => previous.filter(v => v.slug !== l.slug))}><Trash2 size={16}/></button></div>; })}</div>
      <label className="field-label" htmlFor="order-note">Algo que devemos saber? <span>(opcional)</span></label><textarea id="order-note" rows={2} maxLength={500} placeholder="Sabor desejado, dúvidas sobre o produto…" value={message} onChange={e => setMessage(e.target.value)}/>
      <details className="order-preview"><summary>Ver mensagem do pedido</summary><textarea aria-label="Mensagem do pedido para copiar" ref={summary} readOnly rows={7} value={order}/></details>
     </div>
     <div className="cart-bottom"><p><strong>1.</strong> Copie seu pedido. <strong>2.</strong> Envie na conversa com a FitLife.</p><button className="button button-green full-width" onClick={copy}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'Pedido copiado' : 'Copiar meu pedido'}</button>{copyError && <p role="status" className="copy-error">Não foi possível copiar automaticamente. Abra “Ver mensagem do pedido” e copie o texto selecionado.</p>}<a className="button button-outline full-width" href={conversation} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>Abrir conversa no Instagram</a><small>O pedido será confirmado no atendimento. Nenhuma cobrança é feita aqui.</small></div>
    </>}
   </motion.div>}
  </dialog>
 </StoreContext.Provider></MotionConfig>;
}
export function AddToBag({ product, compact = false }: { product: Product; compact?: boolean }) {
 const { add } = useStore();
 return <button className={compact ? 'add-button' : 'button button-green'} aria-label={`Adicionar ${product.name} de ${product.brand} à sacola`} onClick={() => add(product)}><Plus size={compact ? 20 : 17}/>{!compact && 'Adicionar à sacola'}</button>;
}
