const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
};

const favoriteBlog = (blogs) => {
    return blogs.length === 0
        ? {}
        : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes
            ? blog.likes
            : maxLikes, blogs[0].likes);
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let authorCounts = blogs.reduce((authorCount, blog) => {
            authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
            return authorCount
        }, {})
        let maxCount = Math.max(...Object.values(authorCounts))
        let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === maxCount)
        return {
            author: mostFrequent[0],
            blogs: maxCount
        }
    }
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
};