/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');//para validacion de middleware

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/new',
    [//middleware
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 characters').isLength({ min:6 }),
        validateFields
    ]
    ,createUser
);

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 characters').isLength({ min:6 }),
        validateFields
    ],
    loginUser );

router.get( '/renew', revalidateToken );

module.exports = router;