const path = require("path");
const fs = require("fs");
const faker = require("faker");
const matter = require("gray-matter");

for (let i = 1; i < 12; i++) {
  const date = new Date("2021-01-01");
  if (i > 1) {
    date.setDate(i * 7);
  }
  const post = {
    filename: `dummy-${i}.md`,
    title: `Dummy Post ${i}`,
    date: date.toISOString().substring(0, 10),
    body: faker.lorem.paragraphs(10),
  };
  const markdown = matter.stringify(post.body, {
    title: post.title,
    date: post.date,
  });
  const filepath = path.resolve(__dirname, "..", "data", post.filename);
  fs.writeFileSync(filepath, markdown);
}
