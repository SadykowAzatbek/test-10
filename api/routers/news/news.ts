import {Router} from 'express';
import fileDb from "../../fileDb";
import {NewsWithoutId} from "../../types";
import {imageUpload} from "../../multer";

const newsRouter = Router();

newsRouter.get('/', async (req, res) => {
    const news = await fileDb.getNews();

    const cleanDescription = news.map((elem) => {
        const {description, ...dataNews} = elem;
        return dataNews;
    });

    res.send(cleanDescription);

});

newsRouter.get('/:id', async (req, res) => {
    try {
        const news = await fileDb.getNews();

        const getOneNews = news.find(item => item.id === req.params.id);

        if (!getOneNews) {
            res.status(422).send({error: 'News not found'});
        }

        res.send(getOneNews);
    } catch (err) {
        res.status(400).send({error: 'Error: ' + err});
    }
});

newsRouter.post('/', imageUpload.single('images'), async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            res.send('Введите название и описание новости!');
        } else {
            const addNews: NewsWithoutId = {
                title: req.body.title,
                description: req.body.description,
                date: new Date().toString(),
                image: req.file ? req.file.filename : null,
            };

            const news = await fileDb.addNews(addNews);

            res.send(news);
        }
    } catch (err) {
        res.status(400).send({error: 'Error ' + err});
    }
});

newsRouter.delete('/:id', async (req, res) => {
    const news = await fileDb.getNews();

    const deleteOneNews = news.findIndex(item => item.id === req.params.id);

    if (deleteOneNews !== -1) {
        news.splice(deleteOneNews, 1);

        await fileDb.save();

        res.send('news deleted');
    } else {
        res.status(422).send({error: 'News not found'});
    }
});

export default newsRouter;