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

const getPinByEmail = (email, pin) => {
    return new Promise((resolve, reject) => {
        try {
            resetPinSchema.findOne({email, pin}, (error, data) => {
                if(error) {
                    reject(error)
                }
                    resolve(data)
            })
        }
        catch(error) {
            reject(error)
        }
    })
}

const deletePin = (email, pin) => {
    try {
        resetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
        if (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    setPasswordResetPin,
    getPinByEmail,
    deletePin,
}