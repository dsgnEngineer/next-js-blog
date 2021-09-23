import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked"; 
import Link from "next/link";

export default function PostPage({
  frontmatter: { title, date },
  slug,
  content,
}) {
  return (
    <div className="h-screen p-8 bg-gray-900">
      <Link href="/">
        <a className="font-inter bg-yellow-400 p-2">{"<< "}Go Back</a>
      </Link>
      <div className="post-page">
        <h1 className="post-title font-inter text-indigo-400 text-5xl pt-8 pb-4">
          {title}
        </h1>
        <div className="post-date font-inter text-yellow-400">{date}</div>
        <div className="post-body">
          <div 
          dangerouslySetInnerHTML={{ __html: marked(content) }}
          className="font-inter text-white"
          ></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
