function elements(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = elements("div", "container", "", "");
const h1 = elements("h1", "text-center", "tittle", "Countries Weather");
const row = elements("div", "row", "", "");

const result = fetch("https://restcountribdfes.com/v3.1/all");
result
  .then((data) => data.json())
  .then((ele) => {
    for (let i = 0; i < ele.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
        <div class="card-containter">
        <div class="card h-100">
        <div class="card-header">
        <h5 class="card-tittle text-center">${ele[i].name.common}</h5>
        </div>
        <div class=card-image">
        <img src="${ele[i].flags.svg}" class="card-img-top" alt="Country flags"></div>
        <div class="card-body text-center">
        <p class="card-text">Capital:${ele[i].capital}.</p>
        <p class="card-text">Region:${ele[i].region}.</p>
        <p class="card-text">Country Code:${ele[i].car.signs}.</p>
        <button class=btn btn-primary>Click for weather</button>
      </div>
      </div>
      </div>       
        `;
      row.append(col);
    }

    let button = document.querySelectorAll("button");
    button.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            let latlng = ele[index].latlng;
            let lat = latlng[0];
            let lon = latlng[1];

            let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fcb5a12a64ad8e66224213c7b7f95da9`);
            weather.then((data1)=>data1.json())
            .then((element)=>{
            alert(`Weather of the ${ele[index].name.common} is ${Math.floor(element.main.temp-273.5)}🌡C`);
        })
        .catch((error) => {
            console.error("Error fetching weather");
            alert("Failed to fetch weather data. Please try again.");
        });
    });
  });
})
.catch((error) => {
    console.error("Error fetching restcountries API");
    alert("Failed to fetch API data. Please try again.");
});
container.append(row);
document.body.append(h1, container);
