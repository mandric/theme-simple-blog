import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
// import prism, { Options as PrismOptions } from "lume/plugins/prism.ts";
import codeHighlight, { Options as HighlightJsOptions} from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import metas from "lume/plugins/metas.ts";
import pagefind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import readingTime from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/reading_time/mod.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.4.0/toc.ts";
import image from "https://deno.land/x/lume_markdown_plugins@v0.4.0/image.ts";

import type { Page, Site } from "lume/core.ts";

export interface Options {
  highlightJs?: Partial<HighlightJsOptions>;
}

/** Configure the site */
export default function (options: Options = {}) {
  return (site: Site) => {
    site.use(postcss())
      .use(basePath())
      .use(toc())
      // .use(prism(options.prism))
      .use(codeHighlight())
      .use(readingTime())
      .use(date())
      .use(metas())
      .use(image())
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(pagefind())
      .use(terser())
      .use(sitemap())
      .copy("fonts")
      .copy("favicon.png")
      .preprocess([".md"], (page: Page) => {
        page.data.excerpt ??= (page.data.content as string).split(
          /<!--\s*more\s*-->/i,
        )[0];
      });

    // Basic CSS Design System
    site.remoteFile(
      "_includes/css/ds.css",
      "https://unpkg.com/@lumeland/ds/ds.css",
    );

    // HighlightJs
    site.remoteFile(
      "_includes/css/code.css",
      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/vs.min.css",
      // "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
      // "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github-dark.min.css",
    );
  };
}
