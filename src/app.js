const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const UserSchema = require('./models/User')

// Server
async function start() {
    const port = process.env.PORT || 5000
    const url = process.env.URL
    const app = express()

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.once('open', () =>
        console.log(`Connected to MongoDB`)
    )

    const User = mongoose.model('users', UserSchema);

    const resolvers = {
        Query: {
            getUsers: async () => await User.find({}).exec()
        },
        Mutation: {
            addUser: async (_, args) => {
                try {
                    let response = await User.create(args);
                    return response;
                } catch(e) {
                    return e.message;
                }
            }
        }
    }

    const server = new ApolloServer({ typeDefs, resolvers })

    server.applyMiddleware({ app })
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))


    app.listen({ port }, () => {
        console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    })
}

start()