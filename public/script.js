var searchElement = document.getElementById("search_input");

function initMap() {
  const searchBox = new google.maps.places.SearchBox(searchElement);
  searchBox.addListener("places_changed", () => {
    const place = searchBox.getPlaces()[0];
    const loc = place.name;
    if (place == null) return;
    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        place: place,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data, loc);
      });
  });
}
const timeHtml = document.getElementById("time");
const dateHtml = document.getElementById("date");
const dayNightHtml = document.getElementById("day-night");
var wIcon = document.getElementById("w-icon");
const tempHtml = document.getElementById("temp");
const locHtml = document.getElementById("location");
const minTempHtml = document.getElementById("minTemp");
const maxTempHtml = document.getElementById("maxTemp");
var mainHtml = "";
const descHtml = document.getElementById("desc");
const bodyHtml = document.getElementsByTagName("body");

function setDateTime() {
  const d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let hrs = d.getHours();
  let flag = 0;
  if (hrs > 12) {
    hrs -= 12;
    flag = 1;
  }
  if (hrs > 11) flag = 1;
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  const day = days[d.getDay()];
  const month = months[d.getMonth()];
  const date = d.getDate();

  timeHtml.textContent = `${hrs}:${min} ${flag ? "PM" : "AM"}`;
  dateHtml.textContent = `${day} | ${month} ${date}`;

  const hrs2 = d.getHours();
  if (hrs2 > 18 || hrs2 < 6) {
    dayNightHtml.style.color = "grey";
    dayNightHtml.innerHTML = `<i class="fa-solid fa-moon "></i>`;
    bodyHtml[0].style.background =
      "linear-gradient(to bottom, rgba(9,6,84,1) 0%, rgba(116,178,250,1) 100%) ";
  }
}

setDateTime();
setInterval(setDateTime, 60000);

function setWeatherData(data, loc) {
  const d = new Date();
  tempHtml.textContent = Math.floor(data.main.temp - 273);
  locHtml.textContent = loc;
  minTempHtml.textContent = Math.floor(data.main.temp_min - 273);
  maxTempHtml.textContent = Math.floor(data.main.temp_max - 273);
  descHtml.innerHTML = data.weather[0].description;
  mainHtml = data.weather[0].main;

  if (mainHtml == "Thunderstorm")
    wIcon.innerHTML = `<i class="fa-solid fa-cloud-bolt fa-beat" style="color: #616161;"></i>`;
  else if (mainHtml == "Drizzle" || mainHtml == "Rain")
    wIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy fa-beat "style="color: #616161;" ></i>`;
  else if (mainHtml == "Snow")
    wIcon.innerHTML = `<i class="fa-regular fa-snowflake fa-beat" style="color: #bdceea;"></i>`;
  else if (
    mainHtml == "Mist" ||
    mainHtml == "Fog" ||
    mainHtml == "Haze" ||
    mainHtml == "Smoke"
  )
    wIcon.innerHTML = `<i class="fa-solid fa-smog fa-beat" style="color: #828487;"></i>`;
  else if (mainHtml == "Clouds")
    wIcon.innerHTML = `<i class="fa-solid fa-cloud fa-beat" style="color: #b6d2f7;"></i>`;
  else if (mainHtml == "Clear") {
    if (d.getHours() > 18 || d.getHours() > 6) {
      wIcon.innerHTML = `<i class="fa-solid fa-sun fa-beat" style="color: #f5ac0f; "></i>`;
    } else {
      wIcon.innerHTML = `<i class="fa-solid fa-moon fa-beat" style="color: #57595c;"></i>`;
    }
  }
}
