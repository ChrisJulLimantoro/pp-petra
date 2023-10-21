import { Button, Spinner } from "@material-tailwind/react";
import { forwardRef, useImperativeHandle, useState } from "react";

function ButtonWithLoadingSpinner(props, ref) {
    const [loading, setLoading] = useState(false);
    useImperativeHandle(ref, () => ({
        setLoading: setLoading,
    }));

    return (
        <Button type={props.type || 'submit'} className={props.className} disabled={loading}>
            <span>
                {
                    loading ? <Spinner color="white" className="h-4 w-4 mx-auto" /> : props.children
                }
            </span>
        </Button>
    );
}

export default forwardRef(ButtonWithLoadingSpinner);