import {
  HomeIcon,
  ClipboardDocumentListIcon, 
  Cog6ToothIcon,              
} from "@heroicons/react/24/outline";


function Sidebar() {
  return (
    <div className="h-screen w-52 mt-16 bg-white shadow-md  p-5 border-r flex flex-col fixed">
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
          <HomeIcon className="h-5 w-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
          <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
          Tasks
        </a>
        <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
          <Cog6ToothIcon className="h-5 w-5 mr-3" />
          Settings
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;