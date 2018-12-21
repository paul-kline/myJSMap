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
    intervals.push(interval);
  }
  return intervals;
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
