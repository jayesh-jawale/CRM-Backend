const {ticketSchema} = require("../../model/ticket/ticketSchema")

const insertTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema(ticketData)
            .save()
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertTicket,
}