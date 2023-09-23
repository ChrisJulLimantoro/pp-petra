import {Head} from '@inertiajs/react';
import SidebarUser from "@/Layouts/SidebarUser";
import SelectMatkul from "@/Components/SelectMatkul";
import { Button } from "@material-tailwind/react";


export default function Dashboard({ auth }) {
    const dataMatkul=["basis data lanjutan", "basis data", "struktur data"];
    const Pilihan= ["A", "B", "C", "D", "E"];
    const styles = `
    .divLabel{
        width: 15vw;
    }

    .divButton{
        margin-left: 6vw !important;
    }

    .btn{
        width: 10vw;
    }
    
  `;
    return (
        <>
            <Head>
                <title>SAOCP-Daftar Praktikum</title>
                <style>{styles}</style>
            </Head>
            <div className="grid grid-cols-3">
                <div className='col-span-1'>
                    <SidebarUser>

                    </SidebarUser>
                </div>
                <div className="mt-16 w-full h-72 mx-8">
                    <form action="">
                        <div className="grid grid-cols-2 mb-8">
                            <div className="mt-2 divLabel">
                                <h1 className="w-full">Mata Kuliah Praktikum</h1>
                                
                            </div>
                            <div>
                                <SelectMatkul data={dataMatkul} title="Pilih Mata Kuliah" >

                                </SelectMatkul>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 mb-8">
                            <div className="mt-2 divLabel">
                                <h1 className="w-full">Pilihan 1</h1>
                                
                            </div>
                            <div>
                                <SelectMatkul data={Pilihan} title="Pilihan Pertama" >

                                </SelectMatkul>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 mb-8">
                            <div className="mt-2 divLabel">
                                <h1 className="w-full">Pilihan 2</h1>
                                
                            </div>
                            <div>
                                <SelectMatkul data={Pilihan} title="Pilihan Pertama" >

                                </SelectMatkul>
                            </div>
                        </div>

                        <div className="grid place-content-center divButton">
                            <div>
                                <Button variant="gradient" color="indigo" className='btn'>Input</Button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
            
           
        </>
    );
}
