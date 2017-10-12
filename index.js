const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema')
// const DataLoader = require('dataloader')

app.use('/graphql', graphqlHTTP(req => {
    return {
        schema,
        graphiql: true,
    }
}));
        
app.listen(4000)
console.log('Listening ...')
        