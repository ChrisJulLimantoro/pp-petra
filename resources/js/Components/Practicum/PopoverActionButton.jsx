import React, { useRef } from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    ButtonGroup,
} from "@material-tailwind/react";
import {
    TrashIcon,
    PencilSquareIcon,
    DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export function PopoverActionButton(props) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const formDelete = useRef(null);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    const handleDelete = async () => {
        res = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (res.isConfirmed) {
            formDelete.current.submit();
        }
    };

    return (
        <Popover open={openPopover} handler={setOpenPopover}>
            <PopoverHandler {...triggers}>{props.children}</PopoverHandler>
            <PopoverContent
                {...triggers}
                className="z-50 max-w-[26rem] shadow-xl"
            >
                <ButtonGroup variant="outlined">
                    <Button className="py-2 focus-visible:outline-none hover:bg-gray-200 focus:ring-0 px-6">
                        <DocumentMagnifyingGlassIcon className="w-[24px]" />
                    </Button>
                    <Button
                        className="py-2 focus-visible:outline-none hover:bg-gray-200 focus:ring-0"
                        onClick={props.openEditForm}
                    >
                        <PencilSquareIcon className="w-[24px]" />
                    </Button>
                    <Button
                        className="py-2 focus-visible:outline-none hover:bg-gray-200 focus:ring-0"
                        onClick={() => handleDelete(props.practicumId)}
                    >
                        <TrashIcon className="w-[24px]" />
                    </Button>
                </ButtonGroup>
                <form
                    action={route("practicum.destroy", props.practicumId)}
                    ref={formDelete}
                    method="post"
                >
                    <input type="hidden" name="_method" value="delete" />
                    <input
                        type="hidden"
                        name="_token"
                        value={
                            document.head.querySelector(
                                'meta[name="csrf-token"]'
                            ).content
                        }
                    />
                </form>
            </PopoverContent>
        </Popover>
    );
}
