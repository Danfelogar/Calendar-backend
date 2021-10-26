const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async(req, res = response ) => {

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'There is already a user with this email',
            });
        }
        // al let user le paso estos parametros
        user = new User( req.body );

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }

}

const loginUser = async (req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'There is no user with that email',
            });
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect',
            });
        }

        //Generar nuestro JMT

        res.status(201).json({
            ok: true,
            msg: 'login',
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        })
    }
};

const revalidateToken = (req, res = response ) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
};


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}