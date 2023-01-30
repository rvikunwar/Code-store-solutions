const url = "https://dog.ceo/api/breeds/list/all";
let tags = document.getElementById("tags");

function getBreeds() {
    try{
        let response = new Promise((resolve, reject) => {
            fetch(url).then((data)=>{
                resolve(data.json())
            }).catch((err)=>{
                reject(err)
            })
        })
        
        response.then((data)=> { 
            for (const key in data['message']) {
                let newTag = document.createElement("span");
                newTag.innerHTML = key;
                tags.appendChild(newTag);
            }
        })
    } catch(err){
        alert("ERROR: ", err.message)
    }
}
