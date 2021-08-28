document.addEventListener(
    "DOMContentLoaded", () => { // After contents of DOM loaded

        // Open Weather Map API Key
        const openWeatherAPIKey = "a28ce4ffbfe900a07612f4bc4f36eed4";

        // DOM elements
        const errorMsg = document.getElementById("error-msg");
        const inputCity = document.getElementById("input-city");
        const resultDisp = document.getElementById("display");

        // API data receiver
        const getData = (src) => {
            fetch(src)
                .then(response => response.json())
                .then(data => handleData(data))
                .catch(err => handleError(err.message));
        };

        // Error handler upon receiving from API
        const handleError = (error) => {
            console.log(error);
        };

        // API data handler upon receiving
        const handleData = (data) => {
            if (data.message === undefined) {
                errorMsg.style.opacity = "0";
                errorMsg.style.display = "none";
                // console.log(JSON.stringify(data)); // test print
                document.getElementById("temp-kel").innerText = data.main.temp.toFixed(2);
                document.getElementById("temp-fah").innerText = kelvinToFahrenheit(data.main.temp).toFixed(2);
                document.getElementById("temp-cel").innerText = fahrenheitToCelsius(kelvinToFahrenheit(data.main.temp)).toFixed(2);
                document.getElementById("humid").innerText = data.main.humidity;
                document.getElementById("wind").innerText = data.wind.speed;
                document.getElementById("sunrise").innerText = data.sys.sunrise;
                document.getElementById("sunset").innerText = data.sys.sunset;
                document.getElementById("city").innerText = data.name;
                document.getElementById("country").innerText = data.sys.country;
                resultDisp.style.opacity = "1";
            } else {
                errorMsg.style.opacity = "1";
                errorMsg.style.display = "block";
                resultDisp.style.opacity = "0";
            }
        };

        // Kelvin to Fahrenheit converter
        const kelvinToFahrenheit = (kelvin) => {
            return ((kelvin - 273.15) * 9) / 5 + 32;
        };

        // Fahrenheit to Celsius converter
        const fahrenheitToCelsius =
            (fahrenheit) => {
                return ((fahrenheit - 32) * 5) / 9;
            };

        // handle submit button click
        document.getElementById("btn-city")
            .addEventListener("click", (event) => {
                event.preventDefault();
                const cityName = inputCity.value;
                const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + openWeatherAPIKey;
                getData(openWeatherUrl);
                inputCity.value = "";
                // resultDisp.style.opacity = 1;
            });

    } //DOMContentLoaded ends
);