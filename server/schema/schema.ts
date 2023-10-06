import { projects, clients } from '../sampleData.js';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } from 'graphql';

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                // to be replaced with mongoose client
                return clients.find(client => client.id === args.id)
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: RootQuery,
});

export default Schema;