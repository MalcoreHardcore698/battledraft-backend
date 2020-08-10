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

    enum ChatStatus {
        OPEN
        CLOSE
    }

    enum AchievementArea {
        HUB
        OFFER
        CHAT
        TOURNAMENT
        PROFILE
    }

    enum ImageCategory {
        ICON
        POSTER
    }

    type Image {
        id: ID!
        name: String!
        path: String!
        category: ImageCategory!
    }

    type Avatar {
        id: ID!
        order: Int!
        name: String!
        path: String!
        complexity: Int!
        hub: Hub!
    }

    type Achievement {
        id: ID!
        title: String!
        description: String!
        area: AchievementArea!
    }

    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
        phone: String!
        role: UserRoles!
        balance: Int
        level: Int
        experience: Int
        avatar: Avatar
        availableAvatars: [Avatar]
        offers: [Offer]
        payment: [Payment]
        preferences: [Hub]
        achievements: [Achievement]
        transactions: [Transaction]
        chats: [UserChat]
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
        chat: Chat!
        sender: User!
        receiver: User!
        message: String!
        dateCreated: String!
    }
    
    type Chat {
        id: ID!
        owner: ID!
        title: String!
        participants: [User!]!
        messages: [Message]
        dateCreated: String!
    }

    type UserChat {
        id: ID!
        userId: ID!
        chatId: ID!
        status: ChatStatus!
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
        icon: Image!
        poster: Image!
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
        image: Image!
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

    input UserIDInput {
        id: ID!
    }

    type Query {
        allAvatars: [Avatar]
        allImages: [Image]
        allUsers: [User]
        allOffers(status: Status): [Offer]
        allNews(status: Status): [News]
        allHubs(status: Status): [Hub]
        allChats: [Chat]
        allUserRoles: [UserRoles]
        allStatus: [Status]
        allImageCategories: [ImageCategory]
        allAchievementAreas: [AchievementArea]
        allUserOffers(id: ID!): [Offer]!

        authUser(
            name: String
            email: String
            password: String!
        ): User!
        
        getAvatar(id: ID!): Avatar
        getImage(id: ID!): Image
        getUser(id: ID!): User
        getOffer(id: ID!): Offer
        getNews(id: ID!): News
        getHub(id: ID!): Hub
        getChat(id: ID!): Chat

        countAvatars: Int!
        countImages: Int!
        countUsers: Int!
        countOffers: Int!
        countHubs: Int!
    }

    type Mutation {
        addAvatar(
            order: Int!
            name: String!
            file: Upload!
            complexity: Int!
            hub: ID!
        ): Boolean!
        editAvatar(
            id: ID!
            name: String
            file: Upload
            complexity: Int
            hub: ID
        ): Boolean!
        deleteAvatar(
            id: [ID]!
        ): Boolean!

        addImage(
            name: String!
            file: Upload!
            category: ImageCategory!
        ): Boolean!
        editImage(
            id: ID!
            name: String
            file: Upload
            category: ImageCategory
        ): Boolean!
        deleteImage(
            id: [ID]!
        ): Boolean!
        
        addUser(
            name: String!
            password: String!
            email: String!
            phone: String!
            role: UserRoles!
            balance: Int
            level: Int
            experience: Int
            avatar: ID
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
            level: Int
            experience: Int
            avatar: ID
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

        addNews(
            title: String!
            body: String!
            image: ID
            imageFile: Upload
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
            image: ID
            imageFile: Upload
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
            icon: ID
            poster: ID
            iconFile: Upload
            posterFile: Upload
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
            icon: ID
            poster: ID
            iconFile: Upload
            posterFile: Upload
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

        addChat(
            id: ID!
            title: String!
            participants: [UserIDInput!]!
            owner: ID!
        ): ID!
        closeUserChat(
            userId: ID!
            chatId: ID!
        ): Boolean!

        addMessage(
            chat: ID!
            sender: ID!
            receiver: ID!
            message: String!
        ): Boolean!
    }

    type Subscription {
        messages(chat: ID!): [Message]
        userchats(user: ID!): [UserChat]
    }
`