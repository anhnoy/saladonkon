export interface TestimonialType {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const testimonialsData: TestimonialType[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    location: 'London, UK',
    rating: 5,
    text: 'Our stay at the Floating Studio was absolutely magical. Waking up to the sound of gentle waves and watching the sunrise from our bed was an experience we\'ll never forget. The attention to detail and personalized service made us feel like royalty.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'The French Heritage Villa exceeded all our expectations. The perfect blend of colonial charm and modern luxury. The private garden was our favorite spot for morning coffee and evening cocktails. The staff remembered our preferences from day one.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Sarah & David Miller',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'We celebrated our anniversary at Luxury Haven and couldn\'t have chosen a better place. The Thai cooking class was a highlight—we still make the recipes at home! The Ban Din Deluxe room was beautifully designed with such attention to local craftsmanship.',
    image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Takashi Yamamoto',
    location: 'Tokyo, Japan',
    rating: 5,
    text: 'As a frequent traveler, I\'ve experienced many luxury hotels, but the level of tranquility and authentic cultural immersion here is unmatched. The meditation session by the water was transformative, and the room\'s design was both elegant and comfortable.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default testimonialsData;