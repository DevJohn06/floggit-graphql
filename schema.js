const fetch = require('node-fetch');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const API_URL = 'http://localhost:8081/v1/notes';

const NoteType = new GraphQLObjectType({
    name: 'Note',
    description: '...',
    
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: json => json._id
        },
        title: {
            type: GraphQLString,
            resolve: json => json.title
        },
        color: {
            type: GraphQLString,
            resolve: json => json.color
        },
        information: {
            type: new GraphQLList(InformationType),
            resolve: json => json.information
        }  
    })
})

const InformationType = new GraphQLObjectType({
    name: 'Information',
    description: '...',
    
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: json => json.id
        },
        text: {
            type: GraphQLString,
            resolve: json => json.text
        }        
    })
});


// query {
//     note(id: 0) {
//         title,
//         id,
//         color,
//         information {
//             id,
//             text
//         }
//     }
// }

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        
        fields: () => ({
            note: {
                type: NoteType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(API_URL).then(resp => resp.json()).then(json => json[args.id])
            }
        })
    })
})
