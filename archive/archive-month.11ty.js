const PREFIX = "/SocialGaze";
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const pad2 = (n) => String(n).padStart(2, "0");

class ArchiveMonthPages {
  data() {
    return {
      layout: "base.njk",
      eleventyExcludeFromCollections: true,
      pagination: {
        data: "collections.article",
        size: 1,
        alias: "monthInfo",
        before: (essays) => {
          const seen = new Set();
          essays.forEach((e) => {
            const d = new Date(e.data.date);
            seen.add(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}`);
          });
          return Array.from(seen).map((key) => {
            const [year, month] = key.split("-");
            return { year, month, key };
          });
        }
      },
      permalink: (data) => `/archive/${data.monthInfo.year}/${data.monthInfo.month}/index.html`
    };
  }

  render(data) {
    const { year, month } = data.monthInfo;
    const essays = data.collections.article
      .filter((e) => {
        const d = new Date(e.data.date);
        return String(d.getFullYear()) === year && pad2(d.getMonth() + 1) === month;
      })
      .reverse();

    const items = essays
      .map(
        (e) => `
      <li>
        <h3><a href="${PREFIX}${e.url}">${e.data.title}</a></h3>
        <p class="byline">${e.data.author}</p>
        <p class="dek">${e.data.summary || ""}</p>
      </li>`
      )
      .join("");

    return `
<div class="hero">
  <div class="wrap">
    <article class="sheet essay-head">
      <a class="field-back" href="${PREFIX}/archive/${year}/">← ${year}</a>
      <h1>${months[parseInt(month, 10) - 1]} ${year}</h1>
      <p class="byline">${essays.length} essay${essays.length !== 1 ? "s" : ""}</p>
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

module.exports = ArchiveMonthPages;
