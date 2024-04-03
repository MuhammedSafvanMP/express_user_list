const { response } = require('express');

const app = require('express')();

const PORT = process.env.PORT || 5001;

app.get('/', (request, response) => {
    response.status(200).send("hi");
})
app.get('*', (request, response) => {
    response.status(404).send("404 Page not found")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

