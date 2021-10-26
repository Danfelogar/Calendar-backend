const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.DB_CNN
        //     esto no es necesario
        //     , {
        //     // userNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // }
        );
        console.log('DB_Online');
    } catch ( error) {
        console.log(error);
        throw new Error('Error when initializing data base');
    }
}

module.exports = {
    dbConnection
}