const { gql } = require('apollo-server-express')

module.exports = gql`
    enum ChatTypes {
        PERSONAL
        GROUP
    }

    enum UserRoles {
        ADMINISTRATOR
        MODERATOR
        USER
    }

    type Message {
        id: ID!
        message: String!
    }

    type Chat {
        id: ID!
        type: ChatTypes!
        messages: [Message]
    }

    type Offer {
        id: ID!
        message: Message!
    }

    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        phone: String!
        role: UserRoles!
        chats: [Chat]
        offers: [Offer]
    }

    type Game {
        id: ID!
        name: String!
    }

    type News {
        id: ID!
        title: String!
        body: String!
        image: String!
        game: Game!
        date: String!
        source: String!
        url: String!
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        addUser(name: String!, password: String!, email: String!, phone: String!, role: UserRoles!): User
    }
`