const { Client } = require('pg')
const client = new Client()

const execute = function(request){
    await client.connect()
    
    const res = await client.query(request)
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

module.exports = {execute}