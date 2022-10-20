import './style.css';

const div = document.getElementById('weather');
const error= document.getElementById('error');
const title= document.getElementById('title');
const city= document.getElementById('city');
const desc= document.getElementById('desc');
const temp= document.getElementById('temp');
const feelslike= document.getElementById('feelslike');
const humidity= document.getElementById('humidity');
const pressure= document.getElementById('pressure');
const tempmin= document.getElementById('tempmin');
const tempmax= document.getElementById('tempmax');
const sunrise= document.getElementById('sunrise');
const sunset= document.getElementById('sunset');
const wind= document.getElementById('wind');
const clouds= document.getElementById('clouds');


let degrees = ['imperial'];
let b=['London','°F'];

const why= document.getElementById('why');
if(why)
{
document.getElementById("why").addEventListener('change', collectValue);
}
document.getElementById("celsius").addEventListener('click', degreesChange);

function degreesChange(){
let degree = document.getElementById('celsius');
if(degree.innerHTML === 'Display in °C')
{
degrees[0] = 'metric';
degree.innerHTML='Display in °F';
b[1]='°C';
doThing();
}
else if(degree.innerHTML==='Display in °F')
{
    degrees[0] = 'imperial';
    degree.innerHTML='Display in °C';
    b[1]='°F'
    doThing();
}
}
function collectValue(){
   
    b[0]=this.value;
    doThing();
}
async function doThing(){
    try{
        let c=b[0];
        let a= degrees[0];
        let d=b[1];
        const response = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${c}&APPID=d7a169e5f5b1bf9adf3730d3e25b4834&units=${a}`, {mode: 'cors'})      
        const data = await response.json();
        title.textContent= data.weather[0].main;
        desc.textContent= firstLetter(data.weather[0].description);
        city.textContent= data.name;
        let time = data.timezone;
        let hour=getDate(time);
        timezone.textContent=hour.toLocaleString();
        div.textContent= `${data.main.temp} ${d}`;
        temp.textContent=`${data.main.temp} ${d}`;
        feelslike.textContent=`${data.main.feels_like} ${d}`;
        humidity.textContent=`${data.main.humidity}%`;
        pressure.textContent=`${data.main.pressure}`;
        tempmin.textContent=`${data.main.temp_min} ${d}`;
        tempmax.textContent=`${data.main.temp_min} ${d}`;
        let rise = data.sys.sunrise;
        console.log(rise)
        sunrise.textContent=getUnix(rise,hour) + 'AM';
        let set = data.sys.sunset;
        sunset.textContent=getUnix(set,hour) + 'PM';
        wind.textContent=`${data.wind.speed}`;
        clouds.textContent=`${data.clouds.all} %`;
        error.innerHTML='';
    }
  catch(err){
error.innerHTML=`you just made a city name bro. don't waste my time. you are smarter than this.`;

  }
  }
doThing();
  fetch('http://api.openweathermap.org/data/2.5/weather?q=LONDON&APPID=d7a169e5f5b1bf9adf3730d3e25b4834&units=metric', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response)
    })
  .catch(e => {
    console.log(e)
  })


  function getDate(times){
    let d = new Date();
    let a=times/3600;
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    var nd = new Date(utc + (3600000*a));
    return nd;
  }

  function firstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getUnix(timez,hourz)
  {
let date = new Date(timez * 1000)
console.log(date)

// Hours part from the timestamp
let hours = date.getHours();
// Minutes part from the timestamp
let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
let seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime;
  }