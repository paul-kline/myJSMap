//this can be gotten from: https://docs.google.com/spreadsheets/d/1QLdUJlZobb2NAktUHtboumURBOHx936hSOpZBlCihm8/edit?usp=sharing
let cc = {
  phone: "Phone",
  bldg: "building",
  name: "name",
  hname: "Hours Names",
  city: "city",
  street: "street",
  open: "isOpen",
  description: "description",
  residential: "is_residential",
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
const menus = [
  {
    name: "Anschutz Jay Break",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci"
  },
  {
    name: "Burge Roasterie",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788"
  },
  {
    name: "Courtside Café",
    searchable: "DEBR COURTSIDE CAFE",
    Brellas:
      "https://issuu.com/kumemorialunion/docs/web-ready_brellas_fa16?e=26059554/38193480",
    "Prairie Fire Grill":
      "https://issuu.com/kumemorialunion/docs/courtsideprairiefiregrillmenu?e=26059554/38749545",
    "Sunglower BBQ Co.":
      "https://issuu.com/kumemorialunion/docs/courtsidesunflowerbbqmenu?e=26059554/38749790",
    "Sunflower BBQ Co. Breakfast Menu":
      "https://issuu.com/kumemorialunion/docs/courtsidesunflowerbbqbreakfastdigit?e=26059554/38750007"
  },
  {
    name: "DeBruce Roasterie",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788"
  },
  {
    name: "Engineering Commons Jay Break",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci"
  },
  {
    name: "Impromptu Café",
    menu:
      "https://issuu.com/kumemorialunion/docs/impromptu_web_menu_sp16?e=26059554/38226212"
  },
  {
    name: "JRP Jay Break",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu"
  },
  {
    name: "Mortar & Pestle Café",
    searchable: "PHAR MORTAR &amp; PESTLE",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_freshfusion_menu_boards_fa17?e=26059554/52397010"
  },
  { name: "Mrs. E's", searchable: "EKDAHL DINING" },
  { name: "North College Café", searchable: "NORTH COLLEGE CAFE" },
  {
    name: "Pharmacy Roasterie",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788"
  },
  { name: "South Dining Commons", searchable: "SOUTH DINING COMMONS" },
  { name: "Southside" },
  {
    name: "Strong Hall Jay Break",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu"
  },
  {
    name: "The Bus Stop",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewcappuci"
  },
  {
    name: "The Market",
    searchable: "UN MARKET",
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
      "http://issuu.com/kumemorialunion/docs/web-ready_za_market_menu_fa16?e=26059554/38193033"
  },
  {
    name: "The Studio Grill",
    menu:
      "http://issuu.com/kumemorialunion/docs/studio_-_menu_boards_fa16?e=26059554/38391583"
  },
  {
    name: "The Underground",
    "Garden Gourmet":
      "https://issuu.com/kumemorialunion/docs/garden_gourmet_menu_fa16?e=26059554/38224471",
    Brellas:
      "https://issuu.com/kumemorialunion/docs/web-ready_brellas_fa16?e=26059554/38193480",
    "Za Pizza":
      "https://issuu.com/kumemorialunion/docs/web-ready_za_market_menu_fa16?e=26059554/38193033",
    "Café Spice":
      "https://union.ku.edu/sites/union.drupal.ku.edu/files/docs/menus/CafeSpice_FullMenuBoard.pdf"
  },
  {
    name: "Union Roasterie",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788"
  },
  {
    name: "Watson Jay Break",
    menu:
      "https://issuu.com/kumemorialunion/docs/kuds_jaybreak_menu_posternewnocappu"
  },
  {
    name: "Wescoe Roasterie",
    menu:
      "https://issuu.com/kumemorialunion/docs/the_roasterie?e=26059554/38796788"
  }
];

let center = { center: { lat: 38.9559656238095, lng: -95.2513079666667 } };

let loadPlacesPromise = fetch(
  "https://union.pauliankline.com/places.php?alldining=true"
)
  .then(response => response.json())
  .then(x => {
    console.log("got places", x);
    fooddata = x;
    return x;
  });

let currentHoursPromise = fetch(
  "https://union.pauliankline.com/queryhours.php?alldining=true&date=" +
    toQueryDate(toCentral(new Date()))
)
  .then(response => response.json())
  .then(x => {
    console.log("got hours", x);
    currentHours = x;
    return x;
  });

let assignedHoursPromise = new Promise((resolve, reject) => {
  Promise.all([loadPlacesPromise, currentHoursPromise]).then(
    ([places, hours]) => {
      let pl = assignHours(places, hours);
      console.log("hours assigned. new places are:", places);
      resolve(pl);
    }
  );
});

/*
This function assigns the hours (each having a place_id)
to the respective place as an 'intervals' property.
as more hours are retrieved, more intervals can be
add to the place property.
*/
function assignHours(places, hours) {
  console.log("in assignHours");
  places.forEach(p => {
    let hh = hours.filter(h => h.place_id == p.place_id);
    let intervals = createIntervalsForPlace(hh);
    p.intervals = intervals;
    p.display = true;
  });
  console.log("assigned", places);
  return places;
}
function createIntervalsForPlace(placeHours) {
  let groupedByIntervalNames = groupBy(placeHours, "interval_name");
  // console.log(groupedByIntervalNames);
  let intervals = [];
  for (let intervalName in groupedByIntervalNames) {
    let ints = groupedByIntervalNames[intervalName];
    let fst = ints[0];
    let interval = {
      interval_name: intervalName,
      interval_start: new Date(fst.interval_start + "cst"),
      interval_end: new Date(fst.interval_end + "cst")
    };
    interval.entries = ints.map(i => {
      i.first_effective_date = new Date(i.first_effective_date + "cst");
      i.from_dow = parseInt(i.from_dow);
      i.to_dow = parseInt(i.to_dow);
      i = setTimes(i);
      return i;
    });
    interval.entries = consolidate(interval.entries);
    intervals.push(interval);
  }
  return intervals;
}
function consolidate(entries) {
  let result = [];
  for (let i = 0; i < entries.length; i++) {
    let e = entries[i];
    while (i < entries.length - 1) {
      const ee = entries[i + 1];
      if (
        (e.closed && ee.closed) ||
        (e.varies && ee.varies) ||
        (ee.open_h == e.open_h && ee.close_h == e.close_h)
      ) {
        //it's the same!
        e.to_dow = ee.to_dow;
      } else {
        break;
      }
      i++;
    }
    result.push(e);
  }
  return result;
}
function setTimes(i) {
  if (i.varies || i.closed) {
    return i;
  }
  //str is of form "hh:mm:ss"
  let [oh, om, os] = i.open.split(":").map(x => parseInt(x));
  let [ch, cm, cs] = i.close.split(":").map(x => parseInt(x));
  i.oh = oh + om / 60 + os / 3600;
  i.ch = ch + cm / 60 + cs / 3600;
  let osuffix = "am";
  if (oh > 12) {
    osuffix = "pm";
    oh -= 12;
  }
  i.open_h = oh + ":" + two(om) + osuffix;
  let csuffix = "am";
  if (ch > 12) {
    csuffix = "pm";
    ch -= 12;
  }
  i.close_h = ch + ":" + two(cm) + csuffix;

  return i;
}
function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
let currentHours;
let fooddata;
