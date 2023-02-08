const sql = require("mysql");

const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@123",
    connectionLimit: 10,
    database: 'codestore'
})


let cd_db;

async function configureDB() {

    await new Promise((resolve, reject) => {
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              reject(err)
            }
            resolve();
            console.log('connected as id/state - ' + connection.threadId + "/" + connection.state);
        });
    }) 
}

configureDB();


class codestoreDB{
    static getCodeStoreDBInstance(){
        return cd_db ? cd_db: new codestoreDB()
    }

    createTuple = async (tableName, columns, values) => {

        try {
            const response = await new Promise((resolve, reject) => {
                
                const query = `INSERT INTO ${tableName} ${columns} VALUES ${values};`;
                console.log(query, 'query')
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response

        } catch (e) {
            throw(e)
        } finally {
            console.log("Connection successfull");
        }
    };

    getAllDocuments = async (tableName) => {
        try{
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
            console.log("Connection successfull");
        }
    }

        
    getDocument = async (tableName, field, value) => {
        try{
            const response = await new Promise((resolve, reject) => {
                
                const query = `SELECT * FROM ${tableName} WHERE ${field} = ${value};`;
       
                connection.query(query, (err, res) => {
                    if(err) reject(new Error(err.message));
                    resolve(res);
                });
            })

            return response

        } catch(e){
            throw(e)
        } finally{
            console.log("Connection successfull");
        }
    }


    updateDocument = async (tableName, updatedData, id) => {
        try{
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
            console.log("Connection Successfull");
        }
    }
    
    deleteDocument = async (tableName, id) => {
        try{
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
            console.log("Connection close");
        }
    }

}

module.exports = { codestoreDB }