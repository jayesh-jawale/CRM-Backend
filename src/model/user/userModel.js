const {userSchema} = require("./userSchema");

const insertUser = (userObject) => {
    return new Promise((resolve, reject) => {
        userSchema(userObject)
        .save()
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

const userByEmail = (email) => {
    if(!email)
    return false;

    return new Promise((resolve, reject) => {
        try {
            userSchema.findOne({email}, (error, data) => {
                if(error) {
                    reject(error)
                }
                    resolve(data)
            });
         } catch(error) {
            reject(error)
        }
    });
};

module.exports = {
    insertUser,
    userByEmail,
}