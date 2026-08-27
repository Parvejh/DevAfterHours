import Navbar from "../components/Home/Navbar"
const About = () => {
    return (
        <>
            <Navbar/>
            <main className="min-h-screen bg-white text-gray-900">
                {/* Hero */}
                <section className="border-b border-gray-200">
                    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
                        <div className="max-w-4xl">
                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                About DevAfterHours
                            </p>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                Where developers come to learn, build,
                                <span className="text-indigo-600"> and think beyond the tutorial.</span>
                            </h1>

                            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
                                DevAfterHours is a developer-focused blog built for people
                                who want to understand how things actually work — not just
                                copy code until it runs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why DevAfterHours */}
                <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                Our Mission
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Why DevAfterHours?
                            </h2>
                        </div>

                        <div className="space-y-5 text-gray-600 leading-8">
                            <p>
                                The internet is full of tutorials. But there's a difference
                                between knowing how to make something work and understanding
                                why it works.
                            </p>

                            <p>
                                DevAfterHours exists to bridge that gap.
                            </p>

                            <p>
                                We believe the best way to learn development is to:
                            </p>

                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                <p className="text-lg font-semibold text-gray-900">
                                    Understand → Build → Break → Debug → Improve
                                </p>
                            </div>

                            <p>
                                Our articles are written around that philosophy. Whether
                                you're learning your first programming language, building
                                your first full-stack application, preparing for interviews,
                                or trying to become a better software engineer, you'll find
                                practical knowledge designed to help you move forward.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What You'll Find */}
                <section className="bg-gray-50 border-y border-gray-200">
                    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                Explore
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                What you'll find here
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-gray-600">
                                Practical content covering the technologies and concepts
                                developers use to build real applications.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {/* JavaScript */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">⚡</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    JavaScript & Frontend
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Understand JavaScript beyond syntax and learn how modern
                                    frontend applications actually work.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    JavaScript · React · State · Performance
                                </p>
                            </div>

                            {/* Backend */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">🛠️</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Backend & APIs
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Learn how to build backend systems that are reliable,
                                    scalable, and maintainable.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    Node.js · Express · REST · Authentication
                                </p>
                            </div>

                            {/* Database */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">🗄️</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Databases
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Learn how to model, query, and optimize data effectively.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    MongoDB · Schema Design · Indexes · Queries
                                </p>
                            </div>

                            {/* DevOps */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">🚀</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    DevOps & Deployment
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Learn what happens when your application moves from
                                    localhost to production.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    Docker · Deployment · Environment Variables
                                </p>
                            </div>

                            {/* Projects */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">🧩</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Real-World Projects
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Explore how individual concepts come together when
                                    building complete applications.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    Architecture · APIs · Auth · Deployment
                                </p>
                            </div>

                            {/* Engineering */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                                <div className="text-3xl">🧠</div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    Engineering Thinking
                                </h3>

                                <p className="mt-3 leading-7 text-gray-600">
                                    Develop the mental models and problem-solving skills
                                    needed to become a better engineer.
                                </p>

                                <p className="mt-4 text-sm font-medium text-gray-500">
                                    Architecture · Debugging · Performance
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy */}
                <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                Philosophy
                            </p>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Learn less. Understand more.
                            </h2>

                            <div className="mt-6 space-y-5 leading-8 text-gray-600">
                                <p>
                                    We don't want DevAfterHours to become another website
                                    filled with articles that developers read once and
                                    immediately forget.
                                </p>

                                <p>
                                    The goal is different. Every article should leave you
                                    with at least one mental model, technique, or idea that
                                    you can take into your next project.
                                </p>

                                <p>
                                    Because becoming a better developer isn't about
                                    memorizing more code. It's about learning how to think
                                    like an engineer.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-gray-900 p-8 text-white sm:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                                The DevAfterHours Way
                            </p>

                            <div className="mt-8 space-y-6">
                                <div>
                                    <p className="text-xl font-semibold">
                                        Don't just make it work.
                                    </p>
                                    <p className="mt-1 text-gray-400">
                                        Understand why it works.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xl font-semibold">
                                        Don't just follow tutorials.
                                    </p>
                                    <p className="mt-1 text-gray-400">
                                        Build things.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xl font-semibold">
                                        Don't fear bugs.
                                    </p>
                                    <p className="mt-1 text-gray-400">
                                        Debug them.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xl font-semibold">
                                        Don't stop at "it works."
                                    </p>
                                    <p className="mt-1 text-gray-400">
                                        Ask "can it be better?"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="border-t border-gray-200">
                    <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Keep Building
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Technology changes.
                            <br />
                            <span className="text-gray-500">
                                Curiosity shouldn't.
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                            Frameworks come and go. Libraries get replaced. New tools
                            appear every year. But the fundamentals remain.
                        </p>

                        <p className="mt-8 text-xl font-semibold text-gray-900">
                            Learn the fundamentals. Build real things.
                            <br />
                            Stay curious. Keep improving.
                        </p>

                        <p className="mt-10 text-2xl font-bold">
                            Welcome to the after hours. 🌙
                        </p>

                        <p className="mt-3 text-gray-500">
                            Build something. Break something. Learn something.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default About;
