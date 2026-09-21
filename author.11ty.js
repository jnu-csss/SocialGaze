const PREFIX = "/SocialGaze";
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function slugify(str) {
  return String(str || "unknown").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

class AuthorPages {
  data() {
    return {
      layout: "base.njk",
      eleventyExcludeFromCollections: true,
      pagination: {
        data: "collections.article",
        size: 1,
        alias: "authorInfo",
        before: (essays) => {
          const seen = new Map();
          essays.forEach((e) => {
            const slug = slugify(e.data.author);
            if (!seen.has(slug)) seen.set(slug, e.data.author);
          });
          return Array.from(seen, ([slug, name]) => ({ slug, name }));
        }
      },
      permalink: (data) => `/authors/${data.authorInfo.slug}/index.html`
    };
  }

  render(data) {
    const essays = data.collections.article
      .filter((e) => slugify(e.data.author) === data.authorInfo.slug)
      .reverse();
    const authorName = data.authorInfo.name;

    const items = essays
      .map((e) => {
        const d = new Date(e.data.date);
        const readable = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        return `
      <li>
        <h3><a href="${PREFIX}${e.url}">${e.data.title}</a></h3>
        <p class="byline">${readable}</p>
        <p class="dek">${e.data.summary || ""}</p>
      </li>`;
      })
      .join("");

    return `
<div class="hero">
  <div class="wrap">
    <article class="sheet essay-head">
      <a class="field-back" href="${PREFIX}/#issue">← All essays</a>
      <h1>${authorName}</h1>
      <p class="byline">${essays.length} essay${essays.length !== 1 ? "s" : ""} published</p>
    </article>
  </div>
</div>

<section>
  <div class="wrap sheet">
    <ul class="index">${items}</ul>
  </div>
</section>`;
  }
}

module.exports = AuthorPages;
