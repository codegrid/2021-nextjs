import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { fileNameToSlug, PostsDir } from "../../lib/blog";
import styles from "../../styles/BlogList.module.css";

const BlogListPage = ({ posts }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Blog | MyWebsite</title>
      </Head>
      <h2>Blog</h2>
      <ul className={styles.list}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link href={`${router.pathname}/${post.slug}`}>{post.title}</Link>
              <time dateTime={post.date}>{post.date}</time>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const getStaticProps = () => {
  const fileNames = fs.readdirSync(PostsDir);
  const posts = fileNames
    .map((fileName) => {
      const postPath = path.join(PostsDir, fileName);
      const file = matter.read(postPath);
      return {
        slug: fileNameToSlug(fileName),
        title: file.data.title,
        date: file.data.date,
      };
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  return {
    props: {
      posts,
    },
  };
};

export default BlogListPage;
