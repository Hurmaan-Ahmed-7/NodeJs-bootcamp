//utility function takes a controller function and returns a new function with error catching functionality
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}