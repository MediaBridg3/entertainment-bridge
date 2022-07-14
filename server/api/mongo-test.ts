import config from '#config';
import mongo from './mongo-connect';
import type { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';

export default async (req: IncomingMessage, res: ServerResponse) => {
  await mongo.connect();
  await mongo.db('mediaBridge').collection('movie').replaceOne({
    _id: 'myDoc'
  }, {
    date: new Date()
  }, {
    upsert: true
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({date: new Date()}));
  res.end();
};