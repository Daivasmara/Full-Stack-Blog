const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// routers
const posts = require('./posts');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.get('/', (req, res) => {
    res.json({
        message: 'BLOG API 🔥🔥'
    });
});

app.use('/posts', posts);