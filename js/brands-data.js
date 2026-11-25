/* MTC brand portfolio — edit this file to add or change brands. No other changes are needed.

   1. FEATURED LOGOS (the logo grid at the top of the Brands page)
      Add a line:  { name: "Brand", logo: "img/brands/file.png" },
      Put the logo file (PNG on white, about 640 px wide) in img/brands/. Aim for 12–18 logos.

   2. BRAND DIRECTORY (the searchable list by category)
      Add a line in the right category:  "Brand name",
      Category keys: beverages, dairy-juices, food, snacks, personal-care, household, frozen
      To add a whole new category, add it to "categories" (with an icon name from ICONS in main.js)
      and add a matching list under "brands". */

window.MTC_BRANDS = {
  categories: [
    { key: "beverages",     en: "Beverages",          ar: "المشروبات",                  icon: "bottle" },
    { key: "dairy-juices",  en: "Dairy & Juices",     ar: "الألبان والعصائر",            icon: "milk" },
    { key: "food",          en: "Food & Grocery",     ar: "المواد الغذائية والبقالة",     icon: "basket" },
    { key: "snacks",        en: "Snacks",             ar: "الوجبات الخفيفة والحلويات",    icon: "candy" },
    { key: "personal-care", en: "Personal Care",      ar: "العناية الشخصية",             icon: "care" },
    { key: "household",     en: "Household Products", ar: "المنتجات المنزلية",           icon: "spray" },
    { key: "frozen",        en: "Frozen Foods",       ar: "الأغذية المجمدة",             icon: "snow" }
  ],

  featured: [
    { name: "PepsiCo",    logo: "img/brands/pepsico.png",    alt: "PepsiCo: Pepsi, 7UP, Mirinda and Aquafina" },
    { name: "Coca-Cola",  logo: "img/brands/coca-cola.png" },
    { name: "Nescafé",    logo: "img/brands/nescafe.png" },
    { name: "Lipton",     logo: "img/brands/lipton.png" },
    { name: "Saudia",     logo: "img/brands/saudia.png" },
    { name: "Puck",       logo: "img/brands/puck.png" },
    { name: "Red Bull",   logo: "img/brands/red-bull.png" },
    { name: "Dove",       logo: "img/brands/dove.png" },
    { name: "Indomie",    logo: "img/brands/indomie.png" },
    { name: "Suntop",     logo: "img/brands/suntop.png" },
    { name: "Kinza Cola", logo: "img/brands/kinza.png" },
    { name: "Mehran",     logo: "img/brands/mehran.png" },
    { name: "India Gate", logo: "img/brands/india-gate.png" },
    { name: "Barbican",   logo: "img/brands/barbican.png" },
    { name: "Moussy",     logo: "img/brands/moussy.png" },
    { name: "Code Red",   logo: "img/brands/code-red.png",   alt: "Mountain Dew Code Red" }
  ],

  brands: {
    "beverages": [
      "Pepsi", "7UP", "Mirinda", "Mountain Dew", "Code Red", "Aquafina", "Coca-Cola", "Fanta", "Sprite",
      "Kinza Cola", "Shani", "Fifa", "Jimmi", "Alsi", "Linda", "Waw", "Suncola", "Spark", "Milaf",
      "Vimto", "Tang", "Sunquick", "Tono", "Barbican", "Moussy", "Holsten", "Klasse",
      "Red Bull", "Power Horse", "Bison", "Sting",
      "Lipton", "Rabea", "Nescafé", "Hi Tea", "Zoi",
      "Berain", "Nova", "Safa", "Sila", "Al Zarqa", "Hajar", "Nestlé", "Perrier", "Aqua Life"
    ],
    "dairy-juices": [
      "Saudia", "Puck", "Kraft", "Kiri", "Nido", "Anchor", "Nadec", "Rainbow", "Luna", "Bonny", "Coffee-mate",
      "KDD", "Suntop", "Rani", "Rita", "Caesar", "Qabtan", "Hope", "Saly", "Mizo", "Rauch", "Original"
    ],
    "food": [
      "Goody", "Indomie", "Indofood", "Maggi", "Mehran", "Rana", "Baidar", "Acorsa", "Five Star", "Sawsan",
      "Treva", "Geisha", "Al Khair", "Afia", "Shams", "Al Raed", "Dalal", "Noor", "Sunny", "Sasso",
      "Delico", "Dalda", "Quaker", "Yollos", "Perfetto", "Budoor", "Abu Kas", "Valeema", "Raja",
      "Sun White", "India Gate", "Zaiqa", "Baba", "Khairat", "Ajinomoto", "Esnad"
    ],
    "snacks": [
      "Nutella", "Halwani", "Jameel", "Betty Crocker", "Hershey's"
    ],
    "personal-care": [
      "Dove", "Lux", "Sunsilk", "Pantene", "Head & Shoulders", "Clear", "Close Up", "Colgate", "Signal",
      "Nivea", "Vaseline", "Johnson's", "Dabur", "Vatika", "Parachute", "Himalaya", "Glow & Lovely",
      "Gillette", "Rexona", "Lifebuoy", "Dettol", "Pampers", "Always", "Baby Joy"
    ],
    "household": [
      "Tide", "Ariel", "Omo", "Persil", "Fairy", "Clorox", "Downy", "Dac", "Jif", "Raid", "Duracell",
      "Fine", "Nawras", "Tayyar"
    ],
    "frozen": [
      "Americana", "Sadia", "Perdix", "Fakieh", "Tamam", "Radwa", "Bashayer", "Al Jouf", "Lara"
    ]
  }
};
