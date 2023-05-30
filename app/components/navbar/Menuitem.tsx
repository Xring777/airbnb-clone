'use client'

import React from "react";
import {IconType} from "react-icons";

interface MenuItemProps {
    onClick: () => void,
    label: string,
    icon?: IconType
}

const MenuItem: React.FC<MenuItemProps> = ({
                                               onClick,
                                               label,
    icon: Icon
                                           }) => {
    return <div onClick={onClick} className={'flex items-center justify-center px-4 py-3 hover:bg-neutral-200 transition font-semibold'}>
        {Icon && <Icon className={`ml-3 mr-1`} size={18}/>}
        <span className={`flex-1 mr-3 ml-1`}>{label}</span>
    </div>
}


export default MenuItem;