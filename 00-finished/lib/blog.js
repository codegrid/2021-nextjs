import path from "path";

export const PostsDir = path.join(process.cwd(), "data");

export const fileNameToSlug = (fileName) => {
  return fileName.replace(/\.md$/, "");
};

export const slugToFileName = (slug) => {
  return `${slug}.md`;
};
