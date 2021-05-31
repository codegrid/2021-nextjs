import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/BlogList.module.css";

const BlogListPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog | MyWebsite</title>
      </Head>

      <h2>Blog</h2>

      <ul className={styles.list}>
        {/* 配列のmap処理で記事数分の<li>要素を作成する */}
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <time dateTime={post.date}>{post.date}</time>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getStaticProps = () => {
  const dataDir = "data";
  const fileNames = fs.readdirSync(dataDir);
  const posts = fileNames
    .map((fileName) => {
      const postPath = path.join(dataDir, fileName);
      const file = matter.read(postPath);
      return {
        slug: fileName.replace(/\.md$/, ""),
        title: file.data.title,
        date: file.data.date,
      };
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  return {
    props: { posts },
  };
};

export default BlogListPage;
