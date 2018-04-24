var app = new Vue({
  el: "#app",
  data: {
    message: "getting location...",
    currentSelection: null,
    places: [],
    userLocation: null,
    map: null,
    bounds: null //cant yet.
  }
});
function calcIsOpens(date = new Date(), places = app.places) {
  let todayIndex = date.getDay();
  //TODO: check if special hours apply to date.
  // console.log("in clacisopens", places);
  // console.log("instance ", places instanceof Array);
  places.forEach(place => {
    // console.log("in each place");
    let openarr = place.opens.split(",");
    let closearr = place.closes.split(",");
    let openstr = openarr[todayIndex];
    let closestr = closearr[todayIndex];
    if (
      openstr.toLowerCase() == "closed" ||
      closestr.toLowerCase() == "closed"
    ) {
      place.isOpen = false;
    } else {
      [oh, om] = tohrmin(openstr);
      [ch, cm] = tohrmin(closestr);
      let o = oh * 60 + om;
      let c = ch * 60 + cm;
      let dh = date.getHours();
      let dm = date.getMinutes();
      let d = dh * 60 + dm;
      // console.log(place, oh, om, ch, cm, dh, dm);
      place.isOpen = d >= o && d < c;
    }
  });
}
function tohrmin(str) {
  str = str.toLowerCase();
  if (str == "midnight") {
    return [24, 0];
  }
  let res = [0, 0];
  if (str.includes("d")) {
    //indicator that this is the next day.
    //add 24 hours then!
    res[0] += 24;
    str = str.replace("d", "");
  }
  if (str.includes("pm")) {
    str = str.replace("pm", "");
    res[0] += 12;
  } else {
    str = str.replace("am", "");
  }
  [h, m] = str.split(":").map(x => parseInt(x.trim(), 10));
  res[0] += h;
  res[1] += m;

  return res;
}
function recenter(map = app.map) {
  map.setCenter(center.center);
  map.setZoom(15);
}
function initMap() {
  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById("map"), {
    // zoom: 15,
    // center: center.center,
    mapTypeControl: false
    // ,
    // gestureHandling: "greedy"
  });
  // map.setOptions({ minZoom: 15 });
  recenter(map);
  maploaded(map);
  affixToTop(map);
  genmapControls();
}
function genmapControls() {
  app.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
    document.getElementById("mapcontrols")
  );
  app.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
    document.getElementById("recenter")
  );
}
function affixToTop(map) {
  let el = document.getElementById("map");
  el.style.position = "fixed";
  el.top = "0px";
  el.left = "0px";
  console.log("all set", el);
}
function maploaded(map) {
  fooddata.forEach(e => {
    e.directionsUrl = buildDirectionsLink(e);
    e.display = true;
  });
  console.log("map loaded!");
  app.bounds = new google.maps.LatLngBounds();
  app.map = map;
  loadIntoMap(map, fooddata);
  calcIsOpens();
  //must be after map populated.
  //   initializeAccordions();
  locateUser(map);
}
function computeAllLocationsTo(latlng) {
  let lat = latlng.lat;
  let lng = latlng.lng;
}
function loadIntoMap(map, results) {
  for (let i = 0; i < results.length; i++) {
    let cur = results[i];
    let latLng = new google.maps.LatLng(cur.lat, cur.lng);
    app.bounds.extend(latLng);
    // map.fitBounds(app.bounds);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title:
        cur.Name + (cur.Building.length > 0 ? " (" + cur.Building + ")" : "")
      //   ,
      //   icon: iconisize(icons.dd)
    });

    cur.marker = marker;
    let infowindow = new google.maps.InfoWindow({
      content: buildPopup(cur)
    });
    cur.infowindow = infowindow;
    marker.addListener("click", function() {
      onTouched(cur, true);
      //   infowindow.open(map, marker);
    });
    app.places.push(cur);
  }
}
function getCheckBox(str) {
  let r = "";
  if (str == "open") r = "chkbox-open-now";
  if (str == "bb") r = "chkbox-bb";
  if (str == "cash") r = "chkbox-cash";
  if (str == "ms") r = "chkbox-ms";
  if (str == "dd") r = "chkbox-dd";
  return document.getElementById(r);
}
function filterStateChange(places = app.places) {
  let isOpenOnly = getCheckBox("open").checked;
  let mustbb = getCheckBox("bb").checked;
  let mustCash = getCheckBox("cash").checked;
  let mustms = getCheckBox("ms").checked;
  let mustdd = getCheckBox("dd").checked;
  places.forEach(e => {
    let openReq = isOpenOnly ? e.isOpen : true;
    let mustbbReq = mustbb ? e.bb : true;
    let mustCashReq = mustCash ? e.cash : true;
    let mustmsReq = mustms ? e.ms : true;
    let mustddReq = mustdd ? e.dd : true;

    e.display = openReq && mustbbReq && mustCashReq && mustmsReq && mustddReq;

    if (e.display) {
      if (!e.marker.map) {
        e.marker.setMap(app.map);
      }
    } else {
      //don't show it!
      if (e.marker.map) {
        e.marker.setMap(null);
      }
    }
  });
}
function onTouched(place, fromMap = false) {
  if (app.currentSelection) {
    app.currentSelection.infowindow.close();
  }
  //order to front of list if from map.
  if (fromMap) {
    [e] = app.places.splice(app.places.indexOf(place), 1);
    app.places.unshift(e);
    console.log(e);
    app.currentSelection = e;
    //scroll to top:
    scrollToTop();
  } else {
    app.currentSelection = place;
  }

  let marker = app.currentSelection.marker;
  app.currentSelection.infowindow.open(map, marker);
}
function scrollToTop() {
  document.getElementsByClassName("info")[0].scrollTo(0, 0);
}
function buildHoursList(obj) {
  let hours = "";
  let f = x => (x ? `<li>${x}</li>` : "");

  hours += f(obj.hours1);
  hours += f(obj.hours2);
  hours += f(obj.hours3);
  hours += f(obj.hours4);
  if (hours) {
    return `<ul>${hours}</ul>`;
  } else {
    return "";
  }
}
function buildDirectionsLink(obj) {
  let lnk = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    obj[cc.name] +
      " " +
      (obj[cc.bldg] ? obj[cc.bldg] + " " : "") +
      obj[cc.street] +
      " " +
      obj[cc.city]
  )}`;
  return lnk;
}
function buildPopup(obj) {
  let hours = buildHoursList(obj);
  let phone = "";
  if (obj[cc.phone]) {
    phone = `<div><a href="tel:${obj[cc.phone]}">${obj[cc.phone]}</a></div>`;
  }
  return `
   <div id="content" style="z-index:5">
     <div id="siteNotice"></div>
     <div id="firstHeading" class="popup-title">${obj.Name}</div>
     <div class="popup-bldg">${obj[cc.bldg]}</div>
    <div class="popup-street">${obj[cc.street]}</div>
    <div class="popup-city">${obj[cc.city]}</div>
      <div id="bodyContent">
      <div><a href="${obj.directionsUrl}" target="_blank">Directions</a></div>
      ${phone}
         <strong>Hours</strong>
          ${hours}      
      </div>
    </div>
    `;
}
function iconisize(addr) {
  return new google.maps.MarkerImage(
    addr,
    null,
    null,
    null,
    new google.maps.Size(20, 20)
  );
}
function setDistancesFrom(latlng) {
  app.places.forEach(el => {
    el.distance =
      calcCrowDistKM(latlng.lat, latlng.lng, el.lat, el.lng) * 0.621371; //to miles.
  });
}

function sortByDist() {
  app.places.sort((x, y) => x.distance - y.distance);
}

function locateUser(map) {
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        app.message = "You have been located! :)";
        app.userLocation = pos;
        let marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your location",
          icon: "./images/curloc.svg" //iconisize(icons.dd)
        });
        setDistancesFrom(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation) {
    if (browserHasGeolocation) {
      app.message = "Geolocation failed to find you. :(";
    } else {
      app.message = "Geolocation unsupported by your browser. :(";
    }
  }
}

//must be done after map loads. accordions are in popups.
function initializeAccordions() {
  console.log("initing");
  let acc = document.getElementsByClassName("accordion");
  console.log("acc is", acc);
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      console.log("OUCH", acc[i]);
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

let icons = {
  //dining dollars
  dd:
    "https://union.ku.edu/sites/union.ku.edu/files/images/general/cuisine-cash.svg",
  //meal swipe
  ms:
    "https://union.ku.edu/sites/union.ku.edu/files/images/general/meal-swipe.svg",
  //cash
  cash: "https://union.ku.edu/sites/union.ku.edu/files/images/general/cash.svg",
  //beak -em bucks
  bb:
    "https://union.ku.edu/sites/union.ku.edu/files/images/general/beak-em-bucks.svg"
};

function calcCrowDistKM(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// $(document).ready(function() {
//   $("#myTable").DataTable();
// });

function round(number, precision) {
  var shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

jQuery(function() {
  jQuery("#menu-date").datepicker({
    dateFormat: "m/d/yy",
    defaultDate: 0
  });
});
