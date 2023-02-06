var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var url = 'https://crudcrud.com/api/1c513a2b13614b8fab44fcb4e38f40b0/blogs';
var db = firebase.firestore();
function card(_a) {
    var id = _a.id, data = _a.data;
    return ("<section class=\"blog\">\n        <h3>".concat(data.title, "</h3>\n        <p>").concat(data.content, "</p>\n        <span>-by ").concat(data.name, "</span>\n        <div>\n            <i class=\"fa-solid fa-pen-to-square edit\" onclick='updateBlog(\"").concat(id, "\", \"").concat(data.title, "\", \"").concat(data.name, "\", \"").concat(data.content, "\")'></i>\n            <i class=\"fa-solid fa-trash delete\" onclick='deleteBlog(\"").concat(id, "\")'></i>\n        </div>\n\n    </section>"));
}
var globalId = "";
function updateBlog(id, title, name, content) {
    globalId = id;
    var name_ = document.getElementById("name");
    var title_ = document.getElementById("title");
    var content_ = document.getElementById("content");
    name_.value = name;
    title_.value = title;
    content_.value = content;
}
function deleteBlog(id) {
    db.collection("blog").doc(id)["delete"]().then(function () {
        getBlogs();
        console.log("Document successfully deleted!");
    })["catch"](function (error) {
        console.error("Error removing document: ", error);
    });
}
function getBlogs() {
    var blogElement = document.getElementById("blogs");
    if (blogElement != null) {
        blogElement.innerHTML = "";
        db.collection("blog").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (blogElement !== null) {
                    blogElement.innerHTML += card({ id: doc.id, data: doc.data() });
                }
            });
        });
    }
}
//for posting/updating blogs
var form = document.getElementById("blog-form");
if (form !== null) {
    form.onsubmit = function (event) {
        event.preventDefault();
        var data = {};
        var name = document.getElementById("name");
        var title = document.getElementById("title");
        var content = document.getElementById("content");
        if (name != null && title != null && content != null) {
            data = {
                name: name.value,
                title: title.value,
                content: content.value
            };
        }
        if (globalId !== "") {
            db.collection("blog").doc(globalId).update(__assign({}, data))
                .then(function () {
                getBlogs();
                console.log("Document written with ID: ", globalId);
                name.value = "";
                title.value = "";
                content.value = "";
                globalId = "";
            })["catch"](function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
        else {
            db.collection("blog").add(data)
                .then(function (docRef) {
                getBlogs();
                console.log("Document written with ID: ", docRef.id);
                name.value = "";
                title.value = "";
                content.value = "";
            })["catch"](function (error) {
                console.error("Error adding document: ", error);
            });
        }
    };
}
getBlogs();
