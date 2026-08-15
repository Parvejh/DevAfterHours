import Navbar from "../components/Home/Navbar"

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-zinc-50">
                <Navbar />

                <main className="mx-auto max-w-7xl px-6 py-16">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                        Dashboard
                    </h1>

                    <p className="mt-3 text-zinc-500">
                        Welcome back. Manage your blog from here.
                    </p>
                </main>
            </div>
    )
}

export default Dashboard
