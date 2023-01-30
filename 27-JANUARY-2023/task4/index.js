var cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

function disableCity() {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    if (from == to) {
        alert("You cannot travel from your own city!");
        document.getElementById("from").value = "None";
        document.getElementById("to").value = "None";
    }

    for (var i = 0; i < cities.length; i++) {
        console.log(from, '==', cities[i])
        if (cities[i] == from) {
            // console.log(document.getElementById("to").options[i+1])
            document.getElementById("to").options[i+1].disabled = true;
        } else if (cities[i] == to) {
            document.getElementById("from").options[i+1].disabled = true;
        } else {
            document.getElementById("to").options[i+1].disabled = false;
            document.getElementById("from").options[i+1].disabled = false;

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

    var newRoute = document.createElement("li");
    newRoute.innerHTML = from + " - " + to;
    route.appendChild(newRoute);
}