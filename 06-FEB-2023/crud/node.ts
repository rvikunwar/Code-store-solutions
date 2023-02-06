interface BlogType{
    name?: string,
    title?: string,
    content?: string
}

let url: string = 'http://127.0.0.1:3002/v1/'


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


function deleteBlog(id: string|number){
    fetch(`${url}deleteBlog/${id}`,{
        method: "DELETE"
    })
    .then(res => res.json()) 
    .then(res => {
        getBlogs();
        console.log(res)
    })
}

function getBlogs(): void{
    let blogElement: HTMLElement| null = document.getElementById("blogs")
    if(blogElement != null){
        blogElement.innerHTML = ""

        fetch(`${url}`)
        .then(res => res.json()) 
        .then(res => {
            res.response.forEach((doc) => {
                if(blogElement !== null){
                    blogElement.innerHTML += card({ id: doc.id, data: doc });    
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

            fetch(`${url}updateBlog/${globalId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: globalId, ...data })
            })
            .then(res => {
                getBlogs();
                name.value = "";
                title.value = "";
                content.value = "";
                globalId = "";
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        } else {

            fetch(`${url}/createBlog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data })
            })
            .then(res => {
                getBlogs();
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