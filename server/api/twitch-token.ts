import config from '#config';
import type { IncomingMessage, ServerResponse } from 'http';


export default async (req: IncomingMessage, res: ServerResponse) => {

  const apiBase = `https://id.twitch.tv/oauth2/token?client_id=${config.eBridgePrivate.TWITCH_CLIENT_ID}&client_secret=${config.eBridgePrivate.TWITCH_SECRET}&grant_type=client_credentials`;

  let twitch = await $fetch(apiBase, {
    method: 'POST',
  });

  if (twitch?.['access_token']) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(twitch));
    res.end();
  }
};