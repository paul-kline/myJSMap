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
let placesPromise = fetch("https://union.pauliankline.com/places.php?alldining=true")
  .then(function(response) {
    return response.json();
  })
  .then(places => {
    console.log("got places", places);
    fooddata = places;
  });
let hoursPromise = fetch("https://union.pauliankline.com/queryhours.php?alldining=true&date=" + toQueryDate(new Date()))
  .then(function(response) {
    // console.log("hours promise response:", response);
    return response.json();
  })
  .then(hours => {
    console.log("got hours", hours);
    currentHours = hours;
    assignHours(fooddata, currentHours);
  });
async function assignHours(places, hours) {
  await placesPromise; //wait for places to have loaded.
  console.log("assigning!!!!!!!!!!!!!!!!!!!!!!!!!");
  places.forEach(p => {
    let hh = hours
      .filter(h => h.place_id == p.place_id)
      .map(h => {
        h.from_dow = parseInt(h.from_dow);
        h.to_dow = parseInt(h.to_dow);
        return h;
      });
    let intervals = createIntervalsForPlace(hh);
    p.intervals = intervals;
  });
  console.log("assigned", places);
}
function createIntervalsForPlace(placeHours) {
  let groupedByIntervalNames = groupBy(placeHours, "interval_name");
  // console.log(groupedByIntervalNames);
  let intervals = [];
  for (let intervalName in groupedByIntervalNames) {
    let ints = groupedByIntervalNames[intervalName];
    let fst = ints[0];
    let interval = { interval_name: intervalName, interval_start: new Date(fst.interval_start + "cst"), interval_end: new Date(fst.interval_end + "cst") };
    interval.entries = ints.map(i => {
      return { first_effective_date: new Date(i.first_effective_date + "cst"), closed: i.closed, varies: i.varies, open: i.open, close: i.close, from_dow: i.from_dow, to_dow: i.to_dow };
    });
    intervals.push(interval);
  }
  return intervals;
}
function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
let currentHours;
let fooddata;
