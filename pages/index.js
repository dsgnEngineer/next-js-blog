import Head from "next/head";
import Header from "../components/Header";
import fs from 'fs';
import path from 'path';

export default function Home({posts}) {
 
  return (
    <div className="h-screen bg-gray-900">
      <Head>
        <title>Devsignerd</title>
        <meta name="description" content="Tori Zhao Frontend Developer " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
}

export async function getStaticProps(){
  //Get files from post dir
  const files = fs.readdirSync(path.join('posts'))
  
  //Get slug and frontmatter from posts
  const posts = files.map(filename => {

    const slug = filename.replace('.md', '')
    return {
      slug
    }
    
  })

  console.log(posts)

  return {
    props: {
      posts: 'The post',
    },
  }
}
