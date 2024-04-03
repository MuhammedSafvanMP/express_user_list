const express = require('express');

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5001;

app.use('/users',require('./routes/userRoutes'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

