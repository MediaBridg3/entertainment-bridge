import config from '#config';
import type { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';

export default async (req: IncomingMessage, res: ServerResponse) => {
  const queryObject = url.parse(req.url as string, true).query;
  const { token } = queryObject;
  const { searchTerm } = queryObject;

  if (token) {
    const apiBase = `https://api.igdb.com/v4/games/?search=${searchTerm}&fields=*,screenshots.*,cover.*`;
    
    let games = await $fetch(apiBase, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': config.eBridgePrivate.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (games) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(games));
      res.end();
    }
  }
};