// import multer from 'multer';
import express from 'express';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import cors from 'cors';

// image storage
// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: function (_req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// express app
const app = express();

// middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(morgan('dev'));

// static files
// app.use(express.static('public'));

// routes
app.get('/', (_req, res) => {
  res.send('Hello World');
});

// app.post('/', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     console.log('No file received');
//     return res.send({
//       success: false,
//     });
//   } else {
//     console.log('file received');
//     return res.send({
//       success: true,
//     });
//   }
// });

app.listen(process.env.EXPRESS_PORT, () => {
  console.log('Server running on port 8080');
});
