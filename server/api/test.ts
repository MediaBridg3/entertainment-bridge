import config from '#config';
import type { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';

export default async (req: IncomingMessage, res: ServerResponse) => {
  let data = { data: [{ data: '' }] };
    const apiBase = `https://api.themoviedb.org/3/genre/tv/list?api_key=${config.eBridgePrivate.API_KEY}&language=en-US`;
    

    data = await $fetch(apiBase);
    if (data) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(data));
      res.end();
    }
};