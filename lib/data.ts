import type { StaticImageData } from "next/image";
import espressoPng from "@/espresso.png";
import lattePng from "@/latte.png";
import cappuccinoPng from "@/cappuccino.png";
import coldBrewPng from "@/cold-brew.png";
import lemonIcedTeaPng from "@/lemon-iced-tea.png";
export const tiles = [
  {
    eyebrow: "Seasonal",
    title: "Plum Almond Galette",
    body: "Late-summer stone fruit, marzipan frangipane, flaky laminated crust.",
    href: "#",
    image: "/home/plum-almond-galette.png",
  },
  {
    eyebrow: "Subscription",
    title: "Bread CSA",
    body: "Weekly country loaf + pastry of the week. Pause anytime.",
    href: "#",
    image: "/home/bread-csa.png",
  },
  {
    eyebrow: "Learn",
    title: "Sourdough Class",
    body: "Hands-on workshop: starter care, shaping, baking.",
    href: "#",
    image: "/home/sourdough-class.png",
  },
  {
    eyebrow: "Events",
    title: "Catering & Custom",
    body: "Tiered packages, whole cakes, sandwich platters.",
    href: "#",
    image: "/home/catering-custom.png",
  },
];

export const locations = [
  {
    id: "me-tri-ha",
    name: "Mễ Trì Hạ Location",
    address: "123 Phố Mễ Trì Hạ, Phường Mễ Trì, Quận Nam Từ Liêm",
    city: "Hà Nội",
    state: "",
    zipCode: "100000",
    country: "Việt Nam",
    phone: "+84 24 1234 5678",
    email: "metriha@bakery.com",
    hours: {
      monday: "7:00 AM - 9:00 PM",
      tuesday: "7:00 AM - 9:00 PM",
      wednesday: "7:00 AM - 9:00 PM", 
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 9:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    services: ["Dine-in", "Takeout", "Delivery", "Catering"],
    isMainLocation: true,
    coordinates: {
      lat: 21.0138901,
      lng: 105.7812791
    }
  }
];

export const nav = [
  { 
    name: "Menu", 
    href: "#",
    submenu: [
      { name: "BREAD", href: "/menu/bread", description: "Bánh mì & pastry" },
      { name: "BRUNCH", href: "/menu/brunch", description: "Sandwich & pasta lạnh" },
      { name: "CAKE", href: "/menu/cake", description: "Bánh kem size S" },
      { name: "COOKIES", href: "/menu/cookies", description: "Cookies & sable" },
      { name: "DESSERT", href: "/menu/dessert", description: "Tráng miệng" },
      { name: "MACAROON", href: "/menu/macaroon", description: "Macaroon cỡ lớn" },
      { name: "BEVERAGES", href: "/menu/beverages", description: "Coffee, tea & more" }
    ]
  },
  { 
    name: "Order", 
    href: "#",
    submenu: [
      { name: "Online Ordering", href: "#", description: "Order ahead for pickup" },
      { name: "Catering", href: "#", description: "Large orders and event planning" },
      { name: "Subscription", href: "#", description: "Weekly bread delivery service" }
    ]
  },
  { name: "Locations", href: "/locations" },
  { 
    name: "Our Story", 
    href: "#",
    submenu: [
      { name: "About Us", href: "#", description: "Our mission and values" },
      { name: "The Team", href: "#", description: "Meet our bakers and staff" },
      { name: "Sustainability", href: "#", description: "Our commitment to the environment" }
    ]
  },
  { 
    name: "Classes", 
    href: "#",
    submenu: [
      { name: "Bread Making", href: "#", description: "Learn sourdough and artisan techniques" },
      { name: "Pastry Workshop", href: "#", description: "Master croissants and laminated dough" },
      { name: "Private Classes", href: "#", description: "Custom workshops for groups" }
    ]
  },
  { name: "Wholesale", href: "#" },
  { name: "Gift Cards", href: "#" },
];

export type Beverage = {
  id: string;
  name: string;
  description?: string;
  price: number; // USD dollars
  image?: string | StaticImageData; // public path or static import
};

export const beverages: Beverage[] = [
  { id: "espresso", name: "Espresso", description: "Double shot", price: 3.5, image: espressoPng },
  { id: "latte", name: "Latte", description: "With steamed milk", price: 4.5, image: lattePng },
  { id: "cappuccino", name: "Cappuccino", description: "Foamy and balanced", price: 4.5, image: cappuccinoPng },
  { id: "cold-brew", name: "Cold Brew", description: "Slow steeped", price: 4.0, image: coldBrewPng },
  { id: "lemon-iced-tea", name: "Lemon Iced Tea", description: "Black tea, lemon slice", price: 3.5, image: lemonIcedTeaPng },
];
