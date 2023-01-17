

const filterForm = () => {
    let minVal = document.getElementById("minPrice").value
    let maxVal = document.getElementById("maxPrice").value
    let FILTERED_HOODIES = [];

    for(let hoodie of HOODIES){
        if(hoodie.price >= parseFloat(minVal) && hoodie.price <= parseFloat(maxVal)){
            FILTERED_HOODIES.push(hoodie.name + " - " + hoodie.price);
        }
    }

    let outputBox = document.getElementById("output");

    for(let hoodie of FILTERED_HOODIES){
        outputBox.innerHTML += `<h3>${hoodie}</h3>`;
    }
}