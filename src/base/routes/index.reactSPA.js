const keystone = require('keystone');
const path = require('path');
const myPath = path.resolve(__dirname, '../dist/index.html');
const myJS = path.resolve(__dirname, '../dist/bundle.js');

exports = module.exports = function(app) {
    app.get('/bundle.js', (req, res) => {
        res.sendFile(myJS);
    });
    app.get('/users', (req, res) => {
        keystone
            .list('User')
            .model.find()
            .select('displayName email')
            .exec((err, users) => {
                res.send(users);
            });
    });
    app.get('/', (req, res) => {
        res.sendFile(myPath);
    });
};
