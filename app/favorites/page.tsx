import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../components/clientonly/ClientOnly";
import EmptyState from "../components/empty-state/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length === 0){
        return <ClientOnly>
            <EmptyState title="No favorites found" subtitle="Looks like you have no favorites"/>
        </ClientOnly>
    }

    return ( <ClientOnly>
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly> );
}
 
export default ListingPage;