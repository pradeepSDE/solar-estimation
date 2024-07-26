// const express = require('express');
// const axios = require('axios');
// const cors = require('cors')
// const fs = require('fs');
// const {detect, captureController }= require('./Controllers/detect')
// const multer = require('multer');

// const app = express();
// const port = 3000;
// app.use(cors({
//     origin: 'https://solar-estimation-frontend.vercel.app',
//     credentials: true,
//     methods: ['POST', 'GET'],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const upload = multer({ dest: 'uploads/' });
// app.post('/detect', upload.single('image'), detect )
// app.post('/capture', captureController )
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { detect, captureController } = require('./Controllers/detect');
const multer = require('multer');

const app = express();
const port = 3000;

// app.use(cors({
//     origin: true,
//     credentials: true,
//     methods: ['POST', 'GET'],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }));

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure /tmp/uploads directory exists
const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.get('/', (req, res) => {
    res.send('Welcome to the Solar Estimation API!');
});
app.post('/detect', upload.single('image'), detect);
app.post('/capture', captureController);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
