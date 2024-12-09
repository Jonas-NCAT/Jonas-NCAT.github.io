//The code inside this function will only run once the entire HTML document has fully loaded, ensuring that all DOM elements are available to be manipulated. 

$(document).ready(function () {
    // Fetch local time for Berlin, Germany
    //This section sets up the function getLocalTime(), which is responsible for fetching the local time in Berlin using the TimeZoneDB API.
    function getLocalTime() {
        const apiKey = "S3ZHD4FMWOHA"; // TimeZoneDB , stores the API key necessary to authenticate the request to TimeZoneDB (a third-party service that provides time zone data).
        const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/Berlin`; // This is the URL to which the GET request is sent, incorporating the API key and the specific time zone (Europe/Berlin).

        //AJAX request using jQuery's $.ajax() function to fetch data from the API.

        //Success Callback:
        //If the request is successful, the success function is triggered with the response data as its argument.
        //The function checks if data.formatted (the time in the response) exists. If it does, it creates a Date object from data.formatted and formats it into a readable string using toLocaleString().
        //This formatted time is then displayed in the HTML element with ID #local-time using jQuery's .text() method.

        //Error Callback:
        //If the request fails (due to issues like network errors or invalid API keys), the error function is triggered.
        //The error function logs the error to the console for debugging and updates the #local-time element with a message indicating that fetching the time has failed.


        $.ajax({
            url: apiUrl, //tells jQuery to send the GET request to the apiUrl defined earlier.
            method: "GET",
            success: function (data) {
                if (data && data.formatted) {
                    // Extract the datetime from the response and format it
                    const localTime = new Date(data.formatted);
                    const formattedTime = localTime.toLocaleString(); // Converts to readable string
                    $("#local-time").text(`Local time in Berlin, Germany: ${formattedTime}`);
                } else {
                    $("#local-time").text("Unexpected response format. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}, Status: ${status}, Response: ${xhr.responseText}`);
                $("#local-time").text("Failed to retrieve the time. Please try again.");
            }
        });
    }


    // Fetch weather data for Berlin, Germany
    // OpenWeatherMap API key, stores the API key for the OpenWeatherMap service.
    //City is set to "Berlin", specifying the city for which weather data is being requested.
    //apiUrl is the URL for the OpenWeatherMap API, which includes the city name, API key, and the units=imperial query parameter to get the temperature in Fahrenheit.
  
    const apiKey = "a1cabc272d1b259442b247df2a49742c";  // OpenWeatherMap API key
    const city = "Berlin";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;


    //Another AJAX request to fetch weather data from the OpenWeatherMap API.
    //url: apiUrl sends a GET request to the apiUrl defined above.
    //method: "GET" specifies that it's a GET request.

    //Success Callback:
    //If the request is successful, the success function processes the weather data returned in data.
    //The function extracts the weather description, temperature, and humidity from the API response
    //data.weather[0].description provides a textual description of the weather.
    //data.main.temp provides the temperature in Fahrenheit.
    //data.main.humidity provides the humidity percentage.
    //These values are then inserted into the HTML elements with IDs #weather-description, #weather-temperature, and #weather-humidity using jQuery's .text() method.

    //Error Callback:
    //If the request fails, the error function is triggered.
    //The error function updates the #weather-widget element with a message saying "Failed to retrieve weather data."
    
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (data) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            $("#weather-description").text(`Weather: ${weatherDescription}`);
            $("#weather-temperature").text(`Temperature: ${temperature}°F`);
            $("#weather-humidity").text(`Humidity: ${humidity}%`);
        },
        error: function () {
            $("#weather-widget").html("<p>Failed to retrieve weather data.</p>");
        }
    });

    // Call the function to get local time when the page is loaded
    getLocalTime();
});