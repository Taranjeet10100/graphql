const { dateToString } = require('../../helpers/date')
const Event = require('../../app/models/event');
const { user, transformEvent } = require('./merge');
const User = require('../../app/models/user');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            console.log("Events:", events);
            const arr = [];
            for (let i = 0; i < events.length; i++) {
                const creator = await user.bind(this, events[i]._doc.creator);
                const data = {
                    ...events[i]._doc,
                    _id: events[i].id,
                    date: dateToString(events[i]._doc.date),
                    creator: creator,
                };
                console.log("data : ", data);
                arr.push(data);
            }
            return arr;
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: dateToString(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = transformEvent(result);

            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log("Error :", err);
            throw err;
        };
    }

};

