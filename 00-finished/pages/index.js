import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | MyWebsite</title>
      </Head>
      <div className={styles.greeting}>
        <span className={styles.avatar}>
          <Image
            src="/me.jpg"
            alt="Webサイト制作者のアバター画像"
            width={48}
            height={48}
          />
        </span>
        <span className={styles.message}>Hello, I'm ykhs!</span>
      </div>
    </>
  );
};

export default Home;
