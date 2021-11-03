import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export default function Post({ postData }) {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    console.log(router.asPath.split('#')[1]);
    console.log(window.location.hash.replace('#', ''));
  }, []);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
