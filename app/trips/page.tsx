import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/clientonly/ClientOnly";
import EmptyState from "../components/empty-state/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser){
        return <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please Login "/>
        </ClientOnly>
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (!reservations){
        return <ClientOnly>
            <EmptyState title="No trips found" subtitle="Looks like you haven't reserve any trips."/>
        </ClientOnly>
    }

    return ( <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser}            
        />
    </ClientOnly> );
}
 
export default TripsPage;