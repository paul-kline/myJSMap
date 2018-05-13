var app = new Vue({
  el: "#app",
  data: {
    message: "getting location...",
    currentSelection: null,
    places: [],
    userLocation: null,
    map: null,
    bounds: null, //cant yet.
    sorter: null,
    closed: false,
    userMarker: null,
    onNewUserLocation: null,
    contextMenu: null
  },
  computed: {
    isNameHeader: function() {
      return {
        "sort-desc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "name-header" &&
          !this.sorter.asc,
        "sort-asc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "name-header" &&
          this.sorter.asc
      };
    },
    isDistanceHeader: function() {
      return {
        "sort-desc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "distance-header" &&
          !this.sorter.asc,
        "sort-asc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "distance-header" &&
          this.sorter.asc
      };
    },
    isStatusHeader: function() {
      return {
        "sort-desc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "status-header" &&
          !this.sorter.asc,
        "sort-asc":
          this.sorter &&
          this.sorter.id &&
          this.sorter.id == "status-header" &&
          this.sorter.asc
      };
    }
  }
});

function onSort(elem) {
  let asc = false;
  if (app.sorter && app.sorter.id && elem.id == app.sorter.id) {
    asc = !app.sorter.asc;
  }
  console.log("setting sorter id to", elem.id, asc);
  app.sorter = {
    id: elem.id,
    asc: asc
  };
  doSort();
}

function getSorter() {
  if (app.sorter.id == "name-header") return nameF(app.sorter.asc);
  if (app.sorter.id == "status-header") return statusF(app.sorter.asc);
  if (app.sorter.id == "distance-header") return distF(app.sorter.asc);
  return null;
}
function doSort() {
  placesSort(getSorter());
}
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
  var map = new google.maps.Map(document.getElementById("map"), {
    // zoom: 15,
    // center: center.center,
    mapTypeControl: false
    // ,
    // gestureHandling: "greedy"
  });
  // map.setOptions({ minZoom: 15 });

  definePopupClass();

  var mousedUp = false;
  google.maps.event.addListener(map, "mousedown", function(event) {
    mousedUp = false;
    setTimeout(function() {
      if (mousedUp === false) {
        console.log("longpress detected", event);
        handleContextMenu(event, map);
      }
    }, 500);
  });
  google.maps.event.addListener(map, "dragstart", function(event) {
    mousedUp = true;
  });
  google.maps.event.addListener(map, "mouseup", function(event) {
    mousedUp = true;
  });
  //set up context menu:
  app.d = document.getElementById("content");
  var contextMenu = google.maps.event.addListener(map, "rightclick", function(
    event
  ) {
    handleContextMenu(event, map);
  });

  recenter(map);
  maploaded(map);
  affixToTop(map);
  genmapControls();
}
function handleContextMenu(event, map) {
  app.d.innerHTML = `<span style="cursor:pointer;" onclick="rightclickPos(${event.latLng.lat()},${event.latLng.lng()})">I'm here</span><span class="w3-btn" onclick="app.contextMenu.setMap(null)">&times;</span>`;
  app.d.style.display = "block";
  if (app.contextMenu) {
    app.contextMenu.setMap(null);
  } else {
  }
  app.contextMenu = new Popup(event.latLng, app.d);
  app.contextMenu.setMap(map);
  window.pop = app.contextMenu;
  console.log(event);
}
function rightclickPos(lat, lng) {
  handleNewUserPosition({ lat: lat, lng: lng });

  if (app.onNewUserLocation) {
    navigator.geolocation.clearWatch(app.onNewUserLocation);
    app.onNewUserLocation = null;
  }
  if (app.contextMenu) {
    app.contextMenu.setMap(null);
  }
}
/** Defines the Popup class. */
function definePopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  Popup = function(position, content) {
    this.position = position;

    content.classList.add("popup-bubble-content");

    var pixelOffset = document.createElement("div");
    pixelOffset.classList.add("popup-bubble-anchor");
    pixelOffset.appendChild(content);

    this.anchor = document.createElement("div");
    this.anchor.classList.add("popup-tip-anchor");
    this.anchor.appendChild(pixelOffset);

    // Optionally stop clicks, etc., from bubbling up to the map.
    this.stopEventPropagation();
  };
  // NOTE: google.maps.OverlayView is only defined once the Maps API has
  // loaded. That is why Popup is defined inside initMap().
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.anchor);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  };

  /** Called when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the popup when it is far out of view.
    var display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? "block"
        : "none";

    if (display === "block") {
      this.anchor.style.left = divPosition.x + "px";
      this.anchor.style.top = divPosition.y + "px";
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  };

  /** Stops clicks/drags from bubbling up to the map. */
  Popup.prototype.stopEventPropagation = function() {
    var anchor = this.anchor;
    anchor.style.cursor = "auto";

    [
      "click",
      "dblclick",
      "contextmenu",
      "wheel",
      "mousedown",
      "touchstart",
      "pointerdown"
    ].forEach(function(event) {
      anchor.addEventListener(event, function(e) {
        e.stopPropagation();
      });
    });
  };
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
  }); // can I move this earlier?

  console.log("map loaded!");
  app.bounds = new google.maps.LatLngBounds();
  app.map = map;
  oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });
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
      // map: map,
      title:
        cur.Name + (cur.Building.length > 0 ? " (" + cur.Building + ")" : ""),
      zIndex: 3,
      label: cur.label
      //   ,
      //   icon: iconisize(icons.dd)
    });
    oms.addMarker(marker);
    cur.marker = marker;
    let infowindow = new google.maps.InfoWindow({
      content: buildPopup(cur)
    });
    cur.infowindow = infowindow;
    marker.addListener("spider_click", function() {
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
        // oem.addMarker(e.marker);
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
  app.closed = false;
  if (app.currentSelection) {
    app.currentSelection.infowindow.close();
  }
  //order to front of list if from map.
  if (fromMap) {
    // [e] = app.places.splice(app.places.indexOf(place), 1);
    // app.places.unshift(e);
    // console.log(e);
    // app.currentSelection = e;
    app.currentSelection = place;
    setTimeout(() => {
      document.getElementsByClassName("active")[0].scrollIntoView();
    }, 100);

    //scroll to top:
    // scrollToTop();
  } else {
    app.currentSelection = place;
  }

  let marker = app.currentSelection.marker;
  app.currentSelection.infowindow.open(map, marker);
  //if the click was from the list I want to center the map horizontally now that the info window has been opened.
  if (!fromMap) {
    let lat = app.map.getCenter().lat();
    let lng = app.currentSelection.lng;
    app.map.setCenter({ lat: lat, lng: lng });
  }
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
      calcCrowDistKM(latlng.lat, latlng.lng, el.lat, el.lng) * 0.621371;
  });

  if (app.sorter && app.sorter.id == "distance-header") {
    doSort();
  } else {
    app.$forceUpdate();
  }
}

function sortByDist() {
  app.sorter = {
    id: "distance-header",
    asc: false
  };
  doSort();
}

function distF(asc = true) {
  return _fcreator(asc, "distance");
}

function _fcreator(asc, prop) {
  let strcmp = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  let numcmp = (x, y) => x - y;

  if (asc) {
    return (x, y) =>
      typeof x[prop] == "string"
        ? strcmp(y[prop], x[prop])
        : numcmp(y[prop], x[prop]);
  } else {
    return (x, y) =>
      typeof x[prop] == "string"
        ? strcmp(x[prop], y[prop])
        : numcmp(x[prop], y[prop]);
  }
}

function nameF(asc = true) {
  return _fcreator(asc, cc.name);
}
function statusF(asc = true) {
  return _fcreator(asc, cc.open);
}

function placesSort(f, arr = app.places) {
  arr.sort(f);
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
        let markerImage = new google.maps.MarkerImage(
          "./images/curloc.svg",
          new google.maps.Size(48, 48),
          new google.maps.Point(0, 0),
          new google.maps.Point(24, 24)
        );
        let marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your location",
          icon: markerImage, //"./images/curloc.svg", //iconisize(icons.dd)
          draggable: true,
          zIndex: -1
        });
        marker.addListener("dragend", obj => {
          console.log(obj);
          let pos = {
            lat: obj.latLng.lat(),
            lng: obj.latLng.lng()
          };
          handleNewUserPosition(pos);

          if (app.onNewUserLocation) {
            navigator.geolocation.clearWatch(app.onNewUserLocation);
            app.onNewUserLocation = null;
          }
          //turn off recalculations.
        });

        userLoc = marker;
        app.userMarker = marker;
        setDistancesFrom(pos);
        sortByDist();
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );

    app.onNewUserLocation = navigator.geolocation.watchPosition(position => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      handleNewUserPosition(pos);
    });
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
function handleNewUserPosition(pos) {
  app.message = "Location updated!";

  console.log("position changed:", pos);
  app.userMarker.setPosition(pos);
  app.userLocation = pos;
  setDistancesFrom(pos);
}
//must be done after map loads. accordions are in popups.
function initializeAccordions() {
  console.log("initing");
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    console.log("adding accordion to:", acc[i]);
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active-acc");
      var panel = this.previousElementSibling;
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

function openTab(evt, tabid) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab-contents");
  tablinks = document.getElementsByClassName("tablink");
  if (tablinks.length <= 1) {
    currentTabIndex = 0;
    return;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
    if (tablinks[i] == evt.currentTarget) {
      currentTabIndex = i;
    }
  }
  document.getElementById(tabid).style.display = "block";
  console.log("curTabIndex :", currentTabIndex);
  // evt.currentTarget.firstElementChild.className += " w3-border-red";
  evt.currentTarget.className += " w3-border-red";
}

// $(document).ready(function() {
//   placesTable = createTable("myTable");
// });

// function refreshDataTable(table = placesTable) {
//   console.log("resfresh");
//   table.destroy();
//   table = createTable();
// }
// function createTable(name = "myTable") {
//   return $(`#${name}`).DataTable();
// }

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

window.addEventListener(
  "DOMContentLoaded",
  function() {
    initializeAccordions();
    initializeSwipe();
  },
  false
);

let touchObj = { start: [0, 0], end: [0, 0], touchThreshhold: 10 };
let currentTabIndex = 0;
function initializeSwipe() {
  let gestureZone = document.getElementById("gestureZone");
  gestureZone.addEventListener("scroll", console.log);

  gestureZone.addEventListener(
    "touchstart",
    function(event) {
      touchObj.start[0] = event.changedTouches[0].screenX;
      touchObj.start[1] = event.changedTouches[0].screenY;
    },
    false
  );

  gestureZone.addEventListener(
    "touchend",
    function(event) {
      touchObj.end[0] = event.changedTouches[0].screenX;
      touchObj.end[1] = event.changedTouches[0].screenY;
      handleGesture();
    },
    false
  );
}

function handleGesture() {
  let hdir = touchObj.end[0] - touchObj.start[0]; //x
  let vdir = touchObj.end[1] - touchObj.start[1]; // y
  if (
    Math.abs(hdir) < 3 * Math.abs(vdir) ||
    Math.abs(hdir) < touchObj.touchThreshhold
  ) {
    console.log("not a swipe!");
  } else {
    console.log(hdir);
    let col = document.getElementsByClassName("tablink");
    //right is negative, to left is positive
    if (hdir > 0) {
      //swipe to left.
      console.log("left swipe sensed");
      if (currentTabIndex > 0) {
        col[currentTabIndex - 1].click();
      }
    } else {
      //swipe to right.

      console.log("right swipe sensed");
      if (currentTabIndex < col.length - 1) {
        col[currentTabIndex + 1].click();
      }
    }
  }
}
