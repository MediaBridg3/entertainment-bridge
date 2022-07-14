import config from '#config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(config.eBridgePrivate.MONGODB_URI);

export default client;