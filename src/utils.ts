import type { OGProps } from './types';
import fetch from 'node-fetch';
import { parseHtml } from 'libxmljs';

/**
 * Get OGP basic properties
 * @param url Target URL
 */
export const getOGPropsFromUrl = (url: string): Promise<OGProps> =>
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      return parseHtml(html)
        .find('//meta')
        .map((elem) => {
          const name = elem.attr('property')?.value();
          const content = elem.attr('content')?.value();
          return { name, content };
        })
        .filter((prop) => !!prop.name && !!prop.content)
        .reduce((props, prop) => {
          switch (prop.name) {
            case 'og:title':
              if (props.title) break;
              props.title = prop.content;
              break;
            case 'og:description':
              if (props.description) break;
              props.description = prop.content;
              break;
            case 'og:url':
              if (props.url) break;
              props.url = prop.content;
              break;
            case 'og:image':
            case 'og:image:url':
            case 'og:image:secure_url':
              if (props.image) break;
              props.image = prop.content;
          }
          return props;
        }, {} as OGProps);
    });
