const { ApolloServer, PubSub } = require('apollo-server');
const db = require('./db');
const Query = require('./resolver/Query');
const Mutation = require('./resolver/Mutation')
const Subscription = require('./resolver/Subscription');
const typeDefs = require('./schema');
// datamodel.prismaファイルから生成されたPrismaインスタンス  // ★追加
const { prisma } = require('./prisma/generated/prisma-client')  // ★追加
//PubSubのインスタンスを作成,サブスクリプションが利用可能に！ 
const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
    context: {
        prisma,  // ★追加
        pubsub,
        db
    }
})

server.listen()
    .then(({ url, subscriptionsUrl }) => {
        console.log(`□ Server ready at ${url}`);
        console.log(`□ Subscriptions ready at ${subscriptionsUrl}`);
});