import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import AddTitle from '@/Components/Assistant/Title/AddTitle';
import LabelTableAdd from '@/Components/Assistant/Labels/LabelTableAdd';
import TableWithAddButton from '@/Components/Assistant/Table/TableWithAddButton';
import LabelAdd from '@/Components/Assistant/Labels/LabelAdd';
import TableNoButton from '@/Components/Assistant/Table/TableNoButton';

export default function AddAssistant({ auth }) {
    const head_asisten = ["Nama", "NRP", "Jurusan"];
    const data_asisten = [
        {
            nama: "John Michael",
            nrp: "123456789",
            jurusan: "Informatika",
        },
        {
            nama: "Alexa Liras",
            nrp: "987654321",
            jurusan: "Teknik Mesin",
        },
        {
            nama: "Laurent Perrier",
            nrp: "0987654321",
            jurusan: "Akuntansi",
        },
          
      ];

    const head_asisten_avail = ["Nama", "NRP", "Jurusan", "Action"];
    const data_asisten_avail = [
        {
            nama: "Alice Smith",
            nrp: "111111111",
            jurusan: "Informatika",
        },
        {
            nama: "Bob Johnson",
            nrp: "222222222",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Charlie Brown",
            nrp: "333333333",
            jurusan: "Data Science",
        },
        {
            nama: "David Wilson",
            nrp: "444444444",
            jurusan: "Informatika",
        },
        {
            nama: "Eve Davis",
            nrp: "555555555",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Frank White",
            nrp: "666666666",
            jurusan: "Data Science",
        },
        {
            nama: "Grace Miller",
            nrp: "777777777",
            jurusan: "Informatika",
        },
        {
            nama: "Hank Jones",
            nrp: "888888888",
            jurusan: "Sistem Informasi Bisnis",
        },
        {
            nama: "Ivy Thomas",
            nrp: "999999999",
            jurusan: "Data Science",
        },
        {
            nama: "Jack Anderson",
            nrp: "101010101",
            jurusan: "Informatika",
        }
    ];
    

    return (
        <>
            <Head>
                <title>SAOCP-Tambah Asisten</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className='col-span-2'>
                    <SidebarUser>

                    </SidebarUser>
                </div>
                <div className="mt-10 w-full h-72 col-span-4">
                    <div className='judul'>
                        <AddTitle type="Asisten" matkul="Pemrograman Berorientasi Objek" 
                            pararel="A" hari="Senin" jam_start="08.00" jam_end="10.00" ruangan="P.202" />    
                    </div>

                    <div className="tabel-asisten">
                        <LabelAdd type="Asisten" slot_used="3" total_slot="4" />
                        <TableNoButton TABLE_HEAD={head_asisten} TABLE_ROWS={data_asisten}/>
                    </div>

                    <div className='tabel-add mt-10'>
                        <LabelTableAdd type="Asisten" total_available="10"/>
                    </div>
                    
                </div>
                
            </div>
            
           
        </>
    );
}
