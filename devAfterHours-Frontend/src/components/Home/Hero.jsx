
const Hero = () => {
    return (
        <main>
            <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-6">
                <div className="max-w-3xl text-center">
                    <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                        Development • Systems • Learning
                    </p>
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl md:text-7xl">
                        Thoughts from the hours
                        <span className="block text-zinc-500">
                            nobody talks about.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                        Practical notes on software development,
                        things I'm learning, and things I'm building.
                    </p>

                    <button
                        className="mt-8 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                        Explore Posts
                    </button>

                </div>
            </section>
        </main>
    )
}

export default Hero
