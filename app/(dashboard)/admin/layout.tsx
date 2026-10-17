import { Separator } from "@/components/ui/separator";
import SidebarComponent from "./Sidebar";
import { getAdminUser } from '@/utils/api';
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { links } from "@/utils/links";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Redirects to "/" unless GET /users/me returns role ADMIN
  await getAdminUser();
  return (
    <main>
    <div className="flex justify-between items-center">
        <div className='border outline rounded-full'>
        <Link href={links.HOME.href} >
          <ArrowBigLeft />
        </Link>
      </div>
   <h2 className='capitalize text-lg font-medium'>Admin Dashboard</h2>

    </div>
   
      <Separator className='mt-2' />
      <section className="grid lg:grid-cols-12 gap-1 mt-12">
        <div className="lg: col-span-2">
          <SidebarComponent />
        </div>
        <div className=" lg:col-4 px-4">
          {children}
        </div>
      </section>



    </main>
  );
}
