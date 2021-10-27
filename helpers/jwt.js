const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) =>{
    //regreso una nueva promesa
    return new Promise( (resolve, reject)=>{

        //la accion o payload a enviar/ejecutar es la sgte
        const payload = { uid, name };
        // se procede a hacer la firma del token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject( 'The token could not be generated' );
            }

            resolve( token );
        })
    } )

}

module.exports = {
    generateJWT
}