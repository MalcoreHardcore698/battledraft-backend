const path = require('path')
const { createWriteStream, existsSync, mkdirSync, unlink } = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const mkdirp = require('mkdirp')
const shortid = require('shortid')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
require('dotenv').config()

const UPLOAD_DIR = './uploads'
mkdirp.sync(UPLOAD_DIR)

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

    const storeUpload = async (name, upload) => {
        const { createReadStream, filename, mimetype } = await upload
        const stream = createReadStream()
        const id = shortid.generate()

        const dirname = name.toLowerCase().replace(/[-:\s]/g, "_")
        if (!existsSync(`${UPLOAD_DIR}/${dirname}`)){
            mkdirSync(`${UPLOAD_DIR}/${dirname}`)
        }

        const path = `${UPLOAD_DIR}/${dirname}/${id}-${filename}`
        const file = { id, filename, mimetype, path }

        await new Promise((resolve, reject) => {
            const writeStream = createWriteStream(path)

            writeStream.on('finish', resolve)
            writeStream.on('error', (error) => {
                unlink(path, () => {
                    reject(error)
                })
            })

            stream.on('error', (error) => writeStream.destroy(error))
            stream.pipe(writeStream)
        })

        return file
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: { storeUpload }
    })

    server.applyMiddleware({ app })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/uploads', express.static('uploads'))

    app.listen({ port }, () => {
        console.log(`Server ready at http://api.battledraft.ru/${port}${server.graphqlPath}`)
    })
}

start()