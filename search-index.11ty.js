module.exports = class {
  data() {
    return {
      permalink: "essays-index.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const essays = (data.collections.article || []).map((e) => ({
      title: e.data.title || "",
      author: e.data.author || "",
      theme: e.data.theme || "",
      date: e.data.date || "",
      summary: e.data.summary || "",
      url: "/SocialGaze" + e.url
    }));
    return JSON.stringify(essays);
  }
};
