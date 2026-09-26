import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, CirclePlay, Clock3, Download, Heart, Layers3, Lightbulb, Menu, MousePointer2, Palette, Quote, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const CHECKOUT_URL = '#checkout-placeholder';

type IconType = typeof Sparkles;

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-mark">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--secondary))]">
        <Heart size={20} strokeWidth={2.3} fill="currentColor" />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))]" />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-[18px] font-semibold tracking-[-.02em] text-[hsl(var(--foreground))]">aula viva</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">recursos que aproximam</p>
        </div>
      )}
    </div>
  );
}

function ButtonLink({ children, href, variant = 'primary', testId }: { children: ReactNode; href: string; variant?: 'primary' | 'light' | 'outline'; testId: string }) {
  const styles = {
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[5px_5px_0_hsl(var(--secondary))] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--secondary))]',
    light: 'bg-[hsl(var(--background))] text-[hsl(var(--primary))] shadow-[5px_5px_0_hsl(var(--secondary))] hover:-translate-y-0.5',
    outline: 'border border-[hsl(var(--primary)/.24)] bg-[hsl(var(--card)/.55)] text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/.55)] hover:bg-[hsl(var(--card))]',
  };
  return (
    <a className={`cta-button inline-flex items-center justify-center gap-3 rounded-full px-5 py-3.5 text-sm font-bold transition-all duration-200 sm:px-6 ${styles[variant]}`} href={href} data-testid={testId}>
      {children}
    </a>
  );
}

function PaperPreview() {
  return (
    <div className="relative mx-auto h-[390px] w-full max-w-[460px] sm:h-[440px]" aria-label="Prévia ilustrada do material" data-testid="visual-material-preview">
      <div className="absolute left-[5%] top-[10%] h-[74%] w-[60%] rotate-[-8deg] rounded-[22px] border border-[hsl(var(--primary)/.12)] bg-[#e9d8ca] p-4 opacity-90 shadow-[0_20px_40px_rgba(64,47,95,.12)] sm:left-[9%] sm:top-[8%]">
        <div className="h-full rounded-[14px] border border-dashed border-[hsl(var(--primary)/.22)] p-3">
          <div className="h-2 w-1/2 rounded-full bg-[hsl(var(--primary)/.16)]" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="h-16 rounded-lg bg-[hsl(var(--secondary)/.64)]" />
            <span className="h-16 rounded-lg bg-[hsl(var(--accent)/.35)]" />
            <span className="h-16 rounded-lg bg-[hsl(var(--primary)/.12)]" />
          </div>
          <div className="mt-5 space-y-2">
            <span className="block h-2 w-full rounded-full bg-[hsl(var(--primary)/.10)]" />
            <span className="block h-2 w-4/5 rounded-full bg-[hsl(var(--primary)/.10)]" />
            <span className="block h-2 w-11/12 rounded-full bg-[hsl(var(--primary)/.10)]" />
          </div>
        </div>
      </div>
      <div className="float absolute right-[5%] top-[2%] z-10 h-[88%] w-[76%] rounded-[25px] border border-[hsl(var(--primary)/.17)] bg-[hsl(var(--card))] p-5 shadow-[0_26px_70px_rgba(64,47,95,.18)] sm:right-[8%] sm:top-[4%]">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--primary))]">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              repertório de sala
            </div>
            <p className="font-display text-[25px] leading-[1.05] text-[hsl(var(--foreground))] sm:text-[30px]">Dinâmicas<br /><span className="text-[hsl(var(--primary))]">Interativas</span></p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--secondary)/.54)] text-[hsl(var(--primary))]">
            <Layers3 size={23} />
          </div>
        </div>
        <div className="mt-7 rounded-2xl bg-[hsl(var(--primary))] p-4 text-[hsl(var(--primary-foreground))]">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--secondary))]">a proposta de hoje</p>
          <p className="mt-2 font-display text-[22px] leading-tight">O som que mora<br />no meu nome</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[hsl(var(--primary-foreground)/.72)]">
            <Clock3 size={14} /> 5–10 min <span className="mx-1 opacity-40">·</span> roda
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 border-b border-[hsl(var(--border))] pb-4">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--accent)/.18)] text-[hsl(var(--accent))]"><Lightbulb size={17} /></div>
          <div><p className="text-xs font-bold">Como conduzir</p><p className="mt-0.5 text-[11px] text-[hsl(var(--muted-foreground))]">Orientação simples, passo a passo</p></div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[hsl(var(--muted-foreground))]"><Check size={14} className="text-[hsl(var(--accent))]" /> Poucos materiais, muita presença</div>
      </div>
      <div className="drift absolute -bottom-1 left-[2%] z-20 flex rotate-[-7deg] items-center gap-2 rounded-2xl border border-[hsl(var(--primary)/.12)] bg-[hsl(var(--secondary))] px-4 py-3 text-xs font-bold text-[hsl(var(--foreground))] shadow-[0_13px_28px_rgba(64,47,95,.14)] sm:left-[3%]">
        <Download size={16} /> pronto para usar
      </div>
      <span className="absolute right-[4%] top-[22%] h-3 w-3 rounded-full bg-[hsl(var(--accent))] sm:right-[1%]" />
      <span className="absolute bottom-[15%] right-[7%] h-5 w-5 rounded-full border-4 border-[hsl(var(--secondary))] sm:right-[3%]" />
    </div>
  );
}

const benefits: { icon: IconType; title: string; text: string; tone: string }[] = [
  { icon: Clock3, title: 'Menos tempo planejando', text: 'Abra o material, escolha o momento da turma e encontre uma proposta que cabe no seu dia.', tone: 'bg-[#f6dfaa] text-[#71501e]' },
  { icon: MousePointer2, title: 'Comece sem complicar', text: 'Instruções diretas, materiais acessíveis e atividades que não pedem uma produção enorme.', tone: 'bg-[#d7e6d9] text-[#326151]' },
  { icon: Users, title: 'Mais participação', text: 'Convites para falar, observar, criar, movimentar-se e construir junto com os colegas.', tone: 'bg-[#e4d7ee] text-[#63417c]' },
  { icon: Palette, title: 'Uma rotina com respiro', text: 'Tenha uma ideia à mão para acolher, transicionar, energizar ou fechar o encontro.', tone: 'bg-[#f3d5c8] text-[#884b3b]' },
];

const activities = [
  ['01', 'O som que mora no meu nome', 'acolhida · expressão', '5–10 min'],
  ['02', 'A caixa das perguntas curiosas', 'roda · conversa', '10 min'],
  ['03', 'Estátua, movimento e pausa', 'corpo · atenção', '5 min'],
  ['04', 'Mapa dos sentimentos', 'emoções · grupo', '15 min'],
];

const steps: [string, string, string, IconType][] = [
  ['01', 'Escolha o momento', 'Acolhida, transição, movimento ou conversa: encontre uma proposta que combina com o agora.', BookOpen],
  ['02', 'Leia o essencial', 'Veja o objetivo e o passo a passo. Adapte o que quiser; a estrutura já está ali.', Lightbulb],
  ['03', 'Convide a turma', 'Você conduz. As crianças participam, inventam e dão o tom que só aquele grupo tem.', Users],
];

const faqs = [
  ['Preciso comprar materiais específicos?', 'Não. As propostas priorizam materiais que já costumam existir na escola ou podem ser substituídos com facilidade. Quando uma dinâmica pedir algo, o material sinaliza e sugere adaptações.'],
  ['As dinâmicas servem para qual faixa etária?', 'O material foi pensado para a Educação Infantil e pode ser ajustado para diferentes idades, tamanhos de turma e níveis de autonomia. A professora conhece o grupo e escolhe o ritmo.'],
  ['Posso usar as atividades mais de uma vez?', 'Sim. Uma mesma proposta muda quando você troca a pergunta, a música, o espaço ou a forma de organizar os grupos. O material foi feito para virar repertório, não uma lista descartável.'],
  ['Como recebo o material?', 'O acesso é digital. Depois de configurar o checkout, você poderá substituir o destino do botão por seu link de compra e entrega.'],
];

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] ${light ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--primary))]'}`}><span className={`h-2 w-2 rounded-full ${light ? 'bg-[hsl(var(--secondary))]' : 'bg-[hsl(var(--accent))]'}`} />{children}</p>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="page-shell noise">
      <header className="relative z-40 border-b border-[hsl(var(--border)/.72)] bg-[hsl(var(--background)/.88)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <a href="#inicio" aria-label="Voltar ao início" data-testid="link-brand-home"><Mark /></a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[hsl(var(--muted-foreground))] md:flex" aria-label="Navegação principal">
            <a href="#por-dentro" className="transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-nav-material">Por dentro</a>
            <a href="#para-quem" className="transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-nav-para-quem">É para você?</a>
            <a href="#duvidas" className="transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-nav-duvidas">Dúvidas</a>
          </nav>
          <div className="hidden md:block"><ButtonLink href="#oferta" testId="link-header-cta">Quero minhas dinâmicas <ArrowRight size={16} /></ButtonLink></div>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--primary))] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} data-testid="button-toggle-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[hsl(var(--border)/.72)] px-5 py-4 md:hidden" aria-label="Navegação móvel">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              <a href="#por-dentro" onClick={() => setMenuOpen(false)} data-testid="link-mobile-material">Por dentro do material</a>
              <a href="#para-quem" onClick={() => setMenuOpen(false)} data-testid="link-mobile-para-quem">É para você?</a>
              <a href="#duvidas" onClick={() => setMenuOpen(false)} data-testid="link-mobile-duvidas">Dúvidas frequentes</a>
              <ButtonLink href="#oferta" testId="link-mobile-cta">Quero minhas dinâmicas <ArrowRight size={16} /></ButtonLink>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-4 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="relative z-10 max-w-2xl">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/.14)] bg-[hsl(var(--card)/.74)] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))]" data-testid="badge-hero">
              <Sparkles size={14} /> um repertório para a vida real
            </div>
            <h1 className="reveal reveal-delay-1 mt-6 max-w-[700px] font-display text-[clamp(3.2rem,7vw,6.7rem)] leading-[.91] tracking-[-.055em] text-[hsl(var(--foreground))]" data-testid="text-hero-title">
              Sua próxima atividade <span className="serif-underline text-[hsl(var(--primary))]">já está pronta.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-xl text-[17px] leading-8 text-[hsl(var(--muted-foreground))] sm:text-lg" data-testid="text-hero-description">
              54 dinâmicas interativas para transformar a rotina da Educação Infantil em mais conversa, movimento e participação — sem passar a noite planejando.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#oferta" testId="link-hero-cta">Quero o repertório completo <ArrowRight size={18} className="cta-arrow" /></ButtonLink>
              <a href="#por-dentro" className="inline-flex items-center gap-2 px-2 py-2 text-sm font-bold text-[hsl(var(--primary))] hover:gap-3" data-testid="link-hero-secondary">Ver o que vem dentro <ArrowDown size={15} /></a>
            </div>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-2"><Check size={15} className="text-[hsl(var(--accent))]" /> pronto para aplicar</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-[hsl(var(--accent))]" /> sem materiais difíceis</span>
            </div>
          </div>
          <div className="relative lg:pl-5"><div className="absolute -right-16 top-14 h-72 w-72 rounded-full bg-[hsl(var(--secondary)/.3)] blur-3xl" /><PaperPreview /></div>
        </section>

        <div className="border-y border-[hsl(var(--border)/.7)] bg-[hsl(var(--card)/.55)]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-5 sm:grid-cols-4 lg:px-10">
            {[
              ['54', 'propostas prontas'],
              ['5–15', 'minutos de aplicação'],
              ['1', 'material organizado'],
              ['∞', 'jeitos de adaptar'],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-[hsl(var(--border))] px-4 py-2 text-center last:border-0 sm:px-5" data-testid={`stat-${label.replaceAll(' ', '-')}`}>
                <p className="font-display text-2xl text-[hsl(var(--primary))]">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>para a rotina de verdade</SectionLabel>
              <h2 className="max-w-lg font-display text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl" data-testid="text-problem-title">Porque nem todo dia dá para inventar uma novidade.</h2>
            </div>
            <div className="max-w-xl lg:pb-1">
              <p className="text-[17px] leading-8 text-[hsl(var(--muted-foreground))]">Entre a acolhida, o lanche, a atividade planejada e aquele momento em que a turma precisa de uma pausa, falta tempo — não intenção.</p>
              <p className="mt-4 text-[17px] leading-8 text-[hsl(var(--muted-foreground))]">Este material guarda ideias simples para você respirar, escolher e conduzir. O planejamento fica mais leve; a presença com as crianças, maior.</p>
            </div>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text, tone }, index) => (
              <article className="card-lift rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)] p-6" key={title} data-testid={`card-benefit-${index}`}>
                <div className={`mb-7 grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon size={22} strokeWidth={2} /></div>
                <h3 className="font-display text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="por-dentro" className="relative overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full border border-[hsl(var(--secondary)/.22)]" /><div className="absolute -left-12 top-24 h-56 w-56 rounded-full border border-[hsl(var(--secondary)/.16)]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <SectionLabel light>não é uma lista solta</SectionLabel>
              <h2 className="max-w-xl font-display text-4xl leading-[1.03] tracking-[-.04em] sm:text-6xl" data-testid="text-inside-title">É o tipo de material que você abre e pensa: “era isso”.</h2>
              <p className="mt-7 max-w-lg text-[16px] leading-8 text-[hsl(var(--primary-foreground)/.72)]">Cada dinâmica vem com um caminho claro para sair da ideia e chegar à roda: objetivo, condução, materiais possíveis e sugestões para fazer do seu jeito.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['acolhida', 'movimento', 'conversa', 'imaginação'].map((tag) => <span key={tag} className="rounded-full border border-[hsl(var(--primary-foreground)/.22)] px-3.5 py-2 text-xs font-semibold text-[hsl(var(--primary-foreground)/.82)]">{tag}</span>)}
              </div>
            </div>
            <div className="relative">
              <div className="dot-grid absolute -right-4 -top-8 h-32 w-36 opacity-70" />
              <div className="relative rounded-[25px] border border-[hsl(var(--primary-foreground)/.18)] bg-[hsl(var(--primary-foreground)/.1)] p-3 backdrop-blur-sm sm:p-5">
                <div className="overflow-hidden rounded-[17px] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                  <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4"><div className="flex items-center gap-2"><BookOpen size={17} className="text-[hsl(var(--primary))]" /><span className="text-xs font-bold">índice de possibilidades</span></div><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--muted-foreground))]">01 — 54</span></div>
                  {activities.map(([number, title, category, time]) => (
                    <div className="group flex items-center gap-4 border-b border-[hsl(var(--border)/.8)] px-5 py-4 last:border-0 hover:bg-[hsl(var(--secondary)/.12)]" key={number} data-testid={`activity-row-${number}`}>
                      <span className="font-display text-xl text-[hsl(var(--primary)/.45)]">{number}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{title}</p><p className="mt-1 text-[11px] text-[hsl(var(--muted-foreground))]">{category}</p></div>
                      <span className="hidden text-[11px] font-semibold text-[hsl(var(--muted-foreground))] sm:block">{time}</span><ArrowRight size={16} className="text-[hsl(var(--primary))] transition-transform group-hover:translate-x-1" />
                    </div>
                  ))}
                  <div className="flex items-center justify-between bg-[hsl(var(--secondary)/.35)] px-5 py-4"><span className="text-xs font-bold text-[hsl(var(--primary))]">+ 50 outras ideias para consultar</span><CirclePlay size={18} className="text-[hsl(var(--primary))]" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="para-quem" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_.86fr] lg:items-center lg:px-10 lg:py-28">
          <div className="relative min-h-[370px] rounded-[28px] bg-[#ead9d0] p-7 sm:p-10">
            <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-[hsl(var(--secondary))]" /><div className="absolute bottom-8 left-8 h-12 w-12 rounded-full border-8 border-[hsl(var(--accent)/.5)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div><span className="inline-flex rounded-full bg-[hsl(var(--background)/.78)] px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]">feito para quem conduz</span><p className="mt-10 max-w-sm font-display text-4xl leading-[1.02] tracking-[-.04em] text-[hsl(var(--foreground))] sm:text-5xl">Sua experiência já é enorme. Seu banco de ideias também pode ser.</p></div>
              <div className="mt-8 flex items-end justify-between"><div className="flex -space-x-2"><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#ead9d0] bg-[hsl(var(--primary))] text-xs font-bold text-[hsl(var(--primary-foreground))]">MA</span><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#ead9d0] bg-[hsl(var(--accent))] text-xs font-bold text-[hsl(var(--primary-foreground))]">CL</span><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#ead9d0] bg-[hsl(var(--secondary))] text-xs font-bold">JP</span></div><p className="max-w-[150px] text-right text-xs font-semibold leading-5 text-[hsl(var(--muted-foreground))]">para professoras que fazem acontecer</p></div>
            </div>
          </div>
          <div>
            <SectionLabel>para quem é</SectionLabel>
            <h2 className="font-display text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">Para a professora que quer mais troca, não mais tarefas.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[hsl(var(--muted-foreground))]">Para quem já se pegou procurando uma atividade de última hora, repetindo a mesma brincadeira ou sentindo que a rotina poderia ter um pouco mais de vida.</p>
            <ul className="mt-8 space-y-4">
              {['Quer variar a rotina sem criar um projeto do zero', 'Precisa de propostas que funcionem com pouco preparo', 'Acredita que aprender também acontece na interação'].map((item, i) => <li className="flex items-start gap-3 text-sm font-semibold" key={item} data-testid={`list-audience-${i}`}><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent)/.18)] text-[hsl(var(--accent))]"><Check size={13} strokeWidth={3} /></span>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="border-y border-[hsl(var(--border)/.7)] bg-[hsl(var(--card)/.44)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-24">
            <div><SectionLabel>um jeito simples de usar</SectionLabel><h2 className="font-display text-4xl leading-[1.04] tracking-[-.04em] sm:text-5xl">Da página para a roda, em três movimentos.</h2></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map(([number, title, text, Icon]) => (
                <article key={number as string} className="rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--background)/.66)] p-5" data-testid={`step-${number}`}>
                  <div className="flex items-center justify-between"><span className="font-display text-3xl text-[hsl(var(--primary)/.55)]">{number}</span><Icon size={19} className="text-[hsl(var(--accent))]" /></div><h3 className="mt-9 font-display text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="oferta" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 lg:px-10 lg:py-28">
          <div id="checkout-placeholder" className="relative overflow-hidden rounded-[30px] bg-[hsl(var(--primary))] px-6 py-10 text-[hsl(var(--primary-foreground))] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -right-10 -top-28 h-80 w-80 rounded-full border-[38px] border-[hsl(var(--secondary)/.22)]" /><div className="absolute bottom-0 right-[35%] h-4 w-4 rounded-full bg-[hsl(var(--secondary))]" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_360px] lg:items-center">
              <div><SectionLabel light>seu repertório começa aqui</SectionLabel><h2 className="max-w-2xl font-display text-4xl leading-[1.02] tracking-[-.045em] sm:text-6xl" data-testid="text-offer-title">Mais ideias na manga. Mais presença na sala.</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[hsl(var(--primary-foreground)/.75)]">Tenha as 54 dinâmicas reunidas em um material digital prático para consultar sempre que uma nova ideia fizer falta.</p><a href={CHECKOUT_URL} className="cta-button mt-8 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-6 py-4 text-sm font-bold text-[hsl(var(--foreground))] shadow-[5px_5px_0_hsl(var(--background)/.5)] transition-all hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--background)/.5)]" data-testid="link-purchase-cta">Quero as 54 dinâmicas agora <ArrowRight size={18} className="cta-arrow" /></a><p className="mt-4 text-[11px] text-[hsl(var(--primary-foreground)/.52)]">Destino de compra configurável · acesso digital</p></div>
              <div className="relative rounded-[22px] bg-[hsl(var(--background))] p-6 text-[hsl(var(--foreground))] shadow-[0_18px_50px_rgba(34,22,59,.22)]"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]">você recebe</p><div className="my-5 space-y-4">{['54 dinâmicas prontas para aplicar', 'Orientações simples para conduzir', 'Sugestões de materiais e adaptações', 'Um repertório para consultar sempre'].map((item) => <div className="flex items-start gap-3 text-sm font-semibold" key={item}><Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />{item}</div>)}</div><div className="border-t border-[hsl(var(--border))] pt-4 text-xs leading-5 text-[hsl(var(--muted-foreground))]"><ShieldCheck size={15} className="mr-1 inline text-[hsl(var(--accent))]" /> Material pensado para a rotina real da Educação Infantil.</div></div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="mx-auto max-w-3xl scroll-mt-8 px-5 pb-20 lg:pb-28">
          <div className="text-center"><SectionLabel>antes de escolher</SectionLabel><h2 className="font-display text-4xl leading-[1.04] tracking-[-.04em] sm:text-5xl">Dúvidas que podem estar passando pela sua cabeça.</h2></div>
          <div className="mt-10 border-t border-[hsl(var(--border))]">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return <div className="border-b border-[hsl(var(--border))]" key={question}><button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold hover:text-[hsl(var(--primary))]" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-[hsl(var(--primary))] transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button><div className="faq-content grid" data-open={isOpen}><div><p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{answer}</p></div></div></div>;
            })}
          </div>
        </section>

        <section className="border-t border-[hsl(var(--border)/.72)] bg-[#ead9d0]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 sm:flex-row sm:items-center lg:px-10">
            <div><div className="mb-4 flex items-center gap-2 text-[hsl(var(--primary))]"><Quote size={18} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div><p className="max-w-2xl font-display text-2xl leading-tight sm:text-3xl">“Quando a ideia está organizada, sobra mais espaço para olhar para as crianças.”</p></div>
            <ButtonLink href="#oferta" variant="outline" testId="link-final-cta">Quero facilitar minha rotina <ArrowRight size={16} /></ButtonLink>
          </div>
        </section>
      </main>
      <footer className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="[&_*]:text-[hsl(var(--background))]"><Mark compact /><p className="mt-4 max-w-xs text-xs leading-5 opacity-60">Recursos para deixar a Educação Infantil mais participativa, possível e viva.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold opacity-70"><a href="#inicio" className="hover:opacity-100" data-testid="link-footer-top">Voltar ao início</a><a href="#oferta" className="hover:opacity-100" data-testid="link-footer-offer">Ver oferta</a><a href="#duvidas" className="hover:opacity-100" data-testid="link-footer-faq">Dúvidas</a></div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-[hsl(var(--background)/.14)] px-5 py-5 text-[10px] opacity-45 lg:px-10">© 2024 Aula Viva · feito para quem ensina com presença.</div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;