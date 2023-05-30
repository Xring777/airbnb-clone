import prisma from '@/app/libs/prismadb';

import getSession from './getSession';
import {User} from "@prisma/client";

const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const currentUser:User = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }

        return {...currentUser,
        createdAt:currentUser.createdAt.toISOString(),
        updatedAt:currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emialVerified?.toISOString() || null,

        };
    } catch (error: any) {
        return null
    }
}

export default getCurrentUser