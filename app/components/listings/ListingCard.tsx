'use client'

import useCountries from "@/app/hooks/useCountries";
import {SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../button/HeartButton";
import Button from "../button/Button";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionId,
  actionLabel,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId!);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation){
        return reservation.totalPrice
    }

    return data.price
  }, [data.price, reservation])

  const reservationData = useMemo(() => {
    if (!reservation){
        return null
    }
    const start = new Date(reservation!.startDate);
    const end = new Date(reservation!.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return <div onClick={()=>router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
    <div className="flex flex-col w-full gap-2">
        <div className="w-full aspect-square relative overflow-hidden rounded-xl">
            <Image
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
            />
            <div className="absolute top-3 right-3">
                <HeartButton listingId={data.id} currentUser={currentUser}/>
            </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationData || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />}
    </div>
  </div>;
};

export default ListingCard;
