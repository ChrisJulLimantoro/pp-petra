import { Typography, Breadcrumbs, } from "@material-tailwind/react";

export default function DetailsTitle(props) {
    const {matkul, pararel, hari, jam_start, jam_end} = props;

    return (
        <div>
            <Breadcrumbs fullWidth className="mb-5">
                    <a href="#" className="opacity-60">
                        Asisten
                    </a>
                    <a href="#" className="opacity-60">
                        Kelas Asisten
                    </a>
                    <a href="#">Detail Praktikum</a>
            </Breadcrumbs>

            <Typography variant="h2" color="blue-gray">
                Detail Praktikum
            </Typography>
                    
            <Typography variant="h4" color="gray" className="mb-2">
                Praktikum {matkul} ({pararel})
            </Typography>
            <p className="mb-2"> Jadwal : {hari}, {jam_start} - {jam_end}</p>         
            <p className='mb-4'> Ruangan : P.202 </p>         

        </div>
    );
}

