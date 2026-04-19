/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Mail, 
  ChevronRight, 
  Zap, 
  Target, 
  Menu,
  X,
  Send,
  Globe
} from 'lucide-react';

// --- Translations ---

type Language = 'uk' | 'en' | 'ru';

const translations = {
  uk: {
    nav: {
      work: 'Роботи',
      services: 'Послуги',
      about: 'Про мене',
      contact: 'Контакти',
      cta: 'Працювати зі мною',
      startProject: 'Почати проект',
    },
    hero: {
      badge: 'Преміум відеомонтаж та AI креатив',
      title: 'Я СТВОРЮЮ',
      titleAccent: 'КОНТЕНТ',
      titleSuffix: 'ЯКИЙ ПРОДАЄ.',
      description: 'Високоякісний монтаж та AI-генерація, орієнтовані на утримання уваги, гачки та конверсію для топових кріейторів.',
      ctaPrimary: 'Дивитись шоуріл',
      ctaSecondary: 'Працювати зі мною',
      featured: 'Досвід 5+ років',
    },
    stats: {
      expertiseLabel: 'Експертиза',
      expertiseTitle: 'Senior Video Editor / Motion Designer / AI Specialist',
      expertiseTags: ['Reels', 'VFX', 'Motion', 'AI Video', 'UGC AI', 'AI Long Video'],
      performanceLabel: 'Ефективність',
      performanceStat: '92%',
      performanceDesc: 'Середній рівень утримання',
      connectLabel: 'Зв\'язок',
      connectText: 'Давайте створимо щось, що приносить гроші.',
    },
    portfolio: {
      subtitle: 'Приклади успіху',
      title: 'ОБРАНІ РОБОТИ',
      viewProject: 'Переглянути кейс',
      seeAll: 'Всі проекти',
      processLabel: 'Процес',
      storyboardLabel: 'Сторіборд / Мудборд',
      timelineLabel: 'Timeline в After Effects',
      items: [
        { title: 'Long-Form YouTube Edit', category: 'Long Video', result: 'Довгі відео з моушен-графікою, утриманням уваги та сильним візуальним ритмом для YouTube-формату.', video: '/portfolio/longform/longform-youtube.mp4', videos: ['/portfolio/longform/longform-youtube.mp4', '/portfolio/longform/longform-youtube-2.mp4', '/portfolio/longform/longform-youtube-3.mp4'] },
        { title: 'Luxury Real Estate', category: 'Реклама', result: 'Синематичний сторітеллінг для просування дорогої нерухомості.' },
        { title: 'Motion Graphics Reel', category: 'Motion', result: 'Динамічний моушен-ріл із сильною графікою, ритмом та акцентом на візуальний імпакт.', video: '/portfolio/motion/motion-reel.mp4', videos: ['/portfolio/motion/motion-reel.mp4', '/portfolio/motion/motion-policore.mp4'] },
        { 
          title: 'Balenciaga AI Film', 
          category: 'AI Відео', 
          result: 'AI fashion concept із storyboard-підходом, кінематографічним монтажем та VFX-таймлайнами в After Effects.',
          hasCaseStudy: true,
          video: '/portfolio/balenciaga/balenciaga.mp4',
          videos: ['/portfolio/balenciaga/balenciaga.mp4', '/portfolio/pixar/pixar.mp4', '/portfolio/varus/varus.mp4'],
          process: {
            storyboard: '/portfolio/balenciaga/storyboard.png',
            extraStoryboards: [
              '/portfolio/pixar/storyboard-1.png'
            ],
            thirdStoryboards: [
              '/portfolio/varus/storyboard-1.png'
            ],
            timelines: [
              '/portfolio/balenciaga/timeline-1.png',
              '/portfolio/balenciaga/timeline-2.png',
              '/portfolio/balenciaga/timeline-3.jpg'
            ]
          }
        }
      ]
    },
    services: {
      subtitle: 'Можливості',
      title: 'ЯК Я ЗАБЕЗПЕЧУЮ ROI',
      items: [
        {
          title: 'Viral Short Form',
          desc: 'Спроектовано для утримання. Reels та TikTok, які домінують у стрічці та приносять божевільні метрики.',
          features: ['Майстерність HOOK', 'Надшвидкі склейки', 'Саунд-дизайн']
        },
        {
          title: 'YouTube Production',
          desc: 'Стратегічне керування довгим контентом. Монтаж з високим утриманням, що будує довіру та спільноту.',
          features: ['Сюжетні арки', 'Набори Gfx', 'A/B тестування']
        },
        {
          title: 'AI Generation',
          desc: 'Працюю з Kling, Nano Banana Pro, Heygen, ElevenLabs та Seedance 2.0 для створення AI-відео, голосу та візуалів production-рівня.',
          features: ['Kling', 'Nano Banana Pro', 'Heygen', 'ElevenLabs', 'Seedance 2.0']
        }
      ]
    },
    contact: {
      subtitle: 'Колаборація',
      title: 'ГОТОВІ МАСШТАБУВАТИ ВАШ КОНТЕНТ?',
      desc: 'Наразі приймаю 2-3 нових партнерства високого рівня. Розкажіть про ваші цілі та поточний обсяг.',
      form: {
        name: 'Ваше ім\'я',
        email: 'Email адреса',
        details: 'Деталі проекту',
        submit: 'Надіслати запит'
      }
    },
    footer: {
      rights: '© 2026 МАКСИМ ПОПОВИЧ. ВСІ ПРАВА ЗАХИЩЕНІ.'
    }
  },
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      cta: 'Work with me',
      startProject: 'Start Project',
    },
    hero: {
      badge: 'Premium Video Editing & AI Creation',
      title: 'I CREATE',
      titleAccent: 'CONTENT',
      titleSuffix: 'THAT SELLS.',
      description: 'High-end video editing and AI generation focused on retention, hooks, and conversion for top-tier creators.',
      ctaPrimary: 'View Showreel',
      ctaSecondary: 'Work with me',
      featured: '5+ years of experience',
    },
    stats: {
      expertiseLabel: 'Expertise',
      expertiseTitle: 'Senior Video Editor / Motion Designer / AI Specialist',
      expertiseTags: ['Reels', 'VFX', 'Motion', 'AI Video', 'UGC AI', 'AI Long Video'],
      performanceLabel: 'Performance',
      performanceStat: '92%',
      performanceDesc: 'Avg. Retention Rate',
      connectLabel: 'Connect',
      connectText: 'Let\'s build something that makes money.',
    },
    portfolio: {
      subtitle: 'Success Cases',
      title: 'SELECTED WORK',
      viewProject: 'View Case Study',
      seeAll: 'See All Projects',
      processLabel: 'The Process',
      storyboardLabel: 'Storyboard / Moodboard',
      timelineLabel: 'After Effects Timeline',
      items: [
        { title: 'Long-Form YouTube Edit', category: 'Long Video', result: 'Long-form YouTube edits with motion graphics, strong pacing, and retention-focused storytelling.', video: '/portfolio/longform/longform-youtube.mp4', videos: ['/portfolio/longform/longform-youtube.mp4', '/portfolio/longform/longform-youtube-2.mp4', '/portfolio/longform/longform-youtube-3.mp4'] },
        { title: 'Luxury Real Estate', category: 'Ads', result: 'Cinematic storytelling for high-ticket asset promotion.' },
        { title: 'Motion Graphics Reel', category: 'Motion', result: 'A high-energy motion reel with strong graphics, pace, and a clear visual punch.', video: '/portfolio/motion/motion-reel.mp4', videos: ['/portfolio/motion/motion-reel.mp4', '/portfolio/motion/motion-policore.mp4'] },
        { 
          title: 'Balenciaga AI Film', 
          category: 'AI Video', 
          result: 'An AI fashion concept built with a storyboard-first process, cinematic editing, and polished VFX timelines in After Effects.',
          hasCaseStudy: true,
          video: '/portfolio/balenciaga/balenciaga.mp4',
          videos: ['/portfolio/balenciaga/balenciaga.mp4', '/portfolio/pixar/pixar.mp4', '/portfolio/varus/varus.mp4'],
          process: {
            storyboard: '/portfolio/balenciaga/storyboard.png',
            extraStoryboards: [
              '/portfolio/pixar/storyboard-1.png'
            ],
            thirdStoryboards: [
              '/portfolio/varus/storyboard-1.png'
            ],
            timelines: [
              '/portfolio/balenciaga/timeline-1.png',
              '/portfolio/balenciaga/timeline-2.png',
              '/portfolio/balenciaga/timeline-3.jpg'
            ]
          }
        }
      ]
    },
    services: {
      subtitle: 'Capabilities',
      title: 'HOW I DELIVER ROI',
      items: [
        {
          title: 'Viral Short Form',
          desc: 'Engineered for retention. Reels and TikToks that dominate the FYP and drive insane metrics.',
          features: ['HOOK Mastery', 'Sub-Second Cuts', 'Sound Design']
        },
        {
          title: 'YouTube Production',
          desc: 'Strategic long-form management. High-retention editing that builds community and trust.',
          features: ['Story Arcs', 'Gfx Sets', 'A/B Testing']
        },
        {
          title: 'AI Generation',
          desc: 'Working with Kling, Nano Banana Pro, Heygen, ElevenLabs, and Seedance 2.0 to create production-grade AI video, voice, and visuals.',
          features: ['Kling', 'Nano Banana Pro', 'Heygen', 'ElevenLabs', 'Seedance 2.0']
        }
      ]
    },
    contact: {
      subtitle: 'Collab',
      title: 'READY TO SCALE YOUR CONTENT?',
      desc: 'Currently accepting 2-3 new high-level partnerships. Tell me about your goals and current volume.',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        details: 'Project Details',
        submit: 'Send Inquiry'
      }
    },
    footer: {
      rights: '© 2026 MAKSYM POPOVYCH. ALL RIGHTS RESERVED.'
    }
  },
  ru: {
    nav: {
      work: 'Работы',
      services: 'Услуги',
      about: 'Обо мне',
      contact: 'Контакты',
      cta: 'Работать со мной',
      startProject: 'Начать проект',
    },
    hero: {
      badge: 'Премиум видеомонтаж и AI креатив',
      title: 'Я СОЗДАЮ',
      titleAccent: 'КОНТЕНТ',
      titleSuffix: 'КОТОРЫЙ ПРОДАЁТ.',
      description: 'Высококачественный монтаж и AI-генерация, ориентированные на удержание внимания, сильные хуки и конверсию для топовых креаторов.',
      ctaPrimary: 'Смотреть шоурил',
      ctaSecondary: 'Работать со мной',
      featured: 'Опыт 5+ лет',
    },
    stats: {
      expertiseLabel: 'Экспертиза',
      expertiseTitle: 'Senior Video Editor / Motion Designer / AI Specialist',
      expertiseTags: ['Reels', 'VFX', 'Motion', 'AI Video', 'UGC AI', 'AI Long Video'],
      performanceLabel: 'Эффективность',
      performanceStat: '92%',
      performanceDesc: 'Средний уровень удержания',
      connectLabel: 'Связь',
      connectText: 'Давайте создадим что-то, что приносит деньги.',
    },
    portfolio: {
      subtitle: 'Примеры успеха',
      title: 'ИЗБРАННЫЕ РАБОТЫ',
      viewProject: 'Открыть кейс',
      seeAll: 'Все проекты',
      processLabel: 'Процесс',
      storyboardLabel: 'Сториборд / Мудборд',
      timelineLabel: 'Timeline в After Effects',
      items: [
        { title: 'Long-Form YouTube Edit', category: 'Long Video', result: 'Длинные видео с моушен-графикой, удержанием внимания и сильным визуальным ритмом для YouTube-формата.', video: '/portfolio/longform/longform-youtube.mp4', videos: ['/portfolio/longform/longform-youtube.mp4', '/portfolio/longform/longform-youtube-2.mp4', '/portfolio/longform/longform-youtube-3.mp4'] },
        { title: 'Luxury Real Estate', category: 'Реклама', result: 'Кинематографичный сторителлинг для продвижения дорогой недвижимости.' },
        { title: 'Motion Graphics Reel', category: 'Motion', result: 'Динамичный моушен-рил с сильной графикой, ритмом и акцентом на визуальный импакт.', video: '/portfolio/motion/motion-reel.mp4', videos: ['/portfolio/motion/motion-reel.mp4', '/portfolio/motion/motion-policore.mp4'] },
        {
          title: 'Balenciaga AI Film',
          category: 'AI Видео',
          result: 'AI fashion concept со storyboard-подходом, кинематографичным монтажом и VFX-таймлайнами в After Effects.',
          hasCaseStudy: true,
          video: '/portfolio/balenciaga/balenciaga.mp4',
          videos: ['/portfolio/balenciaga/balenciaga.mp4', '/portfolio/pixar/pixar.mp4', '/portfolio/varus/varus.mp4'],
          process: {
            storyboard: '/portfolio/balenciaga/storyboard.png',
            extraStoryboards: [
              '/portfolio/pixar/storyboard-1.png'
            ],
            thirdStoryboards: [
              '/portfolio/varus/storyboard-1.png'
            ],
            timelines: [
              '/portfolio/balenciaga/timeline-1.png',
              '/portfolio/balenciaga/timeline-2.png',
              '/portfolio/balenciaga/timeline-3.jpg'
            ]
          }
        }
      ]
    },
    services: {
      subtitle: 'Возможности',
      title: 'КАК Я ОБЕСПЕЧИВАЮ ROI',
      items: [
        {
          title: 'Viral Short Form',
          desc: 'Контент, спроектированный под удержание. Reels и TikTok, которые доминируют в ленте и дают мощные метрики.',
          features: ['HOOK Mastery', 'Быстрый монтаж', 'Sound Design']
        },
        {
          title: 'YouTube Production',
          desc: 'Стратегическая работа с длинным контентом. Монтаж с высоким удержанием, который строит доверие и сообщество.',
          features: ['Сюжетные арки', 'Gfx наборы', 'A/B тесты']
        },
        {
          title: 'AI Generation',
          desc: 'Работаю с Kling, Nano Banana Pro, Heygen, ElevenLabs и Seedance 2.0 для создания AI-видео, голоса и visual-активов production-уровня.',
          features: ['Kling', 'Nano Banana Pro', 'Heygen', 'ElevenLabs', 'Seedance 2.0']
        }
      ]
    },
    contact: {
      subtitle: 'Коллаб',
      title: 'ГОТОВЫ МАСШТАБИРОВАТЬ ВАШ КОНТЕНТ?',
      desc: 'Сейчас беру 2-3 новых сильных партнёрства. Расскажите о ваших целях и текущем объёме контента.',
      form: {
        name: 'Ваше имя',
        email: 'Email адрес',
        details: 'Детали проекта',
        submit: 'Отправить запрос'
      }
    },
    footer: {
      rights: '© 2026 MAKSYM POPOVYCH. ВСЕ ПРАВА ЗАЩИЩЕНЫ.'
    }
  }
};

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.work, href: '#portfolio' },
    { name: t.services, href: '#services' },
    { name: t.about, href: '#about' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-6' : 'py-10'}`}>
      <div className="container mx-auto px-10 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter cursor-pointer uppercase text-theme-accent"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ZAURAN
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[12px] uppercase tracking-[2px] font-semibold text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-2 frosted-glass px-4 py-2 rounded-full text-[10px] font-bold">
            <Globe size={14} className="text-theme-accent" />
            <button 
              onClick={() => setLang('uk')}
              className={`transition-colors uppercase tracking-widest ${lang === 'uk' ? 'text-white' : 'text-white/30'}`}
            >
              UA
            </button>
            <span className="opacity-20">/</span>
            <button 
              onClick={() => setLang('en')}
              className={`transition-colors uppercase tracking-widest ${lang === 'en' ? 'text-white' : 'text-white/30'}`}
            >
              EN
            </button>
            <span className="opacity-20">/</span>
            <button 
              onClick={() => setLang('ru')}
              className={`transition-colors uppercase tracking-widest ${lang === 'ru' ? 'text-white' : 'text-white/30'}`}
            >
              RU
            </button>
          </div>

          <motion.a 
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center gap-2 bg-theme-accent text-white px-8 py-4 rounded-full font-bold text-sm tracking-tight hover:scale-105 transition-all active:scale-95 shadow-xl shadow-theme-accent/20"
          >
            {t.cta}
          </motion.a>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 frosted-glass rounded-2xl p-8 flex flex-col gap-8 md:hidden z-50 overflow-hidden"
          >
            <div className="flex items-center justify-center gap-4 py-2 border-b border-white/10">
              <button 
                onClick={() => setLang('uk')}
                className={`text-sm font-bold uppercase tracking-widest ${lang === 'uk' ? 'text-theme-accent' : 'text-white/40'}`}
              >
                Ukrainian
              </button>
              <span className="opacity-20">|</span>
              <button 
                onClick={() => setLang('en')}
                className={`text-sm font-bold uppercase tracking-widest ${lang === 'en' ? 'text-theme-accent' : 'text-white/40'}`}
              >
                English
              </button>
              <span className="opacity-20">|</span>
              <button 
                onClick={() => setLang('ru')}
                className={`text-sm font-bold uppercase tracking-widest ${lang === 'ru' ? 'text-theme-accent' : 'text-white/40'}`}
              >
                Russian
              </button>
            </div>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-bold tracking-tight uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="bg-theme-accent text-white text-center py-4 rounded-xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.startProject}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, align = 'left' }: { children: React.ReactNode, subtitle?: string, align?: 'left' | 'center' }) => (
  <div className={`mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: true }}
        className="text-[11px] uppercase tracking-[2px] font-bold mb-4 opacity-50"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-bold tracking-tighter"
    >
      {children}
    </motion.h2>
  </div>
);

const AnimatedPercentage = ({ value }: { value: string }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetValue = Number.parseInt(value, 10);
    if (Number.isNaN(targetValue)) {
      return;
    }

    let frameId = 0;
    let hasAnimated = false;

    const animateCounter = () => {
      const startedAt = performance.now();
      const durationMs = 1600;

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / durationMs, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(targetValue * easedProgress));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <p ref={containerRef} className="text-5xl font-bold tracking-tighter text-theme-accent">
      {displayValue}%
    </p>
  );
};

const ProjectCard = ({ title, category, image, video, videos, result, btnText, onClick }: { title: string, category: string, image: string, video?: string, videos?: string[], result: string, btnText: string, onClick?: () => void }) => {
  const playlistVideos = videos && videos.length > 0 ? videos : (video ? [video] : []);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [video, videos]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative h-[500px] overflow-hidden rounded-[20px] cursor-pointer border border-white/10"
    >
      {playlistVideos.length > 0 ? (
        <video 
          key={`${title}-${activeVideoIndex}`}
          src={playlistVideos[activeVideoIndex]}
          poster={image}
          autoPlay
          muted
          loop={playlistVideos.length <= 1}
          playsInline
          onEnded={() => {
            if (playlistVideos.length > 1) {
              setActiveVideoIndex((currentIndex) => (currentIndex + 1) % playlistVideos.length);
            }
          }}
          className="h-full w-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105"
        />
      ) : (
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="absolute bottom-6 left-6 right-6 frosted-glass p-6 rounded-[12px] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">{category}</span>
          <span className="text-white hover:translate-x-1 transition-transform"><ChevronRight size={16} /></span>
        </div>
        <h3 className="text-xl font-bold tracking-tight mb-2">{title}</h3>
        <p className="text-[13px] text-white/60 leading-tight">
          {result}
        </p>
        <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-theme-accent opacity-0 group-hover:opacity-100 transition-opacity">
          {btnText}
        </div>
      </div>
      <div className="absolute top-6 left-6">
        <div className="px-3 py-1.5 frosted-glass rounded-[8px] text-[10px] font-bold uppercase tracking-widest">
          {category}
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudyModal = ({ project, onClose, t }: { project: any, onClose: () => void, t: any }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (!project) return null;

  const projectVideos = project.videos && project.videos.length > 0
    ? project.videos
    : project.video
      ? [project.video]
      : [];

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [project]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="branded-scrollbar relative w-full max-w-6xl max-h-[90vh] frosted-glass rounded-[32px] overflow-y-auto border border-white/10"
        >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full frosted-glass flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-16">
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[3px] font-bold opacity-40 mb-4 inline-block">{project.category}</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h2>
            <p className="text-xl text-white/60 max-w-2xl">{project.result}</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 mb-16 bg-black">
            <video 
              key={`${project.title}-${activeVideoIndex}`}
              src={projectVideos[activeVideoIndex]} 
              controls 
              onEnded={() => {
                if (projectVideos.length > 1) {
                  setActiveVideoIndex((currentIndex) => (currentIndex + 1) % projectVideos.length);
                }
              }}
              className="w-full aspect-video"
            />
          </div>

          {projectVideos.length > 1 && (
            <div className="mb-16">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-4">More videos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectVideos.map((projectVideo: string, index: number) => (
                <button
                  key={projectVideo}
                  type="button"
                  onClick={() => setActiveVideoIndex(index)}
                  className={`group relative overflow-hidden rounded-2xl border transition-all ${
                    activeVideoIndex === index
                      ? 'border-theme-accent shadow-[0_0_0_1px_rgba(0,163,255,0.35)]'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <video
                    src={projectVideo}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="h-32 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3">
                    <span className="text-[11px] font-bold uppercase tracking-[2px] text-white">
                      Video {index + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-[2px] ${
                      activeVideoIndex === index ? 'text-theme-accent' : 'text-white/60 group-hover:text-white'
                    }`}>
                      {activeVideoIndex === index ? 'Playing' : 'Open'}
                    </span>
                  </div>
                </button>
              ))}
              </div>
            </div>
          )}

          {project.process && (
            <div className="space-y-20">
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-theme-accent" /> {t.processLabel}
                </h3>
                
                <div className="space-y-8">
                  {activeVideoIndex === 0 && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">{t.storyboardLabel}</p>
                      <div className="rounded-xl overflow-hidden border border-white/5">
                        <img src={project.process.storyboard} alt="Storyboard" className="w-full h-auto" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  )}

                  {activeVideoIndex === 1 && project.process.extraStoryboards && project.process.extraStoryboards.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Additional Storyboards</p>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {project.process.extraStoryboards.map((img: string, idx: number) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-white/5 bg-black/40">
                            <img src={img} alt={`Storyboard extra ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeVideoIndex === 2 && project.process.thirdStoryboards && project.process.thirdStoryboards.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">Additional Storyboards</p>
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {project.process.thirdStoryboards.map((img: string, idx: number) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-white/5 bg-black/40">
                            <img src={img} alt={`Storyboard extra ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeVideoIndex === 0 && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">{t.timelineLabel}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {project.process.timelines.map((img: string, idx: number) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-white/5 bg-black/40">
                            <img src={img} alt={`AE Timeline ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="frosted-glass p-10 rounded-[16px] flex flex-col justify-between group h-full"
  >
    <div>
      <h3 className="text-[11px] uppercase tracking-[1.5px] opacity-50 mb-4">{title}</h3>
      <p className="text-[20px] font-semibold leading-tight mb-8 group-hover:text-white transition-colors">
        {description}
      </p>
    </div>
    <div className="flex flex-wrap gap-2">
      {features.map((f) => (
        <span key={f} className="inline-block bg-white/10 px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest">
          {f}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('uk');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeBackgroundLayer, setActiveBackgroundLayer] = useState(0);
  const backgroundLayerARef = useRef<HTMLVideoElement | null>(null);
  const backgroundLayerBRef = useRef<HTMLVideoElement | null>(null);
  const activeBackgroundLayerRef = useRef(0);
  const isBackgroundTransitioningRef = useRef(false);
  
  useEffect(() => {
    // Auto-detection logic
    const userLang = navigator.language.toLowerCase();
    if (userLang.startsWith('en')) {
      setLang('en');
    } else if (userLang.startsWith('ru')) {
      setLang('ru');
    } else {
      setLang('uk');
    }
  }, []);

  useEffect(() => {
    activeBackgroundLayerRef.current = activeBackgroundLayer;
  }, [activeBackgroundLayer]);

  useEffect(() => {
    const backgroundVideos = [backgroundLayerARef.current, backgroundLayerBRef.current].filter(
      Boolean,
    ) as HTMLVideoElement[];
    if (backgroundVideos.length !== 2) {
      return;
    }

    const crossfadeDurationSeconds = 1.4;
    const resetDelayMs = 900;
    let animationFrameId = 0;
    let resetTimerId: number | null = null;

    const ensurePlayback = (video: HTMLVideoElement) => {
      video.muted = true;
      video.playsInline = true;
      void video.play().catch(() => undefined);
    };

    backgroundVideos.forEach(ensurePlayback);
    backgroundVideos[1].pause();
    backgroundVideos[1].currentTime = 0;

    const tick = () => {
      const activeIndex = activeBackgroundLayerRef.current;
      const activeVideo = backgroundVideos[activeIndex];
      const nextVideo = backgroundVideos[activeIndex === 0 ? 1 : 0];

      if (
        activeVideo.duration &&
        Number.isFinite(activeVideo.duration) &&
        !isBackgroundTransitioningRef.current
      ) {
        const timeRemaining = activeVideo.duration - activeVideo.currentTime;

        if (timeRemaining <= crossfadeDurationSeconds) {
          isBackgroundTransitioningRef.current = true;
          nextVideo.currentTime = 0;
          ensurePlayback(nextVideo);
          setActiveBackgroundLayer(activeIndex === 0 ? 1 : 0);

          resetTimerId = window.setTimeout(() => {
            activeVideo.pause();
            activeVideo.currentTime = 0;
            isBackgroundTransitioningRef.current = false;
          }, resetDelayMs);
        }
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (resetTimerId !== null) {
        window.clearTimeout(resetTimerId);
      }
    };
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen relative overflow-x-hidden isolate">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={backgroundLayerARef}
          className={`hero-background-video ${activeBackgroundLayer === 0 ? 'hero-background-video-visible' : 'hero-background-video-hidden'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/media/hero-background.mp4" type="video/mp4" />
        </video>
        <video
          ref={backgroundLayerBRef}
          className={`hero-background-video ${activeBackgroundLayer === 1 ? 'hero-background-video-visible' : 'hero-background-video-hidden'}`}
          muted
          playsInline
          preload="auto"
        >
          <source src="/media/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-background-vignette" />
        <div className="hero-background-morph" />
        <div className="hero-background-tail" />
        <div className="hero-background-fade" />
      </div>

      <div className="page-atmosphere fixed inset-0 z-[1] pointer-events-none" />

      <div className="floating-space pointer-events-none">
        <img
          src="/floating/floating-after-effects.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--ae"
        />
        <img
          src="/floating/floating-premiere.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--pr"
        />
        <img
          src="/floating/floating-after-effects.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--ae-sm"
        />
        <img
          src="/floating/floating-premiere.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--pr-sm"
        />
        <img
          src="/floating/floating-after-effects.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--ae-far"
        />
        <img
          src="/floating/floating-premiere.png"
          alt=""
          aria-hidden="true"
          className="floating-space__asset floating-space__asset--pr-far"
        />
      </div>

      {/* Glow Corner Background Effect */}
      <div className="fixed top-[-10%] left-[-5%] w-[60%] h-[60%] glow-corner z-[2] pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} />

        <AnimatePresence>
          {selectedProject && (
            <CaseStudyModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
              t={t.portfolio}
            />
          )}
        </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-stage relative h-screen flex items-center md:items-end md:pb-32 overflow-hidden px-10">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-2 frosted-glass rounded-full text-[10px] uppercase tracking-[4px] font-bold text-white/40 mb-8">
                {t.hero.badge}
              </div>
              <h1 className="text-[clamp(3.4rem,13vw,5.6rem)] md:text-[110px] font-bold text-white tracking-[-0.025em] leading-[1.04] md:leading-[1.02] mb-8">
                {t.hero.title}<br /><span className="text-electric">{t.hero.titleAccent}</span><br />{t.hero.titleSuffix}
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-sm mb-10 leading-relaxed font-medium">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#portfolio"
                  className="bg-theme-accent text-white px-10 py-5 rounded-full font-bold text-sm tracking-tight hover:scale-105 transition-all shadow-xl shadow-theme-accent/20 flex items-center gap-2"
                >
                  {t.hero.ctaPrimary} <Play size={16} fill="white" />
                </a>
                <a 
                  href="#contact"
                  className="px-10 py-5 frosted-glass rounded-full font-bold text-sm tracking-tight hover:bg-white/10 transition-all"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex relative h-[500px] items-center justify-center"
            >
              <div className="hero-portrait-shell">
                <div className="hero-portrait-orbit hero-portrait-orbit-a" />
                <div className="hero-portrait-orbit hero-portrait-orbit-b" />
                <div className="hero-portrait-glow" />

                <div className="hero-portrait-frame">
                  <img 
                    src="/hero/maksym-portrait.jpg" 
                    alt="Maksym Popovych portrait" 
                    className="hero-portrait-image"
                  />
                </div>

                <div className="hero-portrait-badge frosted-glass">
                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">AI Editor</span>
                  <span className="text-sm font-semibold tracking-tight text-white">Maksym Popovych</span>
                </div>

                <div className="hero-portrait-accent frosted-glass">
                  <div className="hero-portrait-accent-dot" />
                  <span>{t.hero.featured}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 hidden md:flex flex-col items-center gap-4 opacity-20">
          <div className="text-[10px] font-bold uppercase tracking-[4px] rotate-90 translate-y-20">Scroll</div>
          <div className="w-[1px] h-20 bg-white" />
        </div>

      </section>

      {/* Bento Stats / About Section */}
      <section id="about" className="relative pt-20 md:pt-24 pb-20 md:pb-32 px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 frosted-glass p-10 rounded-[20px] h-60 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-[11px] uppercase tracking-[2.5px] font-bold opacity-30 mb-2">{t.stats.expertiseLabel}</h3>
                <p className="text-2xl font-semibold tracking-tight leading-tight">{t.stats.expertiseTitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.stats.expertiseTags.map(tag => (
                  <span key={tag} className="bg-white/10 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="frosted-glass p-10 rounded-[20px] h-60 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-[11px] uppercase tracking-[2.5px] font-bold opacity-30 mb-2">{t.stats.performanceLabel}</h3>
                <AnimatedPercentage value={t.stats.performanceStat} />
                <p className="text-sm opacity-50 mt-1">{t.stats.performanceDesc}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="frosted-glass p-10 rounded-[20px] h-60 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-[11px] uppercase tracking-[2.5px] font-bold opacity-30 mb-2">{t.stats.connectLabel}</h3>
                <p className="text-xl font-semibold tracking-tight leading-tight">{t.stats.connectText}</p>
              </div>
              <a href="#contact" className="text-[12px] font-bold underline opacity-80 hover:opacity-100 transition-opacity truncate">1maksim.popovitch1@gmail.com</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-10">
        <div className="container mx-auto">
          <SectionHeading subtitle={t.portfolio.subtitle}>{t.portfolio.title}</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProjectCard 
                title={t.portfolio.items[0].title}
                category={t.portfolio.items[0].category}
                result={t.portfolio.items[0].result}
                image="https://picsum.photos/seed/performance/1200/800"
                video={t.portfolio.items[0].video}
                btnText={t.portfolio.viewProject}
                onClick={() => setSelectedProject(t.portfolio.items[0])}
              />
            </div>
            <ProjectCard 
              title={t.portfolio.items[1].title}
              category={t.portfolio.items[1].category}
              result={t.portfolio.items[1].result}
              image="https://picsum.photos/seed/dubai/600/1000"
              btnText={t.portfolio.viewProject}
            />
            <ProjectCard 
              title={t.portfolio.items[2].title}
              category={t.portfolio.items[2].category}
              result={t.portfolio.items[2].result}
              image="https://picsum.photos/seed/setup/600/1000"
              video={t.portfolio.items[2].video}
              btnText={t.portfolio.viewProject}
              onClick={() => setSelectedProject(t.portfolio.items[2])}
            />
            <div className="lg:col-span-2">
              <ProjectCard 
                title={t.portfolio.items[3].title}
                category={t.portfolio.items[3].category}
                result={t.portfolio.items[3].result}
                image={t.portfolio.items[3].process.storyboard}
                video={t.portfolio.items[3].video}
                btnText={t.portfolio.viewProject}
                onClick={() => setSelectedProject(t.portfolio.items[3])}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-10">
        <div className="container mx-auto">
          <SectionHeading subtitle={t.services.subtitle} align="center">{t.services.title}</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.services.items.map(item => (
              <ServiceCard 
                key={item.title}
                title={item.title}
                description={item.desc}
                features={item.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-10">
        <div className="container mx-auto">
          <div className="frosted-glass rounded-[40px] overflow-hidden p-10 md:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <SectionHeading subtitle={t.contact.subtitle}>{t.contact.title}</SectionHeading>
                <p className="text-xl text-white/50 mb-12 max-w-md">
                  {t.contact.desc}
                </p>
                <div className="space-y-6">
                  <a href="mailto:1maksim.popovitch1@gmail.com" className="flex items-center gap-6 text-lg md:text-xl font-bold hover:text-white/60 transition-colors truncate">
                    <div className="shrink-0 w-12 h-12 rounded-full frosted-glass flex items-center justify-center"><Mail size={20} /></div>
                    1maksim.popovitch1@gmail.com
                  </a>
                  <a href="https://t.me/lmakspvl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 text-lg md:text-xl font-bold hover:text-white/60 transition-colors">
                    <div className="shrink-0 w-12 h-12 rounded-full frosted-glass flex items-center justify-center"><Send size={20} /></div>
                    @lmakspvl
                  </a>
                </div>
              </div>

              <form className="space-y-6">
                <input 
                  type="text" 
                  placeholder={t.contact.form.name} 
                  className="w-full frosted-glass rounded-xl px-8 py-5 outline-none focus:bg-white/10 transition-all font-bold"
                />
                <input 
                  type="email" 
                  placeholder={t.contact.form.email} 
                  className="w-full frosted-glass rounded-xl px-8 py-5 outline-none focus:bg-white/10 transition-all font-bold"
                />
                <textarea 
                  rows={4} 
                  placeholder={t.contact.form.details} 
                  className="w-full frosted-glass rounded-xl px-8 py-5 outline-none focus:bg-white/10 transition-all font-bold resize-none"
                />
                <button className="w-full py-6 bg-theme-accent text-white rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-theme-accent/10">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="py-12 border-t border-white/5 px-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-white/20 text-xs font-bold uppercase tracking-[2px]">
              {t.footer.rights}
            </p>
            <div className="flex gap-8 text-white/20 text-[10px] font-bold uppercase tracking-[2px]">
              <a href="#portfolio" className="hover:text-white transition-all">{t.nav.work}</a>
              <a href="#about" className="hover:text-white transition-all">{t.nav.about}</a>
              <a href="#contact" className="hover:text-white transition-all">{t.nav.contact}</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
