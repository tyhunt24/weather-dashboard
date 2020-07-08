function displayWeather(event){
     event.preventDefault();
     var userLocation = $("#searchInput").val()
     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=cf9b5b3a1e8e73235be6a1620503c21f&units=imperial` ;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        // console.log(response)
      $("#cityName").text(response.name)
      $("#currentTemp").text("Temperature: " + response.main.temp + "F")
      $("#currentHumidity").text("Humidity: " + response.main.humidity + "%")
      $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + " MPH")
    // ! get the current UV index
    })
 }

function displayFiveDayWeather(event){
    event.preventDefault();
    var userLocation = $("#searchInput").val()
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=cf9b5b3a1e8e73235be6a1620503c21f&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        // ! how do i get each day to be on the screen
        var results = response.list
        $(".row").empty()
        for(var i = 0; i < results.length; i += 8){
            var col = $("<div class = 'col-lg-3'>") 
            var card = $("<div class= 'card'>")
            var cardBody = $("<div class= 'card-body'>")
            var date = $("<h3>")
            // ! set the date of each day. 
            var dailyTemp = $("<h6>")
            dailyTemp.text("Temperature: " + results[i].main.temp + "F")
            var dailyHumidity = $("<h6>")
            dailyHumidity.text("Humidity: " + results[i].main.humidity + "%")
            var dailyWind = $("<h6>")
            dailyWind.text("Wind Speed: " + results[i].wind.speed + " MPH")

            //push everything to the screen
            col.append(card)
            card.append(cardBody)
            cardBody.append(date, dailyTemp, dailyHumidity, dailyWind)
            $(".row").append(col)

        }
     
    })
    
}

 $("#searchBtn").on("click", displayWeather)
 $("#searchBtn").on("click", displayFiveDayWeather)


