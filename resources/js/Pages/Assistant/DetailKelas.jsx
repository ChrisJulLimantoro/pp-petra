import { Head } from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import LabelTable from '@/Components/Assistant/Labels/LabelTable';
import DetailsTitle from '@/Components/Assistant/Title/DetailsTitle';
import TableWithEditDeleteButton from '@/Components/Assistant/Table/TableWithEditDeleteButton';


export default function DetailKelas({ auth }) {
    const head_asisten = ["Nama", "NRP", "Jurusan", "Action"];
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
    
    const head_mhs = ["Nama", "NRP", "Jurusan", "Action"];
    const data_mhs = [
        {
          nama: "Mia Amalia",
          nrp: "234567890",
          jurusan: "Informatika",
        },
        {
          nama: "Reza Irawan",
          nrp: "345678901",
          jurusan: "Data Science",
        },
        {
          nama: "Amelia Putri",
          nrp: "456789012",
          jurusan: "Sistem Informasi Bisnis",
        },
        {
          nama: "Dimas Pratama",
          nrp: "567890123",
          jurusan: "Informatika",
        },
        {
          nama: "Rini Wulandari",
          nrp: "678901234",
          jurusan: "Data Science",
        },
        {
          nama: "Fajar Ramadhan",
          nrp: "789012345",
          jurusan: "Sistem Informasi Bisnis",
        },
        {
          nama: "Aditya Pratama",
          nrp: "890123456",
          jurusan: "Informatika",
        },
        {
          nama: "Dewi Lestari",
          nrp: "901234567",
          jurusan: "Data Science",
        },
        {
          nama: "Rangga Permadi",
          nrp: "012345678",
          jurusan: "Sistem Informasi Bisnis",
        },
      ];
      

    
    return (
        <>
            <Head>
                <title>SAOCP-Detail Kelas</title>
            </Head>
            <div className="grid grid-cols-7 gap-1">
                <div className='col-span-2'>
                    <SidebarUser>

                    </SidebarUser>
                </div>

                <div className="mt-10 w-full h-72 col-span-4">
                    <div className='judul'>
                        <DetailsTitle matkul="Pemrograman Berorientasi Objek" pararel="A" hari="Senin" 
                          jam_start="08.00" jam_end="10.00" ruangan="P.202"/>    
                    </div>

                    <div className='tabel_asisten mt-10'>
                        <LabelTable type="Asisten" slot_used="3" total_slot="3" 
                          addHref="http://pp-petra.test/assistant/detailkelas/addassistant"/>
                        <TableWithEditDeleteButton TABLE_HEAD={head_asisten} TABLE_ROWS={data_asisten}/>
                    </div>

                    <div className='tabel_mahasiswa mt-10'>
                        <LabelTable type="Mahasiswa" slot_used="10" total_slot="20"
                          addHref="http://pp-petra.test/assistant/detailkelas/addmahasiswa"/>
                        <TableWithEditDeleteButton TABLE_HEAD={head_mhs} TABLE_ROWS={data_mhs}/>
                    </div>
                    <div className="mt-10">
                    </div> 
                </div>
                
            </div>
            
           
        </>
    );
}
