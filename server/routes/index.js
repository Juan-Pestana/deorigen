module.exports = app => {
    // Base URLS
    app.use('/api/product', require('./product.routes.js'))
    app.use('/api/store', require('./store.routes.js'))
    app.use('/api/order', require('./order.routes.js'))
    app.use('/api/user', require('./user.routes.js'))
    app.use('/api/files', require('./files.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}