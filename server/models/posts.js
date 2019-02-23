const Joi = require('joi');

// connection to db
const db = require('../db/connection');
const posts = db.get('posts');

// validation
const schema = Joi.object().keys({
    username: Joi.string().max(30).required(),
    title: Joi.string().max(30).required(),
    post: Joi.string().max(500).required()
});

function getAll() {
    return posts.find();
}

function getOne(id) {
    return posts.findOne({_id: id});
}

function insert(post) {
    const result = Joi.validate(post, schema);
    if (!result.error) {
        post.created_at = new Date();
        return posts.insert(post);
    } else {
        return Promise.reject(result);
    }
}

function update(id, post) {
    const result = Joi.validate(post, schema);
    if (!result.error) {
        post.created_at = new Date();
        return posts.update({_id: id}, post);
    } else {
        return Promise.reject(result);
    }
}

function remove(id) {
    return posts.remove({ _id: id });
}

module.exports = {
    getAll,
    getOne,
    insert,
    update,
    remove
}