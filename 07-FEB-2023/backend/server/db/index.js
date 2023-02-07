const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2';

// Database Name
const dbName = 'Codestore';

let cd_db = {};
let database = null;
let client = null;

async function configureDB() {

    // Connection URL
    client = new MongoClient(url);
    await client.connect();
    console.log('Connected successfully to server');

    database = client.db(dbName);
    // console.log(database)
}


cd_db.createDocument = async (collectionName, documentData) => {
    try {
        await configureDB();  
        const collection = database.collection(collectionName);
        await collection.insertOne(documentData);
    } catch (e) {
        throw(e)
    } finally {
        console.log("Connection CLosed");
        await client.close();
    }
};


cd_db.updateDocument = async (collectionName, documentData, oldData) => {
    try{
        await configureDB();
        const options = { upsert: false };
        
        console.log(collectionName + " "+ JSON.stringify(documentData) + " "+ JSON.stringify(oldData));
 
        const collection = database.collection(collectionName);
        await collection.updateOne(oldData, documentData, options);

    } catch(e){
        console.log("Error: " + e);
    } finally {
        console.log("Connection CLosed");
        await client.close()
    }
}


cd_db.getDocument = async (collectionName, field, value) => {
    try{
        let query = {};
        query[field] = value;

        console.log("query "+ JSON.stringify(query));    
        let items = [];
        await configureDB();  
        const collection = database.collection(collectionName);
        const cursor = await collection.find(query)
        await cursor.forEach((item)=>{
            items.push(item);
        })
        console.log(items, 'items')
        return items;

    } catch(e){
        console.log("Error: " + e);
    } finally{
        console.log("Connection CLosed");
        await client.close()
    }
}


cd_db.getAllDocuments = async (collectionName) => {
    try{
        await configureDB();
        let items = [];
        const collection = database.collection(collectionName);
        const cursor = await collection.find();
        await cursor.forEach(function(doc){
            items.push(doc);
        });

        return items;
    } catch(e){
        console.log("Error: "+ e)
    } finally{
        console.log("Connection close");
        await client.close();
    }
}


cd_db.deleteDocument = async (collectionName, documentId) => {
    try{
        await configureDB();

        let data = { "id": parseInt(documentId) };
        const collection = database.collection(collectionName);
        await collection.deleteOne(data)
    } catch(e){
        console.log("Error: "+ e)
    } finally{
        console.log("Connection close");
        await client.close();
    }
}


cd_db.maxId = async (collectionName) => {
    let maxCount = null;
    try {
        await configureDB();  
        const collection = database.collection(collectionName);
        const cursor = collection.aggregate([
            { "$group": {
               "_id": null,
               "MaximumValue": { "$max": "$id" }
            }}
        ]);
        
        await cursor.forEach(function(doc){
            maxCount=  doc.MaximumValue;
        });
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Connection CLosed");
        await client.close();
    }
    return maxCount;      
};

module.exports = { cd_db }