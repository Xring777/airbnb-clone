import {FC} from "react";
import {IconType} from "react-icons";

interface ButtonProps {
    label: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    nonFullWidth?: boolean,
    icon?: IconType
}

const Button: FC<ButtonProps> = ({
                                     label, onClick, disabled, outline, small, nonFullWidth,
                                     icon: Icon
                                 }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        flex
        justify-center
        items-center
        ${!nonFullWidth && 'w-full'}
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white '}
        ${small ? 'py-1' : 'py-2'}
        ${small ? 'text-sm' : 'text-lg'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        `}>
            {Icon && <Icon className={`ml-3 mr-1`} size={small ? 18 : 24}/>}
            <span className={`flex-1 mr-3 ml-1`}>{label}</span>
        </button>
    );
}

export default Button;