const express = require('express');
const axios = require('axios');
const cors = require('cors')
const fs = require('fs');
const {detect, captureController }= require('./Controllers/detect')
const multer = require('multer');

const app = express();
const port = 3000;
app.use(cors({
    origin: 'solar-estimation-frontend.vercel.app',
    credentials: true,
    methods: ['POST', 'GET'],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({ dest: 'uploads/' });
app.post('/detect', upload.single('image'), detect )
app.post('/capture', captureController )
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
