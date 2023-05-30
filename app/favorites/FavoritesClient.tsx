'use client'

import { useRouter } from "next/navigation";
import Container from "../components/container/Container";
import Heading from "../components/heading/Heading";
import { SafeListing, SafeUser } from "../types";
import axios from "axios";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return ( <Container>
        <Heading title="Favorites" subTitle="List of places you have favorited!"/>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container> );
}
 
export default FavoritesClient;