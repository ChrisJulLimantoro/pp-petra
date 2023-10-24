import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import MoveTitle from '@/Components/Assistant/Title/MoveTitle';
import SelectKelasBaru from '@/Components/Assistant/Select/SelectKelasBaru';
import ConfirmationButton from '@/Components/Assistant/Button/ConfirmationButton';

export default function Move({ auth }) {
     
    //data kelas parallel
     const datas = [ 
        {
            id : 1,
            name : "A",
            jadwal : "Senin, 10.00-12.00"
        },
        {
            id : 2,
            name : "B",
            jadwal : "Selasa, 10.00-12.00"
        },
        {
            id : 3,
            name : "C",
            jadwal : "Rabu, 10.00-12.00"
        },
        {
            id : 4, 
            name : "D",
            jadwal : "Kamis, 10.00-12.00"
        }
    ];

    return(
        <>
        <Head>
            <title>SAOCP-Move Mahasiswa</title>
        </Head>
        <div className="grid grid-cols-7 gap-1">
            <div className='col-span-2'>
                <SidebarUser>

                </SidebarUser>
            </div>
            <div className="mt-10 w-full h-72 col-span-4">

                <div className='judul'>
                    <MoveTitle type="Mahasiswa" nama="Budi Arianto" nrp="C1420001" />
                </div>

                <form action="">
                    <SelectKelasBaru title="Kelas Parallel" datas={datas}/>
                </form>

                <div className='mt-10'>
                    <ConfirmationButton>
                        Update Kelas
                    </ConfirmationButton>
                </div>


                
            </div>
            
        </div>
        
       
    </>

    );
}