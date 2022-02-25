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
    return new Promise((resolve, reject) => {
        if(!email) return false;

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