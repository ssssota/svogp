import App from './App.svelte';
import type { NowRequest, NowResponse } from '@vercel/node';
import { getOGPropsFromUrl } from './utils';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const { url } = req.query;
  const props = await getOGPropsFromUrl(Array.isArray(url) ? url[0] : url);
  const { html, css } = (App as any).render(props);
  res.setHeader('content-type', 'image/svg+xml');
  res.send(html.replace(/<\/[0-9a-z]+>$/i, `<style>${css.code}</style>$&`));
};
