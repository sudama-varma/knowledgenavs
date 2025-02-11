import { slug } from 'github-slugger';
import { marked } from "marked";
import {JSDOM} from "jsdom";

// slugify
export const slugify = (content: string) => {
  if (!content) return null;

  return slug(content);
};

// markdownify
export const markdownify = (content: string) => {
  if (!content) return null;

  return marked.parseInline(content);
};

// parseMarkdown
export const parseMarkdown = (content: string) => {
  if (!content) return null;

  return marked.parse(content);
};

export const removeSpecialChars = (content: string) => {
  if (!content) return null;
  const dom = new JSDOM(content);
  const document = dom.window.document.documentElement;
  return document.textContent;
};

// humanize
export const humanize = (content: string) => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// plainify
export const plainify = (content: string) => {
  if (!content) return null;

  const filterBrackets = content.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};
