const User = require('./../models/User')
const Offer = require('./../models/Offer')
const News = require('./../models/News')
const Hub = require('./../models/Hub')
const PersonalChat = require('./../models/PersonalChat')
const GroupChat = require('./../models/GroupChat')

module.exports = {
    User: {
        id: parent => parent.id,
        name: parent => parent.name
    },
    Hub: {
        id: parent => parent.id,
        countUsers: () => 0,
        countOffers: async (parent) => {
            const offers = await Offer.find({ hub: parent.id })
            return offers.length
        }
    },
    News: {
        hub: async (parent) => {
            const hub = await Hub.findById(parent.hub)
            return hub
        }
    },
    Offer: {
        id: parent => parent.id,
        user: async (parent) => {
            const user = await User.findById(parent.user)
            return user
        },
        hub: async (parent) => {
            const hub = await Hub.findById(parent.hub)
            return hub
        }
    },
    Query: {
        allUsers: async () => await User.find(),
        allOffers: async () => await Offer.find(),
        allNews: async () => await News.find(),
        allHubs: async () => await Hub.find(),
        allPersonalChats: async () => await PersonalChat.find(),
        allGroupChats: async () => await GroupChat.find(),
        allUserRoles: () => ([
            'ADMINISTRATOR',
            'MODERATOR',
            'USER'
        ]),
        allStatus: () => ([
            'MODERATION',
            'PUBLISHED'
        ]),

        getUser: async (_,  { id }) => await User.findById(id),
        getOffer: async (_,  { id }) => await Offer.findById(id),
        getNews: async (_,  { id }) => await News.findById(id),
        getHub: async (_,  { id }) => await Hub.findById(id),
        getPersonalChat: async (_,  { id }) => await PersonalChat.findById(id),
        getGroupChat: async (_,  { id }) => await GroupChat.findById(id),

        countUsers: async () => await User.estimatedDocumentCount(),
        countOffers: async () => await Offer.estimatedDocumentCount(),
        countHubs: async () => await Hub.estimatedDocumentCount()
    },
    Mutation: {
        addUser: async (_, args) => {
            await User.create(args)
            return true
        },
        deleteUser: async (_, { id }) => {
            await User.findById(id).deleteOne()
            return true
        },

        addOffer: async (_, args) => {
            await Offer.create(args)
            return true
        },
        deleteOffer: async (_, { id }) => {
            await Offer.findById(id).deleteOne()
            return true
        },

        addNews: async (_, args) => {
            await News.create(args)
            return true
        },
        deleteNews: async (_, { id }) => {
            await News.findById(id).deleteOne()
            return true
        },

        addHub: async (_, args) => {
            await Hub.create(args)
            return true
        },
        deleteHub: async (_, { id }) => {
            await Hub.findById(id).deleteOne()
            return true
        },

        addPersonalChat: async (_, args) => {
            await PersonalChat.create(args)
            return true
        },
        addGroupChat: async (_, args) => {
            await GroupChat.create(args)
            return true
        }
    }
}