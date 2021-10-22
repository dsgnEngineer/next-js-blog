import Link from 'next/link'

export default function Post({post}) {
    return (
        <div className="p-8">
            <div className="post-date font-inter text-gray-700">{post.frontmatter.date}</div>
            <h3 className="post-title text-blue-600 text-5xl pb-4">{post.frontmatter.title}</h3>
            <Link href={`/blog/${post.slug}`}>
                <a className="font-inter bg-yellow-400 p-2">Read More {'>>'}</a>
            </Link>
        </div>
    )
}
