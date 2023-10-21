import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
 
export default function InputNRP(props) {
    const {title} = props;
    const [nrp, setNrp] = React.useState("");
    const onChange = ({ target }) => setNrp(target.value);

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
                    />
                    <Button
                        size="sm"
                        color={nrp ? "gray" : "blue-gray"}
                        disabled={!nrp}
                        className="!absolute right-1 top-1 rounded"
                    >
                        Add
                    </Button>
                </div>
            </div>

        </div>
    );
}
