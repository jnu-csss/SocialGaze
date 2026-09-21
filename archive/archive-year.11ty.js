const PREFIX = "/SocialGaze";
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const pad2 = (n) => String(n).padStart(2, "0");

class ArchiveYearPages {
  data() {
    return {
      layout: "base.njk",
      eleventyExcludeFromCollections: true,
      pagination: {
        data: "collections.article",
        size: 1,
        alias: "yearInfo",
        before: (essays) => {
          const seen = new Set();
          essays.forEach((e) => seen.add(String(new Date(e.data.date).getFullYear())));
          return Array.from(seen).map((year) => ({ year }));
        }
      },
      permalink: (data) => `/archive/${data.yearInfo.year}/index.html`
    };
  }

  render(data) {
    const year = data.yearInfo.year;
    const essays = data.collections.article.filter(
      (e) => String(new Date(e.data.date).getFullYear()) === year
    );

    const monthMap = {};
    essays.forEach((e) => {
      const m = pad2(new Date(e.data.date).getMonth() + 1);
      monthMap[m] = (monthMap[m] || 0) + 1;
    });
    const monthKeys = Object.keys(monthMap).sort((a, b) => b - a);

    const items = monthKeys
      .map((m) => `
      <li>
        <h3><a href="${PREFIX}/archive/${year}/${m}/">${months[parseInt(m, 10) - 1]} ${year}</a></h3>
        <p class="byline">${monthMap[m]} essay${monthMap[m] !== 1 ? "s" : ""}</p>
      </li>`)
      .join("");

    return `
<div class="hero">
  <div class="wrap">
    <article class="sheet essay-head">
      <a class="field-back" href="${PREFIX}/archive/">← Archive</a>
      <h1>${year}</h1>
      <p class="byline">${essays.length} essay${essays.length !== 1 ? "s" : ""} this year</p>
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

module.exports = ArchiveYearPages;
