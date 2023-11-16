import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

export const Navbar = () => {
  return (
    <>
      <div className="m-4 px-8 flex justify-between items-center ">
        <Link to="/" className="text-2xl italic text-blue-400 font-semibold">
          Sociot
        </Link>
        <SearchBar />
        <div className="flex items-center gap-4">
          <button className="py-2 px-4 rounded-lg bg-red-400 text-white font-medium text-lg">
            Create
          </button>
          <Link
            to="/auth/register"
            className="py-2 px-4 rounded-lg bg-blue-400 text-white font-medium text-lg"
          >
            Register
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};