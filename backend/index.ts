import express from 'express';
import { hospitalRouter } from './routes/hospital';
import { loginRouter } from './routes/login';
import { v4 as _uuidv4 } from 'uuid';
import { errorHandler, tokenExtractor, userExtractor,requestLogger, unknownEndpoint  } from './utils/middleware';

const cors = require("cors");

const PORT = 3000;
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api', loginRouter);
app.use(userExtractor)
app.use(tokenExtractor)
app.use(errorHandler)
app.use(requestLogger)
app.use('/api', hospitalRouter);


app.use(unknownEndpoint)


app.use(loginRouter)

app.use(hospitalRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
