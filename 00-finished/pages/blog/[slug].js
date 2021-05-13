import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import breaks from 'remark-breaks';
import { fileNameToSlug, PostsDir, slugToFileName } from "../../lib/blog";
import styles from "../../styles/Blog.module.css";

const BlogPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | MyWebsite</title>
      </Head>
      <article>
        <header className={styles.header}>
          <h2>{post.title}</h2>
          <span>
            Posted: <time dateTime={post.date}>{post.date}</time>
          </span>
        </header>
        <ReactMarkdown remarkPlugins={[breaks]}>{post.body}</ReactMarkdown>
      </article>
    </>
  );
};

export const getStaticPaths = () => {
  const fileNames = fs.readdirSync(PostsDir);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileNameToSlug(fileName),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const postPath = path.join(PostsDir, slugToFileName(params.slug));
  const file = matter.read(postPath);
  const post = {
    title: file.data.title,
    date: file.data.date,
    body: file.content,
  };

  return {
    props: {
      post,
    },
  };
};

export default BlogPage;
