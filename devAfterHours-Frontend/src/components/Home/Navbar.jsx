import {Link} from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth();
    return (
        <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <div>
                    <Link 
                    to='/'
                    className="text-lg font-bold tracking-tight text-zinc-900">
                        DevAfterHours
                    </Link>
                </div>
                <div>
                    {/* {data.value} */}
                </div>
                {/* Navigation */}
                <div className="flex items-center gap-8">

                    <Link
                        to="/"
                        className="text-sm font-medium text-zinc-900"
                    >
                        Home
                    </Link>

                    <Link
                        to="/posts"
                        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        Posts
                    </Link>

                    <Link
                        to="/about"
                        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        About
                    </Link>

                    {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                            >
                                Sign In
                            </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;