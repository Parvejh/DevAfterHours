import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    // -- Older posts can have no populated category; set a default label.
    const categoryName = post.category?.name || "Uncategorized";

    return (
        <Link
            to={`/posts/${post.slug}`}
            className="group block"
        >
            <article className="mb-6 flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row min-w-0 md:h-50">

                {/* Cover Image */}
                <div className=" w-full shrink-0 overflow-hidden bg-zinc-100 md:h-auto md:w-[40%]">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full min-h-56 items-center justify-center text-sm text-zinc-400">
                            No image
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex grow min-w-0 flex-col justify-between p-6">

                    <div>
                        {/* Category */}
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            {categoryName}
                        </p>

                        {/* Title */}
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600  wrap-break-word line-clamp-1">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-3 text-sm leading-6 text-zinc-600 wrap-break-word line-clamp-1">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-400">

                        <span>
                            {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }
                                )
                                : "Draft"}
                        </span>

                        <span className="flex items-center gap-1 transition-colors group-hover:text-zinc-700">
                            Read article
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </span>

                    </div>
                </div>
            </article>
        </Link>
    );
};

export default PostCard;
