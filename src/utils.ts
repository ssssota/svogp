import type { OGProps } from './types';
import fetch from 'node-fetch';
import matchAll from 'string.prototype.matchall';

/**
 * Get property value
 * @param propsString Properties string (e.g. `property="og:title" content="Sample Title"`)
 * @param propName Property name (e.g. `property`, `content`)
 */
const getPropValueFromPropsString = (propsString: string, propName: string): string | undefined => {
  const match = propsString.match(
    new RegExp(`${propName}=(?:(?<!\\\\)"(.*?)(?<!\\\\)"|(?<!\\\\)'(.*?)(?<!\\\\)')`, 'i')
  );
  return match
    ? match[1] || match[2]
    : undefined;
};

/**
 * Get OGP basic properties
 * @param html HTML string
 */
export const getOGPropsFromHtml = (html: string): OGProps =>
  [...matchAll(html, /<meta\s+(.+?=(?:(?<!\\)"(?:.*?)(?<!\\)"|(?<!\\)'(?:.*?)(?<!\\)'))\s*?\/?>/ig)].reduce((props, match) => {
    const propName = getPropValueFromPropsString(match[1], 'property');
    const content = getPropValueFromPropsString(match[1], 'content');
    switch (propName) {
      case 'og:title':
        if (props.title) break;
        props.title = content;
        break;
      case 'og:description':
        if (props.description) break;
        props.description = content;
        break;
      case 'og:url':
        if (props.url) break;
        props.url = content;
        break;
      case 'og:image':
      case 'og:image:url':
      case 'og:image:secure_url':
        if (props.image) break;
        props.image = content;
    }
    return props;
  }, {} as OGProps);

/**
 * Get OGP basic properties
 * @param url Target URL
 */
export const getOGPropsFromUrl = (url: string): Promise<OGProps> =>
  fetch(url)
    .then((res) => res.text())
    .then((html) => getOGPropsFromHtml(html));
