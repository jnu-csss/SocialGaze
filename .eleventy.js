const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const pad2 = (n) => String(n).padStart(2, "0");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    return String(new Date(dateObj).getFullYear());
  });

  eleventyConfig.addFilter("yearMonth", (dateObj) => {
    const d = new Date(dateObj);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
  });

  eleventyConfig.addFilter("monthName", (mm) => {
    return months[parseInt(mm, 10) - 1];
  });

  eleventyConfig.addFilter("isRecent", (dateObj) => {
    const diffDays = (Date.now() - new Date(dateObj).getTime()) / 86400000;
    return diffDays <= 60;
  });

  eleventyConfig.addFilter("recentOnly", (essays) => {
    return (essays || []).filter((e) => {
      const diffDays = (Date.now() - new Date(e.data.date).getTime()) / 86400000;
      return diffDays <= 60;
    });
  });

  eleventyConfig.addFilter("archiveOnly", (essays) => {
    return (essays || []).filter((e) => {
      const diffDays = (Date.now() - new Date(e.data.date).getTime()) / 86400000;
      return diffDays > 60;
    });
  });

  eleventyConfig.addFilter("authorPermalink", (tag) => tag.replace("author-", ""));
  eleventyConfig.addFilter("archiveYearPermalink", (tag) => tag.replace("archive-year-", ""));
  eleventyConfig.addFilter("archiveMonthPermalink", (tag) => {
    const parts = tag.replace("archive-month-", "").split("-");
    return `${parts[0]}/${parts[1]}`;
  });

  eleventyConfig.addFilter("yearMonthGroups", (essays) => {
    const map = {};
    (essays || []).forEach((e) => {
      const d = new Date(e.data.date);
      const y = String(d.getFullYear());
      const m = pad2(d.getMonth() + 1);
      map[y] = map[y] || {};
      map[y][m] = (map[y][m] || 0) + 1;
    });
    const years = Object.keys(map).sort((a, b) => b - a);
    return years.map((y) => ({
      year: y,
      months: Object.keys(map[y])
        .sort((a, b) => b - a)
        .map((m) => ({ key: m, monthName: months[parseInt(m, 10) - 1], count: map[y][m] }))
    }));
  });

  return {
    pathPrefix: "/SocialGaze/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
