function toggleBulb() {
    var bulb = document.getElementById("bulb");
    let btn = document.getElementsByTagName("button")[0]
    
    if (bulb.className === "off") {
        bulb.className = "on";
        btn.textContent = "off"
    } else {
        bulb.className = "off";
        btn.textContent = "on"
    }
}