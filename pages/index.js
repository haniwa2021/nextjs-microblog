import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import utilStyle from "@/styles/utils.module.css";
import styles from "@/styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";
import { getPostsData } from "@/lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  // console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

// // SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
          <p>
            私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
          </p>
        </section>
        <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
          <h2>📝エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => {
              return (
                <article key={id}>
                  <Link href={`/posts/${id}`}>
                    <img
                      src={`${thumbnail}`}
                      className={styles.thumbnailImage}
                    />
                  </Link>
                  <Link href={`/posts/${id}`} className={utilStyle.boldText}>
                    {title}
                  </Link>
                  <br />
                  <small className={utilStyle.lightText}>{date}</small>
                </article>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}
