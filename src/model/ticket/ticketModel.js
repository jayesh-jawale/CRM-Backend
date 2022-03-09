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

const getTicket = (userId) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema
            .find({userId})
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const getTicketById = (_id, userId) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema
            .find({_id, userId})
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const updateTicketById = ({_id, sender, message}) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema
            .findOneAndUpdate(
                {_id},
                {$push: {
                    conversations: {sender, message}
                }
            }   
        )
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const closeTicketById = ({_id, userId}) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema
            .findOneAndUpdate(
                {_id, userId},
                {status: "Closed"}
                )
            .then((data) => {
                resolve(data)
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

const deleteTicket = ({_id, userId}) => {
    return new Promise((resolve, reject) => {
        try   {
            ticketSchema
            .findOneAndDelete({_id, userId})
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
    getTicket,
    getTicketById,
    updateTicketById,
    closeTicketById,
    deleteTicket,
}