export const menuItems = [
  {
    id: 1,
    category: 'Appetizers',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and parmesan',
    price: 85,
    image: '/images/arancin.avif',
    popular: true,
    dietary: ['vegetarian']
  },
  {
    id: 2,
    category: 'Main Courses',
    name: 'Wagyu Beef Tenderloin',
    description: 'Premium Australian wagyu with seasonal vegetables',
    price: 220,
    image: '/images/wagyu.avif',
    popular: true,
    dietary: ['gluten-free']
  },
  {
    id: 3,
    category: 'Desserts',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla ice cream',
    price: 65,
    image: '/images/souffle.avif',
    popular: true,
    dietary: ['vegetarian']
  },
  {
    id: 4,
    category: 'Main Courses',
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 145,
    image: '/images/salmon.avif',
    popular: false,
    dietary: ['gluten-free', 'pescatarian']
  },
  {
    id: 5,
    category: 'Drinks',
    name: 'Signature Cocktail',
    description: 'House special cocktail with premium spirits',
    price: 75,
    image: '/images/cocktail.jpg',
    popular: true,
    dietary: []
  },
  {
    id: 6,
    category: 'Salads',
    name: 'Kobe Beef Salad',
    description: 'Mixed greens with Kobe beef strips and balsamic glaze',
    price: 120,
    image: '/images/kobe beef salad.jpg',
    popular: false,
    dietary: ['gluten-free']
  }
];

export const galleryImages = [
  { id: 1, src: '/images/interior1.avif', alt: 'Restaurant Interior', featured: true },
  { id: 2, src: '/images/food1.avif', alt: 'Signature Dish', featured: true },
  { id: 3, src: '/images/dining1.avif', alt: 'Dining Area', featured: true },
  { id: 4, src: '/images/bar1.avif', alt: 'Bar Area', featured: false },
  { id: 5, src: '/images/chef.avif', alt: 'Chef Cooking', featured: false },
  { id: 6, src: '/images/lounge.avif', alt: 'Lounge Area', featured: false }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Exceptional dining experience! The Wagyu was perfectly prepared.',
    date: '2026-04-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Outstanding service and atmosphere. Will definitely return.',
    date: '2026-04-10'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    rating: 4,
    comment: 'Beautiful setting and delicious food. Great value for money.',
    date: '2026-04-05'
  }
];