function prayerTimes(latitude, longitude) {
  fetch(
    "https://api.aladhan.com/v1/calendar/2024/4?latitude=" +
      latitude +
      "508515&longitude=" +
      longitude +
      "&method=11"
  )
    .then((response) => response.json())
    .then(function (response) {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[0].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");
      let tableBody = document.createElement("tbody");

      for (i in data) {
        let row = tableBody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tableBody.appendChild(row);
        table.appendChild(tableBody);
      }
      table.appendChild(tableBody);
      app.appendChild(table);

      //   console.log(today);
      //   console.log(response.data[today]);
    });
}

function success(position) {
  prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
  prayerTimes("-6.200000", "106,816666");
}

function userLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation tidak didukung oleh browser anda");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function index() {
  let app = document.getElementById("app");
  let h3 = document.createElement("h3");
  h3.innerHTML = "Prayer Times";
  app.appendChild(h3);
  userLocation();
}
index();
