const User = require('./../models/User')
const Offer = require('./../models/Offer')
const News = require('./../models/News')
const Hub = require('./../models/Hub')
const PersonalChat = require('./../models/PersonalChat')
const GroupChat = require('./../models/GroupChat')
const Avatar = require('./../models/Avatar')
const Image = require('./../models/Image')

module.exports = {
    Avatar: {
        hub: async (parent) => await Hub.findById(parent.hub)
    },
    User: {
        id: parent => parent.id,
        name: parent => parent.name,
        avatar: async (parent) => await Avatar.findById(parent.avatar),
        offers: async (parent) => {
            const offers = await Offer.find({ user: parent.id })
            return offers
        },
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
        icon: async (parent) => await Image.findById(parent.icon),
        poster: async (parent) => await Image.findById(parent.poster),
        countUsers: () => 0,
        countOffers: async (parent) => {
            const offers = await Offer.find({ hub: parent.id })
            return offers.length
        }
    },  
    News: {
        image: async (parent) => await Image.findById(parent.image),
        hub: async (parent) => await Hub.findById(parent.hub)
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
        allAvatars: async () => await Avatar.find(),
        allImages: async () => await Image.find(),
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
        allImageCategories: () => ([
            'ICON',
            'POSTER'
        ]),
        allAchievementAreas: () => ([
            'HUB',
            'OFFER',
            'CHAT',
            'TOURNAMENT',
            'PROFILE'
        ]),
        allUserOffers: async (_, { id }) => {
            const offers = await Offer.find({ user: id })
            return offers || []
        },

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

        countAvatars: async () => await Avatar.estimatedDocumentCount(),
        countImages: async () => await Image.estimatedDocumentCount(),
        countUsers: async () => await User.estimatedDocumentCount(),
        countOffers: async () => await Offer.estimatedDocumentCount(),
        countHubs: async () => await Hub.estimatedDocumentCount()
    },
    Mutation: {
        addAvatar: async (_, args, { storeUpload }) => {
            const avatar = await storeUpload(args.name, args.file)
            await Avatar.create({
                order: args.order,
                name: args.name,
                path: avatar.path,
                complexity: args.complexity,
                hub: args.hub
            })
            return true
        },
        editAvatar: async (_, args, { storeUpload }) => {
            const avatar = await Avatar.findById(args.id)
            const file = args.file && await storeUpload(args.name, args.file)

            avatar.order = args.order || avatar.order
            avatar.name = args.name || avatar.name
            avatar.path = (file && file.path) || avatar.path
            avatar.complexity = args.complexity || avatar.complexity
            avatar.hub = args.hub || avatar.hub
            await avatar.save()

            return true
        },
        deleteAvatar: async (_, { id }) => {
            await Avatar.findById(id).deleteOne()
            return true
        },

        addImage: async (_, args, { storeUpload }) => {
            const image = await storeUpload(args.name, args.file)
            await Image.create({
                name: args.name,
                path: image.path,
                category: args.category
            })
            return true
        },
        editImage: async (_, args, { storeUpload }) => {
            const image = await Image.findById(args.id)
            const file = args.file && await storeUpload(args.name, args.file)

            image.name = args.name || image.name
            image.path = (file && file.path) || image.path
            image.category = args.category || image.category
            await image.save()
            
            return true
        },
        deleteImage: async (_, { id }) => {
            for (i of id) {
                await Image.findById(id).deleteOne()
            }
            return true
        },

        addUser: async (_, args) => {
            const avatar = await Avatar.findById(args.avatar)
            await User.create({
                ...args,
                avatar
            })
            return true
        },
        editUser: async (_, args) => {
            const user = await User.findById(args.id)
            const avatar = await Avatar.findById(args.avatar)

            user.name = args.name || user.name
            user.password = args.password || user.password
            user.email = args.email || user.email
            user.phone = args.phone || user.phone
            user.role = args.role || user.role
            user.balance = args.balance || user.balance
            user.level = args.level || user.level
            user.experience = args.experience || user.experience
            user.avatar = (avatar && avatar.id) || user.avatar
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

        addNews: async (_, args, { storeUpload }) => {
            const image = await Image.findById(args.image)
            const imageFile = (args.imageFile) && await storeUpload(args.title, args.imageFile)
            const newImage = (args.imageFile) && await Image.create({
                name: imageFile.filename,
                path: imageFile.path,
                category: 'POSTER'
            })

            await News.create({
                ...args,
                image: (newImage) ? newImage.id : image,
            })
            return true
        },
        editNews: async (_, args, { storeUpload }) => {
            const news = await News.findById(args.id)

            const image = await Image.findById(args.image)
            const imageFile = (args.imageFile) && await storeUpload(args.title, args.imageFile)
            const newImage = (args.imageFile) && await Image.create({
                name: imageFile.filename,
                path: imageFile.path,
                category: 'POSTER'
            })

            news.title = args.title || news.title
            news.body = args.body || news.body
            news.image = (newImage) ? newImage.id : (image && image.id) || news.image
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

        addHub: async (_, args, { storeUpload }) => {
            const icon = await Image.findById(args.icon)
            const iconFile = (args.iconFile) && await storeUpload(args.title, args.iconFile)
            const newIcon = (args.iconFile) && await Image.create({
                name: iconFile.filename,
                path: iconFile.path,
                category: 'ICON'
            })

            const poster = await Image.findById(args.poster)
            const posterFile = (args.posterFile) && await storeUpload(args.title, args.posterFile)
            const newPoster = (args.posterFile) && await Image.create({
                name: posterFile.filename,
                path: posterFile.path,
                category: 'POSTER'
            })

            await Hub.create({
                title: args.title,
                description: args.description,
                slogan: args.slogan,
                icon: (newIcon) ? newIcon.id : icon,
                poster: (newPoster) ? newPoster.id : poster,
                color: args.color,
                status: args.status,
                dateCreated: args.dateCreated
            })
            return true
        },
        editHub: async (_, args, { storeUpload }) => {
            const hub = await Hub.findById(args.id)

            const icon = await Image.findById(args.icon)
            const iconFile = (args.iconFile) && await storeUpload(args.title, args.iconFile)
            const newIcon = (args.iconFile) && await Image.create({
                name: iconFile.filename,
                path: iconFile.path,
                category: 'ICON'
            })

            const poster = await Image.findById(args.poster)
            const posterFile = (args.posterFile) && await storeUpload(args.title, args.posterFile)
            const newPoster = (args.posterFile) && await Image.create({
                name: posterFile.filename,
                path: posterFile.path,
                category: 'POSTER'
            })
            
            hub.title = args.title || hub.title
            hub.description = args.description || hub.description
            hub.slogan = args.slogan || hub.slogan
            hub.color = args.color || hub.color
            hub.status = args.status || hub.status
            hub.dateEdited = args.dateEdited || hub.dateEdited
            hub.datePublished = args.datePublished || hub.datePublished
            hub.dateCreated = args.dateCreated || hub.dateCreated
            hub.icon = (newIcon) ? newIcon.id : (icon && icon.id) || hub.icon
            hub.poster = (newPoster) ? newPoster.id : (poster && poster.id) || hub.poster

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