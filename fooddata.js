//this can be gotten from: https://docs.google.com/spreadsheets/d/1QLdUJlZobb2NAktUHtboumURBOHx936hSOpZBlCihm8/edit?usp=sharing
let cc = {
  phone: "Phone",
  bldg: "Building",
  name: "Name",
  city: "City",
  street: "Street",
  menus: [
    "menu",
    "Garden Gourmet",
    "Brellas",
    "Serrano's",
    "The Press",
    "Early Bird Breakfast Menu",
    "Boulevard Grill",
    "Za Pizza",
    "Café Spice",
    "Prairie Fire Grill",
    "Sunglower BBQ Co.",
    "Sunflower BBQ Co. Breakfast Menu"
  ]
};

let center = { center: { lat: 38.9559656238095, lng: -95.2513079666667 } };
let fooddata = [
  {
    Name: "Mrs. E's",
    label: "E",
    Building: "Lewis Hall",
    Street: "1532 Engel Rd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-2260",
    dd: true,
    ms: true,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:00am-8:00pm",
    hours2: "Fri: 7:00am-7:30pm",
    hours3: "Sat-Sun: 11:00am-7:30pm",
    hours4: "",
    address: "1532 Engel Rd. Lawrence, KS 66045",
    lat: 38.9557396,
    lng: -95.2585763,
    opens: "11:00am,7:00am,7:00am,7:00am,7:00am,7:00am,11:00am",
    closes: "7:30pm,7:30pm,7:30pm,7:30pm,7:30pm,7:30pm,7:30pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "EKDAHL DINING",
    menu: "",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "South Dining Commons",
    label: "S",
    Building: "Oliver and Cora Downs Halls",
    Street: "1517 West 18th Street",
    City: "Lawrence, KS 66045",
    Phone: "785-864-4087",
    dd: true,
    ms: true,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:00am-7:30pm",
    hours2: "Fri: 7:00am-7:00pm",
    hours3: "Sat-Sun: 11:00am-7:00pm",
    hours4: "",
    address: "1517 West 18th Street Lawrence, KS 66045",
    lat: 38.9511792,
    lng: -95.2528466,
    opens: "11:00am,7:00am,7:00am,7:00am,7:00am,7:00am,11:00am",
    closes: "7:00pm,7:00pm,7:00pm,7:00pm,7:00pm,7:00pm,7:00pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "SOUTH DINING COMMONS",
    menu: "",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "North College Café",
    label: "N",
    Building: "GSP Hall",
    Street: "500 W 11th St.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-3120",
    dd: true,
    ms: true,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:00am-7:30pm",
    hours2: "Fri: 7:00am-2:30pm",
    hours3: "Sat-Sun: 11:00am-2:30pm",
    hours4: "",
    address: "500 W 11th St. Lawrence, KS 66045",
    lat: 38.9651247,
    lng: -95.2417962,
    opens: "11:00am,7:00am,7:00am,7:00am,7:00am,7:00am,11:00am",
    closes: "2:30pm,7:30pm,7:30pm,7:30pm,7:30pm,2:30pm,2:30pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "NORTH COLLEGE CAFE",
    menu: "",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "The Studio Grill",
    label: "G",
    Building: "Hashinger Hall",
    Street: "1632 Engel Rd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-1890",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 5:00pm-Midnight",
    hours2: "Sat-Sun: 7:30pm-Midnight",
    hours3: "",
    hours4: "",
    address: "1632 Engel Rd. Lawrence, KS 66045",
    lat: 38.9540539,
    lng: -95.2588591,
    opens: "7:30pm,5:00pm,5:00pm,5:00pm,5:00pm,5:00pm,7:30pm",
    closes: "midnight, midnight,midnight,midnight,midnight,midnight,midnight",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "http://issuu.com/kumemorialunion/docs/studio_-_menu_boards_fa16?e=26059554/38391583",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Southside",
    label: "S",
    Building: "Oliver and Cora Downs Halls",
    Street: "1815 Naismith Dr.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-4087",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 11:00am-11:00pm",
    hours2: "Sat-Sun: 10:00am-11:00pm",
    hours3: "",
    hours4: "",
    address: "1815 Naismith Dr. Lawrence, KS 66045",
    lat: 38.9511011,
    lng: -95.2520387,
    opens: "10:00am,11:00am,11:00am,11:00am,11:00am,11:00am,10:00am",
    closes: "11:00pm,11:00pm,11:00pm,11:00pm,11:00pm,11:00pm,11:00pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu: "",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "The Market",
    label: "M",
    Building: "Kansas Union",
    Street: "1301 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-2886",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 8:00am-4:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1301 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.9595782,
    lng: -95.2434651,
    opens: "CLOSED,8:00am,8:00am,8:00am,8:00am,8:00am,CLOSED",
    closes: "CLOSED,4:00pm,4:00pm,4:00pm,4:00pm,4:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "UN MARKET",
    menu: "",
    "Garden Gourmet":
      "https://issuu.com/kumemorialunion/docs/garden_gourmet_menu_fa16?e=26059554/38224471",
    Brellas:
      "https://issuu.com/kumemorialunion/docs/web-ready_brellas_fa16?e=26059554/38193480",
    "Serrano's":
      "https://issuu.com/kumemorialunion/docs/serranos_menu_fa16?e=26059554/38224237",
    "The Press":
      "https://issuu.com/kumemorialunion/docs/panini_menu_fa16?e=26059554/38223962",
    "Early Bird Breakfast Menu":
      "https://issuu.com/kumemorialunion/docs/early_bird_menu_fa16?e=26059554/38223750",
    "Boulevard Grill":
      "https://issuu.com/kumemorialunion/docs/boulevard_grill_menu_fa16?e=26059554/38222092",
    "Za Pizza":
      "http://issuu.com/kumemorialunion/docs/web-ready_za_market_menu_fa16?e=26059554/38193033",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "The Underground",
    label: "U",
    Building: "Wescoe Hall",
    Street: "1445 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-5022",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 7:30am-4:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1445 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.9574035,
    lng: -95.2477536,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,4:00pm,4:00pm,4:00pm,4:00pm,4:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu: "",
    "Garden Gourmet":
      "https://issuu.com/kumemorialunion/docs/garden_gourmet_menu_fa16?e=26059554/38224471",
    Brellas:
      "https://issuu.com/kumemorialunion/docs/web-ready_brellas_fa16?e=26059554/38193480",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza":
      "https://issuu.com/kumemorialunion/docs/web-ready_za_market_menu_fa16?e=26059554/38193033",
    "Café Spice":
      "https://union.ku.edu/sites/union.drupal.ku.edu/files/docs/menus/CafeSpice_FullMenuBoard.pdf",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Courtside Café",
    label: "C",
    Building: "DeBruce Center",
    Street: "1647 Naismith Drive",
    City: "Lawrence, KS 66045",
    Phone: "785-864-5694",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 7:00am-3:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1647 Naismith Drive Lawrence, KS 66045",
    lat: 38.95328,
    lng: -95.251263,
    opens: "CLOSED,7:00am,7:00am,7:00am,7:00am,7:00am,CLOSED",
    closes: "CLOSED,3:00pm,3:00pm,3:00pm,3:00pm,3:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "DEBR COURTSIDE CAFE",
    menu: "",
    "Garden Gourmet": "",
    Brellas:
      "https://issuu.com/kumemorialunion/docs/web-ready_brellas_fa16?e=26059554/38193480",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill":
      "https://issuu.com/kumemorialunion/docs/courtsideprairiefiregrillmenu?e=26059554/38749545",
    "Sunglower BBQ Co.":
      "https://issuu.com/kumemorialunion/docs/courtsidesunflowerbbqmenu?e=26059554/38749790",
    "Sunflower BBQ Co. Breakfast Menu":
      "https://issuu.com/kumemorialunion/docs/courtsidesunflowerbbqbreakfastdigit?e=26059554/38750007",
    "": ""
  },
  {
    Name: "Mortar & Pestle Café",
    label: "M",
    Building: "Pharmacy Building",
    Street: "2010 Becker Dr",
    City: "Lawrence, KS 66045",
    Phone: "785-864-7086",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 11:00am-2:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "2010 Becker Dr Lawrence, KS 66045",
    lat: 38.948523,
    lng: -95.263848,
    opens: "CLOSED,11:00am,11:00am,11:00am,11:00am,11:00am,CLOSED",
    closes: "CLOSED,2:00pm,2:00pm,2:00pm,2:00pm,2:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "PHAR MORTAR &amp; PESTLE",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_freshfusion_menu_boards_fa17?e=26059554/52397010",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "The Bus Stop",
    label: "B",
    Building: "Self Hall",
    Street: "1620 Engel Rd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-2991",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 7:00am-Midnight",
    hours2: "Sat-Sun: 9:00am-Midnight",
    hours3: "",
    hours4: "",
    address: "1620 Engel Rd. Lawrence, KS 66045",
    lat: 38.9544738,
    lng: -95.25937239999999,
    opens: "9:00am,7:00am,7:00am,7:00am,7:00am,7:00am,9:00am",
    closes: "midnight,midnight,midnight,midnight,midnight,midnight,midnight",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Impromptu Café",
    label: "I",
    Building: "Kansas Union",
    Street: "1301 Jayhawk Blvd",
    City: "Lawrence, KS 66045",
    Phone: "785-864-8001",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 11:00am-2:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1301 Jayhawk Blvd Lawrence, KS 66045",
    lat: 38.9595782,
    lng: -95.2434651,
    opens: "CLOSED,11:00am,11:00am,11:00am,11:00am,11:00am,CLOSED",
    closes: "CLOSED,2:00pm,2:00pm,2:00pm,2:00pm,2:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/impromptu_web_menu_sp16?e=26059554/38226212",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Engineering Commons Jay Break",
    label: "E",
    Building: "LEEP2",
    Street: "1536 W. 15th St.",
    City: "Lawrence, KS 66045",
    Phone: "",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:30am-8:00pm",
    hours2: "Fri: 7:30am-2:30pm",
    hours3: "Sat-Sun: Closed",
    hours4: "",
    address: "1536 W. 15th St. Lawrence, KS 66045",
    lat: 38.95741719999999,
    lng: -95.2540253,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,8:00pm,8:00pm,8:00pm,8:00pm,2:30pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "JRP Jay Break",
    label: "J",
    Building: "",
    Street: "1122 West Campus Rd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-1076",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:30am-4:30pm",
    hours2: "Fri: 7:30am-2:30pm",
    hours3: "Sat-Sun: Closed",
    hours4: "",
    address: "1122 West Campus Rd. Lawrence, KS 66045",
    lat: 38.9624281,
    lng: -95.2505894,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,4:30pm,4:30pm,4:30pm,4:30pm,2:30pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Strong Hall Jay Break",
    label: "J",
    Building: "",
    Street: "1450 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-8017",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 7:30am-2:30pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1450 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.958542,
    lng: -95.2476138,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,2:30pm,2:30pm,2:30pm,2:30pm,2:30pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Watson Jay Break",
    label: "J",
    Building: "",
    Street: "1425 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-1937",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 8:00am-4:00pm",
    hours2: "Fri: 8:00am-2:00pm",
    hours3: "Sat-Sun: Closed",
    hours4: "",
    address: "1425 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.9565813,
    lng: -95.24484,
    opens: "CLOSED,8:00am,8:00am,8:00am,8:00am,8:00am,CLOSED",
    closes: "CLOSED,4:00pm,4:00pm,4:00pm,4:00pm,2:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Anschutz Jay Break",
    label: "J",
    Building: "",
    Street: "1301 Hoch Auditoria Dr.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-2948",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:00am-11:00pm",
    hours2: "Fri: 7:00am-2:00pm",
    hours3: "Sat-Sun: Closed",
    hours4: "",
    address: "1301 Hoch Auditoria Dr. Lawrence, KS 66045",
    lat: 38.9573285,
    lng: -95.2496611,
    opens: "CLOSED,7:00am,7:00am,7:00am,7:00am,7:00am,CLOSED",
    closes: "CLOSED,11:00pm,11:00pm,11:00pm,11:00pm,2:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Roasterie",
    label: "R",
    Building: "Kansas Union",
    Street: "1301 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-8008",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:30am-7:00pm",
    hours2: "Fri: 7:30am-6:00pm",
    hours3: "Sat: 9:00am-3:00pm",
    hours4: "Sun: Closed",
    address: "1301 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.9595782,
    lng: -95.2434651,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,9:00am",
    closes: "CLOSED,7:00pm,7:00pm,7:00pm,7:00pm,6:00pm,3:00pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Roasterie",
    label: "R",
    Building: "DeBruce Center",
    Street: "1647 Naismith Drive",
    City: "Lawrence, KS 66045",
    Phone: "785-864-5694",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Thurs: 7:00am-6:00pm",
    hours2: "Fri: 7:00am-5:00pm",
    hours3: "Sat: 10:00am-3:00pm",
    hours4: "Sun: Closed",
    address: "1647 Naismith Drive Lawrence, KS 66045",
    lat: 38.95328,
    lng: -95.251263,
    opens: "CLOSED,7:00am,7:00am,7:00am,7:00am,7:00am,10:00am",
    closes: "CLOSED,6:00pm,6:00pm,6:00pm,6:00pm,5:00pm,3:00pm",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Roasterie",
    label: "R",
    Building: "Wescoe Hall",
    Street: "1445 Jayhawk Blvd.",
    City: "Lawrence, KS 66045",
    Phone: "785-864-2496",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 7:30am-4:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "1445 Jayhawk Blvd. Lawrence, KS 66045",
    lat: 38.9574035,
    lng: -95.2477536,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,4:00pm, 4:00pm,4:00pm,4:00pm,4:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "Roasterie",
    label: "R",
    Building: "Pharmacy Building",
    Street: "2010 Becker Dr",
    City: "Lawrence, KS 66045",
    Phone: "785-864-7086",
    dd: true,
    ms: false,
    cash: true,
    bb: true,
    hours1: "Mon-Fri: 8:00am-2:00pm",
    hours2: "Sat-Sun: Closed",
    hours3: "",
    hours4: "",
    address: "2010 Becker Dr Lawrence, KS 66045",
    lat: 38.948523,
    lng: -95.263848,
    opens: "CLOSED,8:00am,8:00am,8:00am,8:00am,8:00am,CLOSED",
    closes: "CLOSED,2:00PM,2:00pm,2:00pm,2:00pm,2:00pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  },
  {
    Name: "J Café",
    label: "J",
    Building: "Capitol Federal Hall",
    Street: "1654 Naismith Dr",
    City: "Lawrence, KS 66045",
    Phone: "",
    dd: false,
    ms: false,
    cash: true,
    bb: false,
    hours1: "Mon-Thu: 7:30am-4:30pm",
    hours2: "​Fri: 7:30am-2:30pm",
    hours3: "Sat-Sun: Closed",
    hours4: "",
    address: "1654 Naismith Dr Lawrence, KS 66045",
    lat: 38.9541611,
    lng: -95.2511239,
    opens: "CLOSED,7:30am,7:30am,7:30am,7:30am,7:30am,CLOSED",
    closes: "CLOSED,4:30pm,4:30pm,4:30pm,4:30pm,2:30pm,CLOSED",
    netnutrition: "http://netnutrition.union.ku.edu/NetNutrition/7#",
    searchable: "",
    menu: "",
    "Garden Gourmet": "",
    Brellas: "",
    "Serrano's": "",
    "The Press": "",
    "Early Bird Breakfast Menu": "",
    "Boulevard Grill": "",
    "Za Pizza": "",
    "Café Spice": "",
    "Prairie Fire Grill": "",
    "Sunglower BBQ Co.": "",
    "Sunflower BBQ Co. Breakfast Menu": "",
    "": ""
  }
];
