const sql = require("mysql");

let connection;

let cd_db;

async function configureDB() {
    connection = sql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectionLimit: process.env.DB_CONNECTION_LIMIT,
        database: process.env.DB_DATABASE
    })

    await new Promise((resolve, reject) => {
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              reject(err)
            }
            resolve();
            console.log('Connected as id/state - ' + connection.threadId + "/" + connection.state);
        });
    }) 
}


//for calling sql query
function callSqlQuery(resolve, reject, query, values){
    connection.query(query, [values], (err, res) => {
        if(err) reject(new Error(err.message));
        resolve(res);
    });
}


class codestoreDB{
    static getCodeStoreDBInstance(){
        return cd_db ? cd_db: new codestoreDB()
    }

    createTuple = async (tableName, columns, values) => {

        try {
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                
                const query = `INSERT INTO ${tableName} ${columns} VALUES ${values};`;
                console.log(query, 'query')
                callSqlQuery(resolve, reject, query);
            })

            return response

        } catch (e) {
            throw(e)
        } finally {
            connection.end();
            console.log("Connection close");
        }
    };

    createTuplev1 = async (tableName, columns, values) => {

        try {
            await configureDB();
            console.log(tableName, columns, values)
            const response = await new Promise((resolve, reject) => {
                const query = `INSERT INTO ${tableName} ${columns} VALUES ?;`;
                callSqlQuery(resolve, reject, query, values);
            })

            return response

        } catch (e) {
            throw(e)
        } finally {
            connection.end();
            console.log("Connection close");
        }
    };

    getAllDocuments = async (tableName) => {
        try{
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                
                const query = `SELECT * FROM ${tableName};`;
       
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response

        } catch(e){
            console.log("Error: "+ e)
        } finally{
            connection.end();
            console.log("Connection close");        }
    }

        
    getDocument = async (tableName, field, value) => {
        try{
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                
                const query = `SELECT * FROM ${tableName} WHERE ${field} = ?;`;
                console.log(query)
                connection.query(query, value, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response

        } catch(e){
            throw(e)
        } finally{
            connection.end();
            console.log("Connection close");        }
    }

    getTupleWithQuery = async (query) => {
        try{
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                
                console.log(query)
                connection.query(query, value, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response

        } catch(e){
            throw(e)
        } finally{
            connection.end();
            console.log("Connection close");        }
    }


    updateDocument = async (tableName, updatedData, id) => {
        try{
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                let query;

                if(tableName === 'students'){
                    query = `UPDATE ${tableName}
                        SET name='${updatedData.name}', image='${updatedData.image}', 
                        className='${updatedData.className}', 
                        age=${updatedData.age}, address='${updatedData.address}', rollNo=${updatedData.rollNo}, 
                        contactNo='${updatedData.contactNo}'
                        WHERE id = ${id};`;
                } else {
                    query = `UPDATE ${tableName}
                        SET name='${updatedData.name}',  
                        marks=${updatedData.marks}, 
                        total=${updatedData.total}
                        WHERE id = ${id};`;
                }

       
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response
        } catch(e){
            throw(e)
        } finally {
            connection.end();
            console.log("Connection close");        }
    }
    
    deleteDocument = async (tableName, id) => {
        try{
            await configureDB();
            const response = await new Promise((resolve, reject) => {
                const query = `DELETE FROM ${tableName} WHERE id=${id};`;
       
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response
        } catch(e){
            console.log("Error: "+ e)
        } finally{
            connection.end();
            console.log("Connection close");        
        }
    }

}

module.exports = { codestoreDB }