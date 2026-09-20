const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
