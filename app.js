const app = require('./configuration/server');
//connection to database
require('./configuration/database');

//start server
app.listen(app.get('port'), () => console.log(`server on port ${app.get('port')}`));
