import App from './App.svelte';
import type { NowRequest, NowResponse } from '@vercel/node';
import { getDataUrlFromUrl, getOGPropsFromUrl } from './utils';

export default (req: NowRequest, res: NowResponse): Promise<void> => new Promise((resolve) => {
  const { url } = req.query;
  const fixedUrl = Array.isArray(url) ? url[0] : url;
  getOGPropsFromUrl(fixedUrl).then((props) => {
    if (!props.url) props.url = fixedUrl;
    if (!props.image) return props;
    return getDataUrlFromUrl(props.image)
      .then((dataUrl) => {
        props.image = dataUrl;
        return props;
      })
      .catch((err) => {
        console.warn(err);
        return props;
      });
  }).then((props) => {
    const { html, css } = (App as any).render({ url, ...props });
    res.setHeader('content-type', 'image/svg+xml');
    res.send(html.replace(/<\/[0-9a-z]+>$/i, `<style>${css.code}</style>$&`));
    resolve();
  }).catch((err) => {
    res.status(404).end('Invalid URL: ' + err);
    resolve();
  });
});
