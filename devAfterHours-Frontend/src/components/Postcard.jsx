import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <Link
        to={`/posts/${post.slug}`}>
            <article className="mb-4 group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">

                {/* Cover Image */}
                <div className="aspect-video overflow-hidden bg-zinc-100">
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    )}
                </div>

                {/* Content */}
                <div className="p-6">

                    {/* Category */}
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Development
                    </p>

                    {/* Title */}
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
                        {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
                        <span>
                            {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString()
                                : "Draft"}
                        </span>

                        <span>
                            {post.views} views
                        </span>
                    </div>

                </div>

            </article>
        </Link>
    );
};

export default PostCard;