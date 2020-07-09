var citiesSearched = JSON.parse(localStorage.getItem("searchHistory"));


function displayWeather(event){
     event.preventDefault();
     var userLocation = $("#searchInput").val()
     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=cf9b5b3a1e8e73235be6a1620503c21f&units=imperial` ;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
     var date = moment().format("dddd, MMMM Do")
      $("#cityName").text(response.name)
      var iconCode = response.weather[0].icon;
      var iconURL  = "http://openweathermap.org/img/w/" + iconCode + ".png";
     $("#currentTime").text(date)
      $("#currentIcon").attr('src', iconURL)
     $("#currentTemp").text("Temperature: " + response.main.temp + "F")
      $("#currentHumidity").text("Humidity: " + response.main.humidity + "%")
      $("#currentWindSpeed").text("Wind Speed: " + response.wind.speed + " MPH")
      displayUVIndex(response.coord.lat, response.coord.lon)

      var cities =  $("#searchInput").val()
      citiesSearched.push(cities)
      localStorage.setItem("searchHistory", JSON.stringify(citiesSearched))
     })
 }

 function displayUVIndex(lat, lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?&appid=cf9b5b3a1e8e73235be6a1620503c21f&units=imperial&lat=${lat}&lon=${lon}` ;
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
        $("#currentUVIndex").text("UV Index: " + response.value)
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
        // console.log(response)
        // ! how do i get each day to be on the screen
        var results = response.list
        console.log(results);
        
        $(".row").empty()
        for(var i = 0; i < results.length; i += 8){
          var dates =  results[i].dt_txt.split(" ")[0]
            var col = $("<div class = 'col-lg-3'>") 
            var card = $("<div class= 'card'>")
            var cardBody = $("<div class= 'card-body'>")
            var date = $("<h3>")
            // var futureImg = results.weather.icon;
            // console.log(futureImg)
            // var futureIconUrl = "http://openweathermap.org/img/w/" + futureImg + ".png";
            // var image = $("<img>")
            // $(image).attr("src", futureIconUrl) 
            // ! get the icon for each day.
            var nextDate = $("<h6>")
            nextDate.text(dates)
            var dailyTemp = $("<h6>")
            dailyTemp.text("Temperature: " + results[i].main.temp + "F")
            var dailyHumidity = $("<h6>")
            dailyHumidity.text("Humidity: " + results[i].main.humidity + "%")
            var dailyWind = $("<h6>")
            dailyWind.text("Wind Speed: " + results[i].wind.speed + " MPH")

            //push everything to the screen
            col.append(card)
            card.append(cardBody)
            cardBody.append(nextDate, dailyTemp, dailyHumidity, dailyWind,)
            $(".row").append(col)

        }
     
    })
    
}
$("#searchBtn").on("click", displayWeather)
$("#searchBtn").on("click", displayFiveDayWeather)


