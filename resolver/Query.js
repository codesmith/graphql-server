const Query = {
    // ★追加
    users: async (root, args, { prisma }, info) => {
        try {
            return prisma.users();
        } catch (error) {
            throw error;
        }
    },
    // ★追加終わり
    posts(parent, args, { db }, info) {
        //クエリを書いた時に引数が「ない」時は模擬データベースの内容を全て表示 
        if (!args.query) {
            return db.posts
            //クエリを書いた時に引数が「ある」時は
            // 引数とtitle or authorが一致したものだけを表示 
        } else {
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isAuthorMatch
            })
        }
    }
}

module.exports = Query