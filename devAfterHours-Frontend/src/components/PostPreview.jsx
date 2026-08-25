const PostPreview = ({ post, onBack }) => {
  return (
        <div className="min-h-screen bg-zinc-50">
            <main className="mx-auto max-w-4xl px-6 py-12">

                <button
                    type="button"
                    onClick={onBack}
                    className="mb-8 cursor-pointer text-sm font-medium text-zinc-500 hover:text-zinc-900"
                >
                    ← Back to Editor
                </button>

                {post.coverImage && (
                    <div className="mb-10 overflow-hidden rounded-2xl">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-auto max-h-[500px] w-full object-cover"
                        />
                    </div>
                )}

                <article>
                    <header>
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                            {post.category && (
                                <span>
                                    {post.category}
                                </span>
                            )}

                            <span>•</span>

                            <span>
                                {post.status}
                            </span>
                        </div>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                            {post.title || "Untitled Post"}
                        </h1>

                        {post.excerpt && (
                            <p className="mt-5 text-lg leading-8 text-zinc-600">
                                {post.excerpt}
                            </p>
                        )}
                    </header>

                    <div className="my-10 border-t border-zinc-200" />

                    <div
                        className="prose prose-zinc max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: post.content || "<p>No content yet.</p>"
                        }}
                    />
                </article>

            </main>
        </div>
    );
}

export default PostPreview
