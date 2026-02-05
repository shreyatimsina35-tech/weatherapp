$(document).ready(function() {
    const apiKey = 'a76d6ae3e021a0b8972aa88394859e9c';


    // 1. Search Button Logic
    $('#searchBtn').click(function() {
        const city = $('#cityInput').val();
        
        if (city === '') {
            alert("Please enter a city name!");
            return;
        }


        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
            type: "GET",
            success: function(data) {
                $('#cityName').text(data.name);
                $('#temp').text(`${Math.round(data.main.temp)}°C`);
                $('#desc').text(data.weather[0].description.toUpperCase());
                $('#humidity').text(`Humidity: ${data.main.humidity}%`);
                
                const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                $('#weatherIcon').attr('src', iconUrl);

                $('#weatherInfo').fadeIn(); // Smoothly show the data
            },
            error: function() {
                alert("City not found. Please try again.");
            }
        });
    });

    // 2. Clear Button Logic
    $('#clearBtn').click(function() {
        // Clear the input field
        $('#cityInput').val('');
        
        // Hide the weather display with a fade effect
        $('#weatherInfo').fadeOut(function() {
            // Optional: Completely clear the text after hiding
            $('#cityName, #temp, #desc, #humidity').text('');
            $('#weatherIcon').attr('src', '');
        });
    });
});

