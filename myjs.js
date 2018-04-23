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

function initMap() {
  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: center.center
    // ,
    // gestureHandling: "greedy"
  });
  map.setOptions({ minZoom: 15 });
  maploaded(map);
  affixToTop(map);
}

function affixToTop(map) {
  let el = document.getElementById("map");
  el.style.position = "fixed";
  el.top = "0px";
  el.left = "0px";
  console.log("all set", el);
}
function maploaded(map) {
  console.log("map loaded!");
  app.bounds = new google.maps.LatLngBounds();
  app.map = map;
  loadIntoMap(map, fooddata);
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
    map.fitBounds(app.bounds);
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
function buildPopup(obj) {
  return `
   <div id="content">
     <div id="siteNotice"></div>
     <h2 id="firstHeading" class="firstHeading">${obj.Name}</h2>
      <div id="bodyContent">
        <strong>Hours</strong>
        <ul>
          <li>${obj.hours1} </li>
          <li>${obj.hours2} </li>
          <li>${obj.hours3} </li>
        </ul>

    
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
