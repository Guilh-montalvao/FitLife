export type Category = 'Proteínas' | 'Creatinas' | 'Aminoácidos' | 'Vitaminas e minerais' | 'Outros suplementos';
export type Product = { slug: string; name: string; brand: string; category: Category; source: 'a' | 'b'; row: number; image?: string; note?: string };
export const products: Product[] = [
 { slug:'gold-whey-adaptogen',name:'Gold Whey',brand:'Adaptogen',category:'Proteínas',source:'a',row:0,image:'/products-store/Packshot premium do Adaptogen Gold Whey-1.png',note:'Sabor Original, conforme o catálogo.' },
 { slug:'c4-woman-new-millen',name:'C4 Woman',brand:'New Millen',category:'Outros suplementos',source:'a',row:1,image:'/products-store/New Millen C4 Woman em pedestal-2.png' },
 { slug:'curcuma-new-millen',name:'Cúrcuma em Cápsulas',brand:'New Millen',category:'Outros suplementos',source:'a',row:2,image:'/products-store/Cúrcuma em cápsulas sobre pedestal-3.png' },
 { slug:'vitamina-d-new-millen',name:'Vitamina D',brand:'New Millen',category:'Vitaminas e minerais',source:'a',row:3,image:'/products-store/Vitamina D em pedestal de pedra-1.png' },
 { slug:'zma-cromo-plus-new-millen',name:'ZMA Cromo Plus',brand:'New Millen',category:'Vitaminas e minerais',source:'a',row:4,image:'/products-store/ZMA Cromo Plus em estúdio verde-4.png' },
 { slug:'sineflex-power-supplements',name:'Sineflex',brand:'Power Supplements',category:'Outros suplementos',source:'a',row:5,image:'/products-store/Sineflex em estúdio verde e pedra-2.png' },
 { slug:'txt-test-shark-pro',name:'TXT Test',brand:'Shark Pro',category:'Outros suplementos',source:'a',row:6,image:'/products-store/SHARK TXT TEST no pedestal de pedra-3.png' },
 { slug:'tribulus-1000-bull-pharma',name:'Tribulus 1000',brand:'Bull Pharma',category:'Outros suplementos',source:'a',row:7,image:'/products-store/Frasco Tribullus no pedestal de pedra-4.png' },
 { slug:'hmb-1000-bull-pharma',name:'HMB 1000',brand:'Bull Pharma',category:'Outros suplementos',source:'a',row:8,image:'/products-store/HMB 1000 em estúdio verde-1.png' },
 { slug:'pre-workout-dux-nutrition',name:'Pre Workout',brand:'Dux Nutrition',category:'Outros suplementos',source:'a',row:9,image:'/products-store/Pote DUX sobre pedestal de calcário-2.png' },
 { slug:'creatina-nutropia',name:'Creatina',brand:'Nutropia',category:'Creatinas',source:'a',row:10,image:'/products-store/Creatina Nutropia em pedestal de pedra-3.png' },
 { slug:'melatonina-nutropia',name:'Melatonina',brand:'Nutropia',category:'Outros suplementos',source:'b',row:0,image:'/products-store/Nutropia melatonina no pedestal de pedra-4.png' },
 { slug:'l-glutamina-nutropia',name:'L-Glutamina',brand:'Nutropia',category:'Aminoácidos',source:'b',row:1,image:'/products-store/Pote Nutropia L-glutamina em fundo verde-2.png' },
 { slug:'l-carnitina-new-millen',name:'L-Carnitina',brand:'New Millen',category:'Outros suplementos',source:'b',row:2,image:'/products-store/L-carnitina no pedestal de pedra-1.png' },
 { slug:'creatina-capsulas-nutropia',name:'Creatina em Cápsulas',brand:'Nutropia',category:'Creatinas',source:'b',row:3,image:'/products-store/Creatina Nutropia em estúdio verde-3.png' },
 { slug:'beta-alanina-nutropia',name:'Beta-alanina',brand:'Nutropia',category:'Aminoácidos',source:'b',row:4,image:'/products-store/Beta-alanina Nutropia em estúdio premium-4.png' },
 { slug:'creatina-dux-nutrition',name:'Creatina',brand:'Dux Nutrition',category:'Creatinas',source:'b',row:5,image:'/products-store/Creatina DUX em estúdio verde-6.png' },
 { slug:'poli-complex-a-z-new-millen',name:'Poli Complex A a Z',brand:'New Millen',category:'Vitaminas e minerais',source:'b',row:6,image:'/products-store/New Millen POLI COMPLEX em estúdio-5.png' },
 { slug:'gold-whey-morango-adaptogen',name:'Gold Whey Morango',brand:'Adaptogen',category:'Proteínas',source:'b',row:7,image:'/products-store/Packshot premium do Whey Gold Morango-1.png',note:'Sabor Morango, conforme o catálogo.' },
 { slug:'coq10-new-millen',name:'CoQ10',brand:'New Millen',category:'Outros suplementos',source:'b',row:8,image:'/products-store/CoQ10 sobre pedestal de pedra-2.png' },
 { slug:'tasty-whey-adaptogen',name:'Tasty Whey',brand:'Adaptogen',category:'Proteínas',source:'b',row:9,image:'/products-store/Tasty Whey Vanilla Cream no pedestal-3.png' },
 { slug:'whey-isolado-dux-nutrition',name:'Whey Protein Isolado',brand:'Dux Nutrition',category:'Proteínas',source:'b',row:10,image:'/products-store/Whey DUX Cookies em estúdio premium-4.png' }
];
export const categories = ['Todos', 'Proteínas', 'Creatinas', 'Aminoácidos', 'Vitaminas e minerais', 'Outros suplementos'] as const;
export const brands = [...new Set(products.map(p => p.brand))].sort();
export const featured = ['gold-whey-adaptogen','creatina-dux-nutrition','vitamina-d-new-millen','l-glutamina-nutropia'].map(s => products.find(p => p.slug === s)!);
export const instagram = 'https://www.instagram.com/soul.fitlife/';
export const conversation = 'https://ig.me/m/soul.fitlife';
