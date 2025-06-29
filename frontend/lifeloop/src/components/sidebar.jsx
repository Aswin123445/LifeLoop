import {
  HomeIcon,
  ClipboardDocumentListIcon, 
  Cog6ToothIcon,              
} from "@heroicons/react/24/outline";
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen w-52 mt-16 bg-white shadow-md  p-5 border-r flex flex-col fixed">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
          <HomeIcon className="h-5 w-5 mr-3" />
            Dashboard
         </Link>
        <Link to="/search" className="flex items-center text-gray-700 hover:text-blue-600">
          <HomeIcon className="h-5 w-5 mr-3" />
            Search
         </Link>
        <Link to="/completed" className="flex items-center text-gray-700 hover:text-blue-600">
          <CircleCheckBig className="text-green-500 mr-2"/>
          <div className="text-gray-700 hover:text-green-600">Completed</div>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;