export const navigation = [
  {
    label: "Home",
    path: "/",
    // children: [
    //   { label: "Home Beauty Salon", path: "/home-beauty-salon" },
    //   { label: "Home Beauty Salon (OnePage)", path: "/home-beauty-salon-op" },
    //   { label: "Home Wellness Spa", path: "/home-wellness-spa" },
    //   { label: "Home Wellness Spa (OnePage)", path: "/home-wellness-spa-op" },
    //   { label: "Home Hair Salon", path: "/home-hair-salon" },
    //   { label: "Home Hair Salon (OnePage)", path: "/home-hair-salon-op" }
    // ]
  },
  {
    label: "About Us",
    path: "/about",
    // children: [
    //   { label: "About Us", path: "/about" },
    //   { label: "Team", path: "/team" },
    //   { label: "FAQ", path: "/faq" },
    //   { label: "Events", path: "/events" },
    //   { label: "Appointment", path: "/appointment" },
    //   { label: "Pricing", path: "/pricing" },
    //   { label: "Error Page", path: "/error" }
    // ]
  },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        label: "Hair",
        path: "/services",
        items: [
          { label: "Hair Style", path: "/services" },
          { label: "Hair Care", path: "/services" },
          { label: "Hair Colour", path: "/services" },
          { label: "Highlights & Streaks", path: "/services" }
        ]
      },
      {
        label: "Skin",
        path: "/services",
        items: [
          { label: "Facial Care", path: "/services" },
          { label: "Bleach", path: "/services" },
          { label: "Waxing", path: "/services" }
        ]
      },
      {
        label: "Makeup",
        path: "/services",
        items: [
          { label: "Bridal Makeup", path: "/services" },
          { label: "Event Makeup", path: "/services" },
          { label: "Party Makeup", path: "/services" }
        ]
      },
      {
        label: "Hands & Feet",
        path: "/services",
        items: [
          { label: "Manicure", path: "/services" },
          { label: "Pedicure", path: "/services" }
        ]
      },
      {
        label: "Packages",
        path: "/services",
        items: [
          { label: "Bridal Packages", path: "/services" },
          { label: "Groom Packages", path: "/services" },
          { label: "Monthly Packages", path: "/services" },
        ]
      }
    ]
  },
  // {
  //   label: "Blog",
  //   path: "/blog",
  //   children: [
  //     { label: "Blog", path: "/blog" },
  //     { label: "Blog Details", path: "/blog/latest-trends" }
  //   ]
  // },
  // {
  //   label: "Shop",
  //   path: "/shop",
  //   children: [
  //     { label: "Shop", path: "/shop" },
  //     { label: "Shop Details", path: "/shop/haircare-kit" },
  //     { label: "Cart", path: "/cart" },
  //     { label: "Checkout", path: "/checkout" },
  //     { label: "Wishlist", path: "/wishlist" }
  //   ]
  // },
  {
    label: "Contact Us",
    path: "/contact"
  }
];

export const headerInfo = {
  phone: "+1 (555) 123-4567",
  email: "help@Scuts.com",
  address: "12 Division Park, SKY 12546. Berlin",
  hours: "Mon - Fri 8:00 - 18:00 / Sunday 8:00 - 14:00"
};

export const socialLinks = [
  { platform: "facebook", url: "https://www.facebook.com/" },
  { platform: "twitter", url: "https://www.twitter.com/" },
  { platform: "instagram", url: "https://www.instagram.com/" },
  { platform: "youtube", url: "https://www.youtube.com/" }
];

export default navigation;