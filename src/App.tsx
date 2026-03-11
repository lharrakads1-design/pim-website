import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react';
import {
  Wrench, Gauge, Clock, ArrowLeftRight, ArrowUpDown,
  Building2, Lightbulb, Key, GitBranch, Settings, Layers,
  Zap, Award, Shield, Target, CheckCircle, Timer,
  Users, Phone, Mail, MapPin, Menu, X, Star,
  ArrowRight, ChevronUp, Send, Eye, Hammer,
  Package, Activity, Facebook, Linkedin, Quote,
  ChevronRight, ClipboardCheck, type LucideIcon,
  Headphones, CircleCheckBig, TrendingUp, BadgeCheck
} from 'lucide-react';

/* ============================================================
   IMAGES
   ============================================================ */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
  about1: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
  about2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  whyChoose: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1920&q=80',
  team: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
  cta: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1920&q=80',
  contact: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  stats: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  process: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=80',
  logo: 'https://i.imgur.com/LvTHAl6.png',
};

/* ============================================================
   CUSTOM HOOKS
   ============================================================ */
function useInView(options?: { threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const handler = () => {
      const pos = window.scrollY + 250;
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

/* ============================================================
   UTILITY COMPONENTS
   ============================================================ */
function Animate({ children, className = '', delay = 0, direction = 'up' }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const { ref, isVisible } = useInView();
  const transforms: Record<string, string> = {
    up: isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
    down: isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
    left: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0',
    right: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0',
    none: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${transforms[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle, light = false, centered = true }: {
  title: string; subtitle?: string; light?: boolean; centered?: boolean;
}) {
  return (
    <Animate className={`mb-14 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 ${light ? 'bg-blue-400' : 'bg-blue-600'} mt-6 ${centered ? 'mx-auto' : ''} rounded-full`} />
    </Animate>
  );
}

function IconBox({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${className}`}>
      <Icon className="w-7 h-7" />
    </div>
  );
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ============================================================
   DATA
   ============================================================ */
const NAV_ITEMS = [
  { label: 'Accueil', id: 'accueil' },
  { label: 'À propos', id: 'a-propos' },
  { label: 'Services', id: 'services' },
  { label: 'Secteurs', id: 'secteurs' },
  { label: 'Contact', id: 'contact' },
];

const TRUST_BADGES = [
  { icon: Zap, label: 'Intervention rapide' },
  { icon: Clock, label: 'Disponibilité 24/7' },
  { icon: Users, label: 'Équipe expérimentée' },
  { icon: Shield, label: 'Qualité et sécurité' },
];

const VALUES = [
  { icon: Award, title: 'Professionnalisme', text: 'Des standards élevés dans chaque intervention, avec rigueur et engagement envers l\'excellence opérationnelle.' },
  { icon: Zap, title: 'Réactivité', text: 'Une capacité de mobilisation rapide pour répondre aux urgences et minimiser les temps d\'arrêt de production.' },
  { icon: Shield, title: 'Fiabilité', text: 'Des solutions éprouvées et un suivi rigoureux pour garantir la durabilité et la performance de vos équipements.' },
];

const SERVICES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Wrench, title: 'Maintenance industrielle générale', desc: 'Entretien préventif et correctif de vos équipements industriels pour assurer une performance optimale et réduire les temps d\'arrêt.' },
  { icon: Gauge, title: 'Installation et réparation de compresseurs d\'air', desc: 'Installation, mise en service, entretien et réparation de systèmes de compression d\'air pour un fonctionnement fiable et continu.' },
  { icon: Timer, title: 'Arrêts techniques et révisions industrielles', desc: 'Planification et exécution d\'arrêts techniques, révisions majeures et remises en état d\'équipements dans les délais impartis.' },
  { icon: ArrowLeftRight, title: 'Installation et réparation de convoyeurs', desc: 'Montage, réglage, maintenance et réparation de systèmes de convoyage pour optimiser vos flux de production.' },
  { icon: ArrowUpDown, title: 'Installation et réparation de niveleurs de quai', desc: 'Installation, entretien et réparation de niveleurs de quai pour sécuriser et fluidifier vos opérations de chargement.' },
  { icon: Building2, title: 'Portes industrielles et sectionnelles', desc: 'Pose, maintenance et réparation de portes industrielles, portes sectionnelles et systèmes d\'accès pour sécuriser vos installations.' },
  { icon: Lightbulb, title: 'Éclairage industriel et signalétique', desc: 'Installation et maintenance de systèmes d\'éclairage industriel et de signalétique pour assurer la sécurité et la visibilité sur site.' },
  { icon: Key, title: 'Maintenance clé en main et externalisation', desc: 'Solutions complètes de maintenance externalisée pour vous permettre de vous concentrer sur votre cœur de métier.' },
  { icon: GitBranch, title: 'Tuyauterie de process', desc: 'Installation, modification et réparation de réseaux de tuyauterie industrielle pour vos processus de production.' },
  { icon: Settings, title: 'Systèmes mécaniques', desc: 'Montage, alignement, réglage et réparation de composants mécaniques : moteurs, pompes, réducteurs et plus encore.' },
  { icon: Layers, title: 'Maintenance générale d\'usine', desc: 'Prise en charge globale de la maintenance de vos sites industriels : bâtiments, utilités, équipements et infrastructures.' },
];

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: 'Intervention rapide sur site', desc: 'Nos équipes sont mobilisables rapidement pour intervenir sur vos installations en cas d\'urgence ou de panne.' },
  { icon: Award, title: 'Techniciens qualifiés et expérimentés', desc: 'Des professionnels formés et certifiés, avec une solide expérience en environnement industriel.' },
  { icon: Clock, title: 'Disponibilité 24h/24 et 7j/7', desc: 'Un service de maintenance disponible à tout moment pour répondre à vos besoins critiques.' },
  { icon: Shield, title: 'Maintenance préventive et corrective', desc: 'Des programmes de maintenance planifiée et des interventions correctives pour optimiser la durée de vie de vos équipements.' },
  { icon: Target, title: 'Solutions adaptées à vos besoins', desc: 'Des prestations sur mesure, conçues pour répondre aux exigences spécifiques de votre activité.' },
  { icon: CheckCircle, title: 'Exigence de qualité et sécurité', desc: 'Le respect des normes les plus strictes en matière de qualité, de sécurité et d\'environnement.' },
];

const EXPERTISE_POINTS: { icon: LucideIcon; label: string }[] = [
  { icon: Wrench, label: 'Montage et démontage d\'équipements' },
  { icon: Settings, label: 'Réparation mécanique' },
  { icon: Gauge, label: 'Contrôle et ajustement' },
  { icon: Eye, label: 'Inspection technique' },
  { icon: MapPin, label: 'Maintenance sur site' },
  { icon: Headphones, label: 'Assistance personnalisée' },
];

const PROCESS_STEPS = [
  { icon: ClipboardCheck, number: '01', title: 'Analyse du besoin', desc: 'Étude approfondie de vos exigences techniques et opérationnelles pour définir la meilleure stratégie d\'intervention.' },
  { icon: Eye, number: '02', title: 'Diagnostic technique', desc: 'Inspection et évaluation complète de vos équipements pour identifier les causes des dysfonctionnements.' },
  { icon: Wrench, number: '03', title: 'Intervention et réparation', desc: 'Mise en œuvre des solutions techniques avec précision, efficacité et respect des normes de sécurité.' },
  { icon: CheckCircle, number: '04', title: 'Contrôle qualité et suivi', desc: 'Vérification rigoureuse des travaux réalisés et suivi post-intervention pour garantir la pérennité des résultats.' },
];

const SECTORS: { icon: LucideIcon; title: string }[] = [
  { icon: Building2, title: 'Usines de production' },
  { icon: Package, title: 'Entrepôts logistiques' },
  { icon: Layers, title: 'Plateformes industrielles' },
  { icon: Settings, title: 'Installations techniques' },
  { icon: Activity, title: 'Lignes de production' },
  { icon: Hammer, title: 'Infrastructures mécaniques' },
];

const STATS = [
  { icon: Clock, value: '24/7', label: 'Disponibilité' },
  { icon: CircleCheckBig, value: '100%', label: 'Engagement qualité' },
  { icon: TrendingUp, value: 'Max', label: 'Réactivité maximale' },
  { icon: BadgeCheck, value: 'Pro', label: 'Équipe terrain expérimentée' },
];

const TESTIMONIALS = [
  {
    name: 'Mohamed B.',
    role: 'Responsable maintenance',
    location: 'Casablanca',
    text: 'PIM nous accompagne depuis plus de 2 ans dans la maintenance de nos lignes de production. Leur réactivité et leur professionnalisme sont remarquables. Une équipe sérieuse qui comprend nos contraintes industrielles.',
    rating: 5,
  },
  {
    name: 'Karim E.',
    role: 'Chef d\'exploitation',
    location: 'Tanger',
    text: 'Intervention rapide et travail de qualité. L\'équipe PIM a su répondre à nos besoins en un temps record lors de notre dernier arrêt technique. Je recommande vivement leurs services.',
    rating: 5,
  },
  {
    name: 'Fatima Z.',
    role: 'Responsable technique',
    location: 'Kénitra',
    text: 'Un partenaire fiable et compétent pour nos besoins en maintenance industrielle. Leur expertise technique et leur disponibilité font la différence. Nous sommes pleinement satisfaits.',
    rating: 5,
  },
];

/* ============================================================
   HEADER
   ============================================================ */
function Header() {
  const scrolled = useScrolled(50);
  const active = useActiveSection(NAV_ITEMS.map(n => n.id));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navClick = (id: string) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-900/5 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navClick('accueil')} className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg transition-all duration-300 ${
            scrolled ? 'bg-blue-600' : 'bg-blue-600/90'
          } group-hover:scale-105`}>
            <img src={IMG.logo} alt="PIM"/>
          </div>
          <div className="hidden sm:block">
            <span className={`font-bold text-lg transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              POM
            </span>
            <span className={`hidden md:inline text-sm ml-2 transition-colors duration-300 ${scrolled ? 'text-slate-500' : 'text-slate-300'}`}>
              Perfect Industrial Maintenance
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                active === item.id
                  ? scrolled ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/15'
                  : scrolled ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-50' : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => navClick('contact')}
          className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 btn-shine"
        >
          Demander un devis
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-400 overflow-hidden ${
        mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white shadow-xl mx-4 mt-3 rounded-2xl p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => navClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navClick('contact')}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMG.hero})` }}
      />
      <div className="absolute inset-0 hero-gradient" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-3xl">
          <Animate delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-200 text-sm font-medium">Maintenance Industrielle Professionnelle</span>
            </div>
          </Animate>

          <Animate delay={150}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Votre partenaire de confiance en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                maintenance industrielle
              </span>
            </h1>
          </Animate>

          <Animate delay={300}>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              PIM accompagne les professionnels de l'industrie avec des solutions fiables en maintenance, installation, réparation et assistance technique pour garantir la performance et la continuité de vos équipements.
            </p>
          </Animate>

          <Animate delay={450}>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 btn-shine"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300"
              >
                Découvrir nos services
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Animate>
        </div>

        {/* Trust Badges */}
        <Animate delay={600}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl">
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className="glass rounded-xl px-4 py-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <badge.icon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white text-sm font-medium leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>
        </Animate>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="a-propos" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Text */}
          <div>
            <Animate direction="left">
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-blue-700 text-sm font-semibold">À propos de PIM</span>
              </div>
            </Animate>
            <Animate direction="left" delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                L'expertise industrielle au service de votre{' '}
                <span className="gradient-text">performance</span>
              </h2>
            </Animate>
            <Animate direction="left" delay={200}>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Perfect Industrial Maintenance est spécialisée dans la maintenance industrielle, l'installation technique, la réparation d'équipements et l'accompagnement opérationnel des entreprises industrielles.
              </p>
            </Animate>
            <Animate direction="left" delay={300}>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Nous mettons à disposition de nos clients une expertise terrain, une forte réactivité et un engagement constant en matière de qualité, de sécurité et de performance.
              </p>
            </Animate>
            <Animate direction="left" delay={400}>
              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
              >
                Découvrir nos services
                <ArrowRight className="w-5 h-5" />
              </button>
            </Animate>
          </div>

          {/* Images */}
          <Animate direction="right" delay={200}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
                <img src={IMG.about1} alt="Équipe technique PIM en intervention" className="w-full h-80 md:h-96 object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 md:w-56 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border-4 border-white">
                <img src={IMG.about2} alt="Maintenance technique industrielle" className="w-full h-36 md:h-44 object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/30 animate-float">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </Animate>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {VALUES.map((val, i) => (
            <Animate key={i} delay={i * 150}>
              <div className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-400 card-hover border border-slate-100 group">
                <IconBox icon={val.icon} className="bg-blue-100 text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed">{val.text}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nos services"
          subtitle="PIM propose une gamme complète de prestations en maintenance industrielle, couvrant l'ensemble de vos besoins techniques avec expertise et réactivité."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <Animate key={i} delay={i * 80} direction="none">
              <div className="bg-white rounded-2xl p-7 h-full flex flex-col border border-slate-100 card-hover hover:border-blue-100 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-5 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                  <svc.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{svc.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">{svc.desc}</p>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold hover:gap-2.5 transition-all duration-300 mt-auto"
                >
                  En savoir plus
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY CHOOSE US
   ============================================================ */
function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${IMG.whyChoose})` }}
      />
      <div className="absolute inset-0 section-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Pourquoi choisir PIM ?"
          subtitle="Notre équipe intervient avec rigueur et efficacité pour assurer l'installation, l'entretien, le diagnostic, le réglage et la réparation de vos équipements industriels dans les meilleures conditions."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <Animate key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-7 hover:bg-white/15 transition-all duration-400 group h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-colors">
                  <b.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TEAM / EXPERTISE
   ============================================================ */
function TeamExpertise() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <Animate direction="left">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
                <img src={IMG.team} alt="Équipe technique PIM" className="w-full h-80 md:h-[480px] object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-blue-600 rounded-2xl px-6 py-4 shadow-xl shadow-blue-600/30">
                <p className="text-white font-bold text-lg">Équipe qualifiée</p>
                <p className="text-blue-200 text-sm">Expertise terrain</p>
              </div>
            </div>
          </Animate>

          {/* Text */}
          <div>
            <Animate direction="right">
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-blue-700 text-sm font-semibold">Notre expertise</span>
              </div>
            </Animate>
            <Animate direction="right" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Une équipe technique polyvalente{' '}
                <span className="gradient-text">à votre service</span>
              </h2>
            </Animate>
            <Animate direction="right" delay={200}>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Nos soudeurs, mécaniciens, monteurs et techniciens sont prêts à intervenir dans différents environnements industriels pour accompagner vos opérations avec professionnalisme, précision et réactivité.
              </p>
            </Animate>

            <div className="grid sm:grid-cols-2 gap-4">
              {EXPERTISE_POINTS.map((pt, i) => (
                <Animate key={i} direction="right" delay={300 + i * 80}>
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3.5 hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                      <pt.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-slate-800 font-medium text-sm">{pt.label}</span>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS
   ============================================================ */
function Process() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Notre méthode d'intervention"
          subtitle="Un processus rigoureux et éprouvé pour garantir des interventions de qualité, dans les délais et en toute sécurité."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

          {PROCESS_STEPS.map((step, i) => (
            <Animate key={i} delay={i * 150}>
              <div className="relative bg-white rounded-2xl p-8 text-center border border-slate-100 card-hover group h-full">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/25 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-4 right-4 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTORS
   ============================================================ */
function Sectors() {
  return (
    <section id="secteurs" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Secteurs d'activité"
          subtitle="PIM intervient dans une grande diversité d'environnements industriels, en s'adaptant aux exigences spécifiques de chaque secteur."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector, i) => (
            <Animate key={i} delay={i * 100}>
              <div className="relative bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 card-hover overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-5 group-hover:bg-blue-600/30 transition-colors">
                    <sector.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{sector.title}</h3>
                  <div className="w-10 h-0.5 bg-blue-500/50 rounded-full group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS
   ============================================================ */
function Stats() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${IMG.stats})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/90 to-blue-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <Animate key={i} delay={i * 150}>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/25 transition-colors group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Ce que disent nos clients"
          subtitle="La satisfaction de nos clients est notre priorité. Découvrez leurs témoignages sur la qualité de nos interventions."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Animate key={i} delay={i * 150}>
              <div className="bg-white rounded-2xl p-8 border border-slate-100 card-hover h-full flex flex-col">
                <Quote className="w-10 h-10 text-blue-100 mb-4" />
                <p className="text-slate-700 leading-relaxed mb-6 flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role} — {t.location}</p>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [form, setForm] = useState({ nom: '', societe: '', telephone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ nom: '', societe: '', telephone: '', email: '', service: '', message: '' });
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-400 transition-all duration-300 hover:border-slate-300 focus:bg-white';

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Contactez-nous"
          subtitle="Besoin d'une intervention, d'un devis ou d'un accompagnement technique ? Notre équipe est disponible pour répondre rapidement à vos besoins."
        />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <Animate className="lg:col-span-3" direction="left">
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100">
              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">Votre demande a été envoyée avec succès. Nous vous contacterons rapidement.</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label>
                  <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className={inputCls} placeholder="Votre nom" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Société</label>
                  <input type="text" value={form.societe} onChange={e => setForm({ ...form, societe: e.target.value })} className={inputCls} placeholder="Nom de votre société" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone</label>
                  <input type="tel" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} className={inputCls} placeholder="+212 6XX XXX XXX" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Service demandé</label>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className={inputCls}>
                  <option value="">Sélectionnez un service</option>
                  {SERVICES.map((s, i) => (
                    <option key={i} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inputCls + ' resize-none'} placeholder="Décrivez votre besoin..." required />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 btn-shine"
              >
                <Send className="w-5 h-5" />
                Envoyer la demande
              </button>
            </form>
          </Animate>

          {/* Contact Info */}
          <Animate className="lg:col-span-2" direction="right">
            <div className="space-y-6">
              {/* Contact Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8 hidden lg:block">
                <img src={IMG.contact} alt="Support technique PIM" className="w-full h-48 object-cover" />
              </div>

              <div className="space-y-5">
                <a href="tel:+212669177191" className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Téléphone</p>
                    <p className="text-slate-900 font-semibold">+212 669 177 191</p>
                  </div>
                </a>

                <a href="mailto:technique@pim.ma" className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
                    <p className="text-slate-900 font-semibold">technique@pim.ma</p>
                    <p className="text-slate-600 text-sm">pim.technique@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Localisation</p>
                    <p className="text-slate-900 font-semibold">Maroc</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Réseaux sociaux</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-600 transition-colors group">
                      <Facebook className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </a>
                    <a href="#" className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-600 transition-colors group">
                      <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-200 mx-auto mb-3" />
                  <p className="text-white font-bold text-lg mb-1">Disponible 24/7</p>
                  <p className="text-blue-200 text-sm">Notre équipe est à votre disposition pour toute urgence technique</p>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.cta})` }}
      />
      <div className="absolute inset-0 cta-gradient" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Animate>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Confiez vos équipements à des{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">professionnels</span>
          </h2>
        </Animate>
        <Animate delay={150}>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            PIM vous accompagne avec des solutions de maintenance industrielle fiables, rapides et adaptées à vos exigences opérationnelles.
          </p>
        </Animate>
        <Animate delay={300}>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 btn-shine"
          >
            Demander un devis maintenant
            <ArrowRight className="w-5 h-5" />
          </button>
        </Animate>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-navy-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg">P</div>
              <div>
                <span className="font-bold text-white text-lg">PIM</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Perfect Industrial Maintenance — Votre partenaire de confiance en maintenance industrielle au Maroc.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors group">
                <Facebook className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors group">
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)} className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((s, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo('services')} className="text-slate-400 hover:text-blue-400 text-sm transition-colors text-left">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+212669177191" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">+212 669 177 191</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:technique@pim.ma" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">technique@pim.ma</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:pim.technique@gmail.com" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">pim.technique@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © 2026 PIM – Perfect Industrial Maintenance. Tous droits réservés.
          </p>
          <p className="text-slate-600 text-xs">
            Maintenance industrielle professionnelle au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
function ScrollToTop() {
  const scrolled = useScrolled(500);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all duration-400 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

/* ============================================================
   APP
   ============================================================ */
export function App() {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <TeamExpertise />
        <Process />
        <Sectors />
        <Stats />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
