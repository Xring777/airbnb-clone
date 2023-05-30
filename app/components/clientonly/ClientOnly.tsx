'use client'

import {ReactNode, useEffect, useState} from "react";
import {FC} from "react/ts5.0";

interface ClientOnlyProps {
    children: ReactNode;
}

const ClientOnly: FC<ClientOnlyProps> = ({
                                             children
                                         }) => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true)
    }, []);
    if (!hasMounted) return null
    return (
        <>
            {children}
        </>
    );
};

export default ClientOnly;