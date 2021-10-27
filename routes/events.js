
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validatJWT } = require('../middlewares/validate-jwt');
const  {getEvents, createEvent, updateEvent, deleteEvent} = require ('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas tienen que pasar  por la validacion del JWT
router.use(validatJWT);
//de aqui para abajo todas estan protejidas por la validacion
//Obtener  eventos
router.get('/' ,getEvents);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'Start date is mandatory').custom( isDate ),
        check('end', 'End date is mandatory').custom( isDate ),
        validateFields
    ],
    createEvent);

//Actualizar Evento
router.put('/:id' ,updateEvent);

//Borrar Evento
router.delete('/:id' ,deleteEvent);

module.exports = router;