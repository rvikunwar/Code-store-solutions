var cities = ["New York", "Los Angeles", "Chicago", "Kolkata", "Chennai", "Mumbai", "Jaipur", "San Diego", "Dallas", "San Jose"];
var routesArray = []

function disableCity() {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    let filteredToCity;
    let filteredFromCity;

    if (from == to) {
        alert("You cannot travel from your own city!");
        document.getElementById("from").value = "None";
        document.getElementById("to").value = "None";
    }

    if(from){
        filteredToCity = routesArray.filter((city) => city.from == from)
    } if(from){
        filteredFromCity = routesArray.filter((city) => city.to == to)
    } 

    // console.log(filteredFromCity, filteredToCity)

    for (var i = 0; i < cities.length; i++) {
        // console.log(from, '==', cities[i])
        if(filteredFromCity){
            filteredFromCity.forEach((city) => {
                if(city.from == cities[i]){
                    document.getElementById("from").options[i+1].disabled = true;
                }
            })
        }
        if(filteredToCity){
            filteredToCity.forEach((city) => {
                if(city.to == cities[i]){
                    console.log(city.to, cities[i])
                    document.getElementById("to").options[i+1].disabled = true;
                }
            })
        }

        if (cities[i] == from) {
            // console.log(document.getElementById("to").options[i+1])
            document.getElementById("to").options[i+1].disabled = true;
        } else if (cities[i] == to) {
            document.getElementById("from").options[i+1].disabled = true;
        }
    }
}

function addData() {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var route = document.getElementById("route");

    // console.log(from, to)
    if(from === 'None' || to === 'None' || from == "" || to == ""){
        alert("Please select a source and destination.");
        return;
    }

    var existingRoutes = route.innerHTML;
    if (existingRoutes.indexOf(from + " - " + to) != -1) {
        alert("Route already added.");
        return;
    }

    routesArray.push({
        from, 
        to
    })

    var newRoute = document.createElement("li");
    newRoute.innerHTML = from + " - " + to;
    route.appendChild(newRoute);
    document.getElementById("from").value = "None";
    document.getElementById("to").value = "None";

    for (var i = 0; i < cities.length; i++) {
        document.getElementById("to").options[i+1].disabled = false;
        document.getElementById("from").options[i+1].disabled = false;
    }
}