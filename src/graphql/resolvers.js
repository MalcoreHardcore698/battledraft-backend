const User = require('./../models/User')
const Offer = require('./../models/Offer')
const News = require('./../models/News')
const Hub = require('./../models/Hub')
const PersonalChat = require('./../models/PersonalChat')
const GroupChat = require('./../models/GroupChat')
const Image = require('./../models/Image')

module.exports = {
    User: {
        id: parent => parent.id,
        name: parent => parent.name,
        preferences: async (parent) => {
            const hubs = []
            if (parent.preferences) {
                for (id of parent.preferences) {
                    const hub = await Hub.findById(id)
                    hubs.push(hub)
                }
            }
            return hubs
        }
    },
    Hub: {
        id: parent => parent.id,
        offers: async (parent) => {
            const offers = await Offer.find({ hub: parent.id })
            return offers
        },
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
        allNews: async (_, { status }) => {
            const news = await News.find()
            if (status) return news.filter(n => n.status === status)
            return news
        },
        allHubs: async (_, { status }) => {
            const hubs = await Hub.find()
            if (status) return hubs.filter(h => h.status === status)
            return hubs
        },
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

        authUser: async (_, args) => {
            const user = await User.find(args)
            return (user && user.length > 0) ? user[0] : {}
        },

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
            await User.create({
                ...args,
                avatar: args.avatar.then(file => file)
            })
            return true
        },
        editUser: async (_, args) => {
            const user = await User.findById(args.id)
            user.name = args.name || user.name
            user.password = args.password || user.password
            user.email = args.email || user.email
            user.phone = args.phone || user.phone
            user.role = args.role || user.role
            user.balance = args.balance || user.balance
            user.avatar = args.avatar.then(file => file) || user.avatar
            user.preferences = args.preferences || user.preferences
            user.dateLastAuth = args.dateLastAuth || user.dateLastAuth
            user.dateRegistration = args.dateRegistration || user.dateRegistration
            user.isVerifiedEmail = args.isVerifiedEmail || user.isVerifiedEmail
            user.isVerifiedPhone = args.isVerifiedPhone || user.isVerifiedPhone
            user.isNotified = args.isNotified || user.isNotified
            await user.save()
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
        editOffer: async (_, args) => {
            const offer = await Offer.findById(args.id)
            offer.user = args.user || offer.user
            offer.hub = args.hub || offer.hub
            offer.title = args.title || offer.title
            offer.message = args.message || offer.message
            offer.status = args.status || offer.status
            offer.dateEdited = args.dateEdited || offer.dateEdited
            offer.datePublished = args.datePublished || offer.datePublished
            offer.dateCreated = args.dateCreated || offer.dateCreated
            await offer.save()
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
        editNews: async (_, args) => {
            const news = await News.findById(args.id)
            news.title = args.title || news.title
            news.body = args.body || news.body
            news.image = args.image || news.image
            news.hub = args.hub || news.hub
            news.source = args.source || news.source
            news.url = args.url || news.url
            news.status = args.status || news.status
            news.dateEdited = args.dateEdited || news.dateEdited
            news.datePublished = args.datePublished || news.datePublished
            news.dateCreated = args.dateCreated || news.dateCreated
            await news.save()
            return true
        },
        deleteNews: async (_, { id }) => {
            for (i of id) {
                await News.findById(id).deleteOne()
            }
            return true
        },

        addHub: async (_, args) => {
            const icon = await args.icon.then(file => file)
            const poster = await args.poster.then(file => file)
            await Hub.create({
                ...args,
                icon: JSON.parse(icon),
                poster: JSON.parse(poster)
            })
            return true
        },
        editHub: async (_, args) => {
            const hub = await Hub.findById(args.id)
            hub.title = args.title || hub.title
            hub.description = args.description || hub.description
            hub.slogan = args.slogan || hub.slogan
            hub.icon = await args.icon.then(file => file) || hub.icon
            hub.poster = await args.poster.then(file => file) || hub.poster
            hub.color = args.color || hub.color
            hub.status = args.status || hub.status
            hub.dateEdited = args.dateEdited || hub.dateEdited
            hub.datePublished = args.datePublished || hub.datePublished
            hub.dateCreated = args.dateCreated || hub.dateCreated
            await hub.save()
            return true
        },
        deleteHubs: async (_, { id }) => {
            for (i of id) {
                await Hub.findById(id).deleteOne()
            }
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