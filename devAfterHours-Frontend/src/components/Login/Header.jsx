import { Link } from "react-router-dom"
const Header = () => {
  return (
    <div className="text-center">
      <Link to='/'>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-1">
          DevAfterHours
        </h1>
      </Link>
      <p className="text-lg text-gray-600">
        Welcome back, Developer!
      </p>
    </div>
  )
}

export default Header
