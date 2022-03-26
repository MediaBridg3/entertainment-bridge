import config from '#config';
import type { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';

export default async (req: IncomingMessage, res: ServerResponse) => {
  const queryObject = url.parse(req.url as string, true).query;
  let data = { data: [{ data: '' }] };

  const { search } = queryObject;
  const apiBase = `https://api.themoviedb.org/3/search/multi?api_key=${config.eBridgePrivate.API_KEY}&query=${search}&page=1&include_adult=false`

  if (search) {
    data = await $fetch(apiBase);
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
};