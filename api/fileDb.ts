import {promises as fs} from 'fs';
import {News, NewsWithoutId} from "./types";

const fileName = './db.json';
let data: News[] = [];

const fileDb = {
  async init () {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (err) {
      data = [];
    }
  },
  async getNews () {
    return data;
  },
  async addNews (item: NewsWithoutId) {
    const id = crypto.randomUUID();
    const news = {id, ...item};
    data.push(news);
    await this.save();

    return news;
  },
  async save () {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;