import React, { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface PageProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLable: string;
    disable?: boolean;
    secondaryAction?: () => void;
    secondaryActionLable?: string;
}

const Page: React.FC<PageProps> = ({
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLable,
    disable,
    secondaryAction,
    secondaryActionLable
}) => {

    const handleClose = useCallback(() => {
        if (disable) {
            return;
        }

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disable, onClose]);

    const handleSubmit = useCallback(() => {
        if (disable) {
            return;
        }

        onSubmit()
    }, [disable, onSubmit]);

    // const handleSecondaryAction = useCallback(() => {
    //     if (disable || !secondaryAction) {
    //         return;
    //     }

    //     secondaryAction();
    // }, [disable, secondaryAction]);

    return (
        <>
            <div className=" h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* HEADER */}
                <div className=" flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                    <button 
                        onClick={handleClose}
                        className=" p-1 border-0 hover:opacity-70 absolute left-9">
                        <IoMdClose size={18} />
                    </button>
                    <div className=" text-lg font-semibold">
                        {title}
                    </div>
                </div>
                {/* BODY */}
                <div className=" relative p-6 flex-auto">
                    {body}
                </div>
                {/* FOOTER */}
                <div className=" flex flex-col gap-2 p-6">
                    <div className=" flex flex-row items-center gap-4 w-full">
                        {secondaryAction && secondaryActionLable && (<Button
                            outline
                            disabled={disable}
                            label={secondaryActionLable}
                            onClick={secondaryAction}
                        />)}
                        <Button
                            disabled={disable}
                            label={actionLable}
                            onClick={handleSubmit}
                        />
                    </div>
                    {footer}
                </div>
            </div>
        </>
    )
}

export default Page;