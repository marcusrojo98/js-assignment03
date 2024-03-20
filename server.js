const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Middleware for basic authentication
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is required' });
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.user = user;
    next();
};

// Middleware to free up the body for payload
const allowPayload = (req, res, next) => {
    req.body = req.method === 'GET' ? {} : req.body;
    next();
};

// Books endpoints
app.get('/books', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'GET /books endpoint' });
});

app.post('/books', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'POST /books endpoint' });
});

app.put('/books/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'PUT /books/:id endpoint' });
});

app.patch('/books/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'PATCH /books/:id endpoint' });
});

app.delete('/books/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'DELETE /books/:id endpoint' });
});

// Authors endpoints
app.get('/authors', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'GET /authors endpoint' });
});

app.post('/authors', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'POST /authors endpoint' });
});

app.put('/authors/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'PUT /authors/:id endpoint' });
});

app.patch('/authors/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'PATCH /authors/:id endpoint' });
});

app.delete('/authors/:id', authenticate, allowPayload, (req, res) => {
    res.json({ message: 'DELETE /authors/:id endpoint' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
