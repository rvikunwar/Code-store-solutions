function drawPattern(){
    let value = parseInt(document.querySelector("#rows").value);
    let content = document.querySelector("#content")
    let content2 = document.querySelector("#content2")

    let content_ = ""
    for(let j=1; j <= value; j++){
        let printValue = 1;
        for(let i=1; i <= (value*2-1); i++){
            if(i> value-j && i< value+j){
                content_ += `<span>${printValue}</span>`
                printValue++;
            } else {
                content_ += "&nbsp;&nbsp;&nbsp;&nbsp";
            }
        }
        content_ +='<br/>';
    }

    content.innerHTML = content_;


    let content2_ = "";
    for(let j=1; j <= value; j++){
        for(let i=1; i <= value; i++){
            if(j === 1 || j===value || i === value || i ===1){
                content2_ += "<span>*</span>";
            } else {
                content2_ += "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
        }
        content2_ +='<br/>';
    }

    content2.innerHTML = content2_;

}