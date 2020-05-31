const { gql } = require('apollo-server-express')

module.exports = gql`
    enum UserRoles {
        ADMINISTRATOR
        MODERATOR
        USER
    }

    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        phone: String!
        role: UserRoles!
        balance: Int
        avatar: String
        payment: [Payment]
        transactions: [Transaction]
        dateLastAuth: String!
        dateRegistration: String!
        isVerifiedEmail: Boolean
        isVerifiedPhone: Boolean
        isNotified: Boolean
    }

    type Payment {
        id: ID!
        bankBranding: String!
        cardNumber: Int!
        securityCode: Int
        expirationDate: String
        cardHolderName: String
        bankContactInfo: String
    }

    type Transaction {
        id: ID!
        title: String!
        date: String!
        sum: Float
    }

    type Message {
        id: ID!
        user: User!
        text: String!
        date: String!
    }

    type PersonalChat {
        id: ID!
        user: User!
        messages: [Message]
    }
    
    type GroupChat {
        id: ID!
        hub: Hub!
        members: [User]
        messages: [Message]
    }

    type Offer {
        id: ID!
        user: User!
        hub: Hub!
        title: String!
        message: String!
    }

    type Hub {
        id: ID!
        title: String!
        description: String!
        slogan: String!
        icon: String!
        poster: String!
        countUsers: Int
        countOffers: Int
    }

    type News {
        id: ID!
        title: String!
        body: String!
        image: String!
        hub: Hub!
        date: String!
        source: String!
        url: String!
    }

    input HubInput {
        id: ID!
    }

    input UserInput {
        id: ID!
    }

    input PaymentInput {
        bankBranding: String!
        cardNumber: Int!
        securityCode: Int
        expirationDate: String
        cardHolderName: String
        bankContactInfo: String
    }

    input TransactionInput {
        title: String!
        date: String!
        sum: Float
    }

    type Query {
        allUsers: [User]
        allOffers: [Offer]
        allNews: [News]
        allHubs: [Hub]
        allPersonalChats: [PersonalChat]
        allGroupChats: [GroupChat]

        getUser(id: ID!): User
        getOffer(id: ID!): Offer
        getNews(id: ID!): News
        getHub(id: ID!): Hub
        getPersonalChat(id: ID!): PersonalChat
        getGroupChat(id: ID!): GroupChat

        countUsers: Int!
        countOffers: Int!
        countHubs: Int!
    }

    type Mutation {
        addUser(
            name: String!
            password: String!
            email: String!
            phone: String!
            role: UserRoles!
            balance: Int
            avatar: String
            payment: PaymentInput
            dateLastAuth: String!
            dateRegistration: String!
            isVerifiedEmail: Boolean
            isVerifiedPhone: Boolean
            isNotified: Boolean
        ): Boolean!

        addPersonalChat(
            hub: HubInput!
        ): Boolean!

        addGroupChat(
            user: UserInput!
        ): Boolean!

        addNews(
            title: String!
            body: String!
            image: String!
            hub: HubInput!
            date: String!
            source: String!
            url: String!
        ): Boolean!

        addHub(
            title: String!
            description: String!
            slogan: String!
            icon: String!
            poster: String!
        ): Boolean!

        addOffer(
            user: ID!
            hub: ID!
            title: String!
            message: String!
        ): Boolean!
    }
`