const { gql } = require('apollo-server-express')

module.exports = gql`
    enum UserRoles {
        ADMINISTRATOR
        MODERATOR
        USER
    }

    enum Status {
        MODERATION
        PUBLISHED
    }

    type Image {
        type: String
        data: String
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
        preferences: [Hub]
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
        status: Status!
        dateEdited: String!
        dateCreated: String!
    }

    type PersonalChat {
        id: ID!
        user: User!
        messages: [Message]
        status: Status!
        dateEdited: String!
        dateCreated: String!
    }
    
    type GroupChat {
        id: ID!
        hub: Hub!
        members: [User]
        messages: [Message]
        status: Status!
        dateEdited: String
        dateCreated: String!
    }

    type Offer {
        id: ID!
        user: User!
        hub: Hub!
        title: String!
        message: String!
        status: Status!
        dateEdited: String
        datePublished: String
        dateCreated: String!
    }

    type Hub {
        id: ID!
        title: String!
        description: String!
        slogan: String!
        icon: String!
        poster: String!
        color: String!
        offers: [Offer]
        countUsers: Int
        countOffers: Int
        status: Status!
        dateEdited: String
        datePublished: String
        dateCreated: String!
    }

    type News {
        id: ID!
        title: String!
        body: String!
        image: String!
        hub: Hub!
        source: String
        url: String
        status: Status!
        dateEdited: String
        datePublished: String
        dateCreated: String!
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
        allOffers(status: Status): [Offer]
        allNews(status: Status): [News]
        allHubs(status: Status): [Hub]
        allPersonalChats: [PersonalChat]
        allGroupChats: [GroupChat]
        allUserRoles: [UserRoles]
        allStatus: [Status]
        allImages: [Image]

        authUser(
            name: String
            email: String
            password: String!
        ): User!

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
        addImage(
            data: String
            type: String
        ): Boolean

        addUser(
            name: String!
            password: String!
            email: String!
            phone: String!
            role: UserRoles!
            balance: Int
            avatar: String
            preferences: [ID]
            payment: PaymentInput
            dateLastAuth: String!
            dateRegistration: String!
            isVerifiedEmail: Boolean
            isVerifiedPhone: Boolean
            isNotified: Boolean
        ): Boolean!
        editUser(
            id: ID!
            name: String
            password: String
            email: String
            phone: String
            role: UserRoles
            balance: Int
            avatar: String
            preferences: [ID]
            dateLastAuth: String
            dateRegistration: String
            isVerifiedEmail: Boolean
            isVerifiedPhone: Boolean
            isNotified: Boolean
        ): Boolean!
        deleteUser(
            id: ID!
        ): Boolean!

        addPersonalChat(
            hub: ID!
        ): Boolean!

        addGroupChat(
            user: ID!
        ): Boolean!

        addNews(
            title: String!
            body: String!
            image: String!
            hub: ID!
            source: String
            url: String
            status: Status!
            dateEdited: String
            datePublished: String
            dateCreated: String!
        ): Boolean!
        editNews(
            id: ID!
            title: String
            body: String
            image: String
            hub: ID
            source: String
            url: String
            status: Status
            dateEdited: String!
            datePublished: String
            dateCreated: String
        ): Boolean!
        deleteNews(
            id: [ID!]!
        ): Boolean!

        addHub(
            title: String!
            description: String!
            slogan: String!
            icon: String!
            poster: String!
            color: String!
            status: Status!
            dateEdited: String
            datePublished: String
            dateCreated: String!
        ): Boolean!
        editHub(
            id: ID!
            title: String
            description: String
            slogan: String
            icon: String
            poster: String
            color: String
            status: Status
            dateEdited: String!
            datePublished: String
            dateCreated: String
        ): Boolean!
        deleteHubs(
            id: [ID!]!
        ): Boolean!

        addOffer(
            user: ID!
            hub: ID!
            title: String!
            message: String!
            status: Status!
            dateEdited: String
            datePublished: String
            dateCreated: String!
        ): Boolean!
        editOffer(
            id: ID!
            user: ID
            hub: ID
            title: String
            message: String
            status: Status
            dateEdited: String!
            datePublished: String
            dateCreated: String
        ): Boolean!
        deleteOffer(
            id: [ID!]!
        ): Boolean!
    }
`