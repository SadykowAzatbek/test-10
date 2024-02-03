import {promises as fs} from 'fs';
import {CommentWithoutId, Data, NewsWithoutId} from "./types";
const fileName = './db.json';

let data: Data = {
  news: [],
  comments: [],
};

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (err) {
      data = {
        news: [],
        comments: [],
      };
    }
  },
  async getNews () {
    return data.news;
  },
  async addNews (item: NewsWithoutId) {
    const id = crypto.randomUUID();
    const news = {id, ...item};
    data.news.push(news);
    await this.save();

    return news;
  },
  async getComments () {
    return data.comments;
  },
  async addComments (item: CommentWithoutId) {
    const id = crypto.randomUUID();
    const comment = {id, ...item};
    data.comments.push(comment);
    await this.save();

    return comment;
  },
  async save () {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;