const {userSchema} = require("./userSchema");

const insertUser = (userObject) => {
    return new Promise((resolve, reject) => {
        userSchema(userObject)
        .save()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

module.exports = {
    insertUser
}