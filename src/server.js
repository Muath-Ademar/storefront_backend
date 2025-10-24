import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import product_routes from './handlers/product';
const app = express();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World');
});
product_routes(app);
app.listen(3000, function () {
    console.log(`Server started on http://localhost:3000`);
});
