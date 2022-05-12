const db = require('/models.js');
db.sequelize.sync({alter: true}).then(() => {
    console.log("The database sync succefully");
}).catch(() => {
    console.log("The database aren't sync");
})
