const { response } = require('express');
const Event = require('../models/Event')

const getEvents = async( req, res = response ) =>{
    const events = await Event.find()
                              .populate('user','name');

res.json({
    ok: true,
    events
});
}
const createEvent = async( req, res = response ) =>{
//verificar que tenga el evento
// console.log(req.body)

const event = new Event( req.body );

    try {
        event.user = req.uid;

        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}
const updateEvent = async( req, res = response ) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that id',
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to edit this event',
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdate
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}
const deleteEvent = async( req, res = response ) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that id',
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have the privilege to delete this event',
            })
        }


        await Event.findByIdAndDelete(eventId, { new: true });

        res.json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the administrator'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}