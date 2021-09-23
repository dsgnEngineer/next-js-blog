import Head from "next/head";
import Post from "../components/Post";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import {sortByDate} from '../utils';

export default function Home({ posts }) {
  // console.log(posts)
  return (
    <div className="bg-gray-900">
      <Head>
        <title>Devsignerd</title>
        <meta name="description" content="Tori Zhao Frontend Developer " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen posts">
        {posts.map((post, index) => (
          // eslint-disable-next-line react/jsx-key
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //Get files from post dir
  const files = fs.readdirSync(path.join("posts"));

  //Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //create slug
    const slug = filename.replace(".md", "");
    //create frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
