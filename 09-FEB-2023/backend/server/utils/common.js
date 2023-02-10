function buildResponse(res, message, code){
    return res.status(code).send({
        message: message,
        key: code
    })
}


function buildObjectResponse(res, object){
    return res.status(200).send({
        response: object
    })
}


function buildPostResponse(res, code, object){
    return res.status(code).send({
        message: message,
        code: code, 
        data: object
    })
}

module.exports = {
    buildPostResponse,
    buildObjectResponse,
    buildResponse
}