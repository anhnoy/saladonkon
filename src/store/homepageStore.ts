import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import sereneRetreats from './img/serene_retreats.jpg';

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  titleColor?: string;
  subtitleColor?: string;
}

export interface SectionContent {
  title: string;
  subtitle: string;
}

interface HomepageState {
  heroSlides: HeroSlide[];
  sections: {
    rooms: SectionContent;
    activities: SectionContent;
  };
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateSection: (section: 'rooms' | 'activities', content: SectionContent) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  removeHeroSlide: (id: string) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void;
  moveHeroSlide: (fromIndex: number, toIndex: number) => void;
}

const defaultHeroSlides: HeroSlide[] = [
 {
  id: '1',
  image: 'https://i.imgur.com/t7MNIJf.jpeg', 
  title: 'French Heritage Villa',
  subtitle: 'Where elegance meets comfort',
  titleColor: '#FFFFFF',
  subtitleColor: '#D4AF37'
},
    {
    id: '2',
    image: 'https://i.imgur.com/nFO3qFX.jpeg',
    title: 'French Studio',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },
      {
    id: '3',
    image: 'https://i.imgur.com/fRWl1xB.jpeg',
    title: 'Floating Studio',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },

    {
    id: '4',
    image: 'https://i.imgur.com/Y1RUwgH.jpeg',
    title: 'Ban din studuo ',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },
    {
    id: '5',
    image: 'https://i.imgur.com/0FHH6gU.jpeg',
    title: 'BAN DELUX',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },
    {
    id: '6',
    image: 'https://i.imgur.com/mcm1xJT.jpeg',
    title: 'Ban Lao Classic',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },
    {
    id: '7',
    image: 'https://i.imgur.com/dkbw5mi.jpeg',
    title: 'Restaurant  ',
    subtitle: 'Where elegance meets comfort',
    titleColor: '#FFFFFF',
    subtitleColor: '#D4AF37'
  },
];

const defaultSections = {
  rooms: {
    title: 'Our SaLaDonKon Accommodations',
    subtitle: 'Experience the perfect blend of traditional elegance and modern comfort in our carefully designed rooms and villas.'
  },
  activities: {
    title: 'Discover Our Experiences',
    subtitle: 'Immerse yourself in authentic cultural experiences and relaxing activities designed to enrich your stay.'
  }
};

export const useHomepageStore = create<HomepageState>()(
  persist(
    (set, get) => ({
      heroSlides: defaultHeroSlides,
      sections: defaultSections,

      updateHeroSlides: (slides) => set({ heroSlides: slides }),

      updateSection: (section, content) => 
        set((state) => ({
          sections: {
            ...state.sections,
            [section]: content
          }
        })),

      addHeroSlide: (slide) => 
        set((state) => ({
          heroSlides: [
            ...state.heroSlides,
            { 
              ...slide, 
              id: Date.now().toString(),
              titleColor: slide.titleColor || '#FFFFFF',
              subtitleColor: slide.subtitleColor || '#FFFFFF'
            }
          ]
        })),

      removeHeroSlide: (id) =>
        set((state) => ({
          heroSlides: state.heroSlides.filter(slide => slide.id !== id)
        })),

      updateHeroSlide: (id, updates) =>
        set((state) => ({
          heroSlides: state.heroSlides.map(slide =>
            slide.id === id ? { ...slide, ...updates } : slide
          )
        })),

      moveHeroSlide: (fromIndex, toIndex) =>
        set((state) => {
          const slides = [...state.heroSlides];
          const [movedSlide] = slides.splice(fromIndex, 1);
          slides.splice(toIndex, 0, movedSlide);
          return { heroSlides: slides };
        })
    }),
    {
      name: 'homepage-storage'
    }
  )
);