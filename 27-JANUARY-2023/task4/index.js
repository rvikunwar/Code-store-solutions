
    // JavaScript list of cities
    var cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

    // Get references to the "from" and "to" dropdown elements
    var fromCitySelect = document.getElementById("from-city");
    var toCitySelect = document.getElementById("to-city");

    // Function to populate the dropdown menus with options
    function populateDropdowns() {
        for (var i = 0; i < cities.length; i++) {
            var fromOption = document.createElement("option");
            fromOption.value = cities[i];
            fromOption.text = cities[i];
            console.log(fromOption, 'form')
            fromCitySelect.appendChild(fromOption);

            var toOption = document.createElement("option");
            toOption.value = cities[i];
            toOption.text = cities[i];
            toCitySelect.appendChild(toOption);
        }
    }

    // Call the function to populate the dropdowns
    populateDropdowns();

    // Add event listeners to the "from" and "to" dropdown elements
    fromCitySelect.addEventListener("change", function() {
        var selectedFromCity = this.value;
        for (var i = 0; i < toCitySelect.options.length; i++) {
            if (toCitySelect.options[i].value === selectedFromCity) {
                toCitySelect.options[i].classList.add("disabled");
                toCitySelect.options[i].disabled = true;
            } else {
                toCitySelect.options[i].classList.remove("disabled");
                toCitySelect.options[i].disabled = false;
            }
        }
    });

    toCitySelect.addEventListener("change", function() {
        var selectedToCity = this.value;
        for (var i = 0; i < fromCitySelect.options.length; i++) {
            if (fromCitySelect.options[i].value === selectedToCity) {
                fromCitySelect.options[i].classList.add("disabled");
                fromCitySelect.options[i].disabled = true;
            } else {
                fromCitySelect.options[i].classList.remove("disabled");
                fromCitySelect.options[i].disabled = false;
            }
        }
    })
    