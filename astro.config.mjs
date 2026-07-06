import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

// Las imágenes de las galerías de proyecto vienen de markdown plano
// (![]() en src/content/**), no de componentes .astro, así que no podemos
// añadirles loading="lazy" a mano. Este plugin recorre el HTML ya
// procesado y se lo añade a cada <img>, sin depender de ninguna librería
// extra (la migración a astro:assets del punto 5 sustituirá esto).
function lazyLoadMarkdownImages() {
  return (tree) => {
    function walk(node) {
      if (node.tagName === 'img') {
        node.properties = node.properties ?? {};
        node.properties.loading ??= 'lazy';
        node.properties.decoding ??= 'async';
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({ rehypePlugins: [lazyLoadMarkdownImages] }),
  },
});
