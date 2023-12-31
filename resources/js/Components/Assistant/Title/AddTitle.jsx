import { Typography, Breadcrumbs, } from "@material-tailwind/react";

export default function DetailsTitle(props) {
    // type = mahasiswa/asisten
    const {type, matkul, pararel, hari, jam_start, jam_end, ruangan, practicum_id} = props;

    return (
        <div>
            <Breadcrumbs fullWidth className="mb-5"> 
                    {window.innerWidth >= 768 && (
                        <>
                            <a href="#" className="opacity-60">
                                Asisten
                            </a>
                        </>
                    )}
                    <a href={route('Praktikum.Manage Praktikum')} className="opacity-60">
                        Kelas Asisten
                    </a>
                    <a href={route('practicum.detail', practicum_id)} className="opacity-60">
                        Detail Praktikum
                    </a>
                    <a href="#">Add {type}</a>
            </Breadcrumbs>

            <Typography variant="h2" color="blue-gray">
                Add {type}
            </Typography>
                    
            <Typography variant="h4" color="gray" className="mb-2">
                {matkul} ({pararel})
            </Typography>
            <p className="mb-2"> Jadwal : {hari}, {jam_start} - {jam_end}</p>         
            <p className='mb-4'> Ruangan : {ruangan} </p>         

        </div>
    );
}

