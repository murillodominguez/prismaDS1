const express = require('express');
const funcRoutes = require('./routes/FuncionarioRoutes.js');

var app = express();

app.use(express.json());
app.use('/api', funcRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta: 3000");
});