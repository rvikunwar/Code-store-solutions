const onChange = () => {
    let header = document.getElementsByTagName("h1")[0]
    let p = document.getElementsByTagName("p")[0]
    let img = document.getElementsByTagName("img")[0]

    header.textContent = "Task - Dom manipulation"
    p.style.color = "red"
    img.src = "https://static.javatpoint.com/images/javascript/javascript_logo.png"
}