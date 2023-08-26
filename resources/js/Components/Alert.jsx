export default function Alert({ bool, message, props }) {
    const stats = bool ? "success" : "error";
    const colorBg = bool ? "bg-green-500" : "bg-red-400";
    const colorText = bool ? "text-green-50" : "text-rose-500";
    return (
        <div className="text-center py-4 lg:px-4">
            <div
                className="p-2 items-center shadow-lg shadow-gray-200 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
            >
                <span
                    className={
                        "flex rounded-full " +
                        colorBg +
                        " text-slate-50 uppercase px-2 py-1 text-xs font-bold mr-3"
                    }
                >
                    {stats}
                </span>
                <span
                    className={
                        "font-semibold " +
                        colorText +
                        " mr-2 text-left flex-auto"
                    }
                >
                    {message}
                </span>
                {/* <svg
                        className="fill-current opacity-75 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                    </svg> */}
            </div>
        </div>
    );
}
