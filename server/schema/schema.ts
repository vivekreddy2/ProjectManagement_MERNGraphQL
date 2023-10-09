import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import Client from '../models/Client.js';
import Project from '../models/Project.js';

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // to be replaced with mongoose client
                return Client.findById(args.id);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a Client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const {name, email, phone} = args;
                const client = new Client({name, email, phone});
                return client.save();
            }
        },
        // Delete a Client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
            }
        },
        // Add a Project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'}
                        },
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: {type:  new GraphQLNonNull(GraphQLID)}
            }, 
            resolve(parent, args) {
                const {name, description, status, clientId} = args;
                // const client = 
                const project = new Project({name, description, status, clientId});
                return project.save();
            }
        },
        // Delete a Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id)
            }
        },
        // Update a Project
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'}
                        },
                    })
                }
            },
            resolve(parent, args) {
                const {name, description, status} = args;
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name, description, status
                        }
                    },
                    { new: true }
                );
            }
        }
    }
})


const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation
});

export default Schema;
//  