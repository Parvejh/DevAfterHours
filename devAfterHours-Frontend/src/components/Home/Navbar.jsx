import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-zinc-900">
                        DevAfterHours
                    </h1>
                </div>
                {/* Navigation */}
                <div className="flex items-center gap-8">

                    <a
                        href="/"
                        className="text-sm font-medium text-zinc-900"
                    >
                        Home
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        Posts
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        About
                    </a>

                    <Link
                        to="/login"
                        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                        Sign In
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;