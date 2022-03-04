const {resetPinSchema} = require("./resetPinSchema");
const {randomNumberGenerator} = require('../../helpers/randomNumber_helpers')

let pinLength = 6;

const setPasswordResetPin = async (email) => {
    const objData = {
        email,
        pin: await randomNumberGenerator(pinLength)
    }

    return new Promise((resolve, reject) => {
        resetPinSchema(objData)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
}

module.exports = {
    setPasswordResetPin,
}