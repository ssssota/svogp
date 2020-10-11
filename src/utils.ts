import type { OGProps } from './types';
import path from 'path';
import fontkit from 'fontkit';
import fetch, { Response } from 'node-fetch';
import { parseHtml } from 'libxmljs';

/**
 * Get OGP basic properties
 * @param url Target URL
 */
export const getOGPropsFromUrl = (url: string): Promise<OGProps> =>
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const props = parseHtml(html)
        .find('//meta')
        .map((elem) => {
          const name = elem.attr('property')?.value() || elem.attr('name')?.value();
          const content = elem.attr('content')?.value();
          return { name, content };
        })
        .filter((prop) => !!prop.name && !!prop.content)
        .reduce((acc, prop) => {
          const name = prop.name.toLowerCase();
          if (!acc.has(name)) acc.set(name, prop.content);
          return acc;
        }, new Map<string, string>());
      return {
        title: props.get('og:title') || props.get('og:site_name') || props.get('twitter:title'),
        description: props.get('og:description') || props.get('description') || props.get('twitter:description'),
        url: props.get('og:url'),
        image: props.get('og:image') || props.get('twitter:image')
      } as OGProps;
    });

const font = fontkit.openSync(path.resolve(__dirname, 'noto.otf'));
/**
 * Wrap string with width
 * @param text Target string
 * @param width Wrap width
 */
export const wrap = (text: string, width: number) => {
  const wrappedText = [...text.trim()];
  let currentWidth = 0;
  font.layout(text).glyphs.forEach((glyph, index) => {
    currentWidth += glyph.advanceWidth / 62.5;
    if (currentWidth > width) {
      wrappedText.splice(index, 0, '\n');
      currentWidth = 0;
    }
  });
  return wrappedText.join('');
};

export const getDataUrlFromUrl = (url: string) => {
  let res: Response;
  return fetch(url)
    .then((response) => {
      res = response;
      return res.buffer();
    })
    .then((buf) => {
      return `data:${res.headers.get('content-type')};base64,${Buffer.from(buf).toString('base64')}`;
    });
};
