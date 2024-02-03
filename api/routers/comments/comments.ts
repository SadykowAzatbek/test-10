import {Router} from 'express';
import fileDb from "../../fileDb";
import {CommentWithoutId} from "../../types";

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    try {
        const comments = await fileDb.getComments();

        const newsIdParam = req.query.news_id as string;
        if (newsIdParam) {
            const commentsForNews = comments.filter(comment => comment.newsId === newsIdParam);
            res.send(commentsForNews);
        } else {
            res.send(comments);
        }
    } catch (err) {
        res.status(400).send({error: 'Error: ' + err});
    }
});

commentsRouter.post('/', async (req, res) => {
    try {
        if (!req.body.newsId || !req.body.comment) {
            res.send('Введите id новости и комментарий!');
        } else {
            const addComment: CommentWithoutId = {
                newsId: req.body.newsId,
                author: req.body.author,
                comment: req.body.comment,
            };

            const comment = await fileDb.addComments(addComment);

            res.send(comment);
        }
    } catch (err) {
        res.status(400).send({error: 'Error ' + err});
    }
});

commentsRouter.delete('/:id', async (req, res) => {
    const comments = await fileDb.getComments();

    const deleteOneComment = comments.findIndex(item => item.id === req.params.id);

    if (deleteOneComment !== -1) {
        comments.splice(deleteOneComment, 1);

        await fileDb.save();

        res.send('comment deleted');
    } else {
        res.status(422).send({error: 'Comment not found'});
    }
});

export default commentsRouter;