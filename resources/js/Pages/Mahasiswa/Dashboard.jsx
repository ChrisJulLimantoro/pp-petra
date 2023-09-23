import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import Carousel from "@/Components/Carousel";
import { Select, Option } from "@material-tailwind/react";
export default function Dashboard({ auth }) {
    return (
        <>
            <Head>
                <title>SAOCP-Dashboard</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className='col-span-2'>
                    <SidebarUser>

                    </SidebarUser>
                </div>
                <div className="mt-10 w-full h-72 col-span-4">
                    <Carousel className="w-full">

                    </Carousel>
                    <div className="mt-10">
                    </div> 
                </div>
                
            </div>
            
           
        </>
    );
}
