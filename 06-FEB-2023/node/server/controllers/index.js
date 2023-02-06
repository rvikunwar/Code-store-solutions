const { cd_db } = require("../db");
const { buildResponse, buildObjectResponse } = require("../utils/common")

module.exports.getBlogs = async function(req, res){
    let collection = "blogs"
    try{
        let response = await cd_db.getAllDocuments(collection)
        if(response.length === 0){
            return buildResponse(res, "No data found", 404)
        }
        return buildObjectResponse(res, response)
    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.postBlog = async function(req, res){
    let collection = "blogs";
    if(Object.keys(req.body).length === 0){
        return buildResponse(res, "Invalid input", 500)
    }
    console.log(JSON.stringify(req.body));

    try{
        let count = await cd_db.maxId(collection);
        let businessEntity = req.body;
        businessEntity.id = count + 1;
        await cd_db.createDocument(collection, businessEntity);
        return buildResponse(res, "Successful", 200);
    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.updateBlog = async function(req, res){
    let collection = "blogs";
    if(Object.keys(req.body).length === 0){
        return buildResponse(res, "Invalid input", 500)
    }
    try{
        console.log(req.body)
        let blog = await cd_db.getDocument(
            collection,
            "id",
            parseInt(req.body.id)
        );

        if(blog.length <= 0){
            return buildResponse(res, "Blog with this is not available", 404)
        }

        let businessEntity = { $set: { ...req.body, id: parseInt(req.body.id) }};
        const blId = blog[0].id; 

        await cd_db.updateDocument(collection, businessEntity, { id: blId });
        return buildResponse(res, "Successful", 200);

    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}


module.exports.deleteBlog = async function(req, res){
    let collection = "blogs";
    let id = req.params['id'];
    try{
        await cd_db.deleteDocument(collection, id)
        return buildResponse(res, "Succesfully deleted", 200);
    } catch(err){
        console.log("Error" + err);
        return buildResponse(res, "Internal error", 500);
    }
}