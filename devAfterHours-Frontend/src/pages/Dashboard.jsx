import Navbar from "../components/Home/Navbar"
import { Link } from "react-router-dom"

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-zinc-50">
                <Navbar />
                <main className="mx-auto max-w-7xl px-6 py-8">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                        Dashboard
                    </h1>

                    <p className="mt-3 text-zinc-500">
                        Welcome back. Manage your blog from here.
                    </p>

                    <section className="h-full w-full flex flex-wrap items-center gap-5 mt-10">
                        <div className="grow-1">
                            <Link 
                            to="/dashboard/posts/new"
                            className="text-zinc-500 font-semibold hover:text-zinc-800 cursor-pointer  border border-slate-300 px-20 py-30 rounded bg-slate-100 shadow-lg text-5xl flex items-center justify-center">Create new post</Link>
                        </div>
                        <div className="grow-1">
                            <Link 
                            to="/dashboard/posts"
                            className="text-zinc-500 font-semibold hover:text-zinc-800 cursor-pointer border border-slate-300 px-20 py-30 rounded bg-slate-100 shadow-lg text-5xl flex items-center justify-center">Manage posts</Link>
                        </div>
                    </section>
                </main>
            </div>
    )
}

export default Dashboard
