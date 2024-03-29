import express from 'express';
import cors from 'cors';
import newsRouter from "./routers/news/news";
import fileDb from "./fileDb";
import commentsRouter from "./routers/comments/comments";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`server started on ${port} port!`);
    });
};

void run();
