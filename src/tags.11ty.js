const slug = require("@sindresorhus/slugify");
const getAllTags = require("./utils/tags");
const { TagsList, tagsStyles } = require("./_includes/components/tags-list");
const html = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles: tagsStyles,
    permalink: "/blog/tags/index.html",
  };
};

exports.render = data => {
  const allTags = getAllTags(data.collections);
  return html`
    <h1>Tags</h1>
    <form action="search">
      <label for="tag-filter">Filter tags</label>
      <input id="tag-filter" name="filter" list="all-tags" autocomplete="off" />
      <datalist id="all-tags">
        ${allTags
          .map(
            ([tag]) =>
              html`
                <option>${slug(tag)}</option>
              `
          )
          .join("\n")}
      </datalist>
    </form>
    <section>
      ${TagsList({ tags: allTags })}
    </section>
  `;
};
