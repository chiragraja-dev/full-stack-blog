import Link from "next/link";

export default function SideNavigation() {
    return <aside className="w-[300px] border-r border-gray-300 h-screen" >
        <h1 className="font-bold text-xl px-4 py-3 text-center mt-2">PortFolio Admin</h1>
        <div className="border-b border-gray-200 my-3"></div>
        <div className="mt-4 p-4">
            <ul>
                <li>
                    <Link href={"/admin/projects"} className="block hover:bg-gray-100 rounded-lg px-4 py-3 text-gray-500 hover:text-gray-600">
                        Projects
                    </Link>
                </li>
                <li>
                    <Link href={"/admin/blog"} className="block hover:bg-gray-100 rounded-lg px-4 py-3 text-gray-400 hover:text-gray-600">
                        Blog
                    </Link>
                </li>
            </ul>
        </div>
    </aside>
}