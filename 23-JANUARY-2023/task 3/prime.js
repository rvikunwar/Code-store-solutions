var number_input = document.querySelector("#number_input");
var output = document.querySelector("#output")

function getPrimes(){
    let value = number_input.value;
    // console.log(value)

    // for (let i = 0; i <= value; i++) {
    //     let flag = 0;
    
    //     for (let j = 2; j < i; j++) {
    //         if (i % j == 0) {
    //             flag = 1;
    //             break;
    //         }
    //     }
    
    //     if (i > 1 && flag == 0) {
    //         output.innerHTML += `<span>${i}, </span>`
    //     }
    // }

    let i = 0
    while(i<=value){
        let flag = 0;
    
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
    
        if (i > 1 && flag == 0) {
            output.innerHTML += `<span>${i}, </span>`
        }
        i++;
    }
}