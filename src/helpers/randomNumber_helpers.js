const randomNumberGenerator = (pinLength) => {
    let pin = ""; // Putting pin as a String
    for (let i = 0; i < pinLength; i++) {
     pin = pin + Math.floor(Math.random() * 10) // We will get number from 1 to 10
    }

    return pin;
}

module.exports = {
    randomNumberGenerator,
}