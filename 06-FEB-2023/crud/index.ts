interface BlogType{
    name?: string,
    title?: string,
    content?: string
}

let url: string = 'https://crudcrud.com/api/1c513a2b13614b8fab44fcb4e38f40b0/blogs'

const db = firebase.firestore()

function card({ id, data}): string{
    return (
    `<section class="blog">
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <span>-by ${data.name}</span>
        <div>
            <i class="fa-solid fa-pen-to-square edit" onclick='updateBlog("${id}", "${data.title}", "${data.name}", "${data.content}")'></i>
            <i class="fa-solid fa-trash delete" onclick='deleteBlog("${id}")'></i>
        </div>

    </section>`)
}

let globalId: string = ""
function updateBlog(id: string, title:string, name:string, content:string){
    globalId = id;
    let name_ = document.getElementById("name") as HTMLInputElement;
    let title_ = document.getElementById("title") as HTMLInputElement;
    let content_ = document.getElementById("content") as HTMLInputElement;

    name_.value = name;
    title_.value = title
    content_.value = content
}


function deleteBlog(id){
    db.collection("blog").doc(id).delete().then(() => {
        getBlogs();
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })

}

function getBlogs(): void{
    let blogElement: HTMLElement| null = document.getElementById("blogs")
    if(blogElement != null){
        blogElement.innerHTML = ""
        db.collection("blog").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(blogElement !== null){
                    blogElement.innerHTML += card({ id: doc.id, data: doc.data() });    
                }
            });
        })
    }
}


//for posting/updating blogs
let form = document.getElementById("blog-form");
if(form !== null){

    form.onsubmit = function (event){
        event.preventDefault();
    
        let data: BlogType = {};
        let name = document.getElementById("name") as HTMLInputElement;
        let title = document.getElementById("title") as HTMLInputElement;
        let content = document.getElementById("content") as HTMLInputElement;
        if(name != null && title != null && content != null){
            data = {
                name: name.value,
                title: title.value,
                content: content.value
            }
        }
        
        if(globalId !== ""){
            db.collection("blog").doc(globalId).update({
                ...data
            })
            .then(() => {
                getBlogs();
                console.log("Document written with ID: ", globalId);
                name.value = "";
                title.value = "";
                content.value = "";
                globalId = "";
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        } else {
            db.collection("blog").add(data)
            .then((docRef) => {
                getBlogs();
                console.log("Document written with ID: ", docRef.id);
                name.value = "";
                title.value = "";
                content.value = ""
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
 
    }
}

getBlogs()