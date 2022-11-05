//Iniciamos jalando nuestras dependencias, routeando nuestros scripts y creando el puerto

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/html')(app);

app.listen(PORT, () => {
    console.log(`Check it here localhost:${PORT} 🎒`);
});