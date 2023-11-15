import React, { useState } from "react";
import { Input, Typography, Button } from "@material-tailwind/react";

export default function InputNRP(props) {
    const { title, newStudents, nrp, setNrp } = props;
    const [error, setError] = useState("");

    const onChange = ({ target }) => {
        setNrp(target.value);
        if (target.value.length !== 9) {
            setError("NRP must be 9 characters long");
        } else {
            setError("");
        }
    };

    const handleClick = () => {
        if (nrp.length !== 9) {
            setError("NRP must be 9 characters long");
            return;
        }
        newStudents.push({
            id: newStudents.length,
            nama: "Orang Ganteng " + newStudents.length,
            nrp: nrp,
            jurusan: "Informatika",
        });
        setNrp("");
        setError("");
    };

    return (
        <div>
            <Typography variant="h5" color="blue-gray" className="mt-10 mb-3">
                Input {title}
            </Typography>

            <div className="flex gap-8">
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        type="nrp"
                        label="Input NRP"
                        value={nrp}
                        onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                        autoFocus
                    />
                    <Button
                        size="sm"
                        color={nrp ? "gray" : "blue-gray"}
                        disabled={!nrp || error}
                        className="!absolute right-1 top-1 rounded"
                        onClick={handleClick}
                    >
                        Add
                    </Button>
                </div>
            </div>
            {error && (
                <Typography variant="small" color="red" className="mt-2">
                    {error}
                </Typography>
            )}
            <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                    />
                </svg>
                Untuk menyimpan data mahasiswa jangan lupa tekan tombol save
                changes
            </Typography>
        </div>
    );
}
