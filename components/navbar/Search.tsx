'use client';

import useCities from "@/app/hooks/useCities";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {

  const searchModal = useSearchModal();
  const params = useSearchParams();
  const {getByValue} = useCities();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if(locationValue){
      return getByValue(locationValue as string)?.label;
    }
    return 'AnyWhere';
  },[getByValue, locationValue]);

  const durationLabel =useMemo(()=> {
    if(startDate && endDate){
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if(diff == 0) {
        diff = 1;
      }
      return `${diff} Days`;

    }

    return' Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if(guestCount){
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);



  return(
    <div
      onClick={searchModal.onOpen}
      className="
        
        border-[2px]
        border-green-800
        border-opacity-40
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-md
        hover:shadow-lg
        transition
        cursor-pointer
        "
        >
          <div
          className="
          flex
          flex-row
          items-center
          justify-between
          ">
            <div
            className="
            text-gray-400
            text-sm
            text-center
            px-7
            ">
              {locationLabel}

            </div>
            <div className="
            hidden
            text-sm
            sm:block
            text-gray-400
            px-7
            border-x-[1px]
            border-grey-600
            flex-1
            text-center
            ">
              {durationLabel}

            </div>
            <div
            className="
            text-sm
            pl-6
            pr-2
            text-gray-400
            flex
            flex row
            items-center
            gap-3
            ">
              <div className="hidden sm:block text-gray-400"> {guestLabel}</div>
              <div
              className="
              p-2
              bg-green-600
              rounded-full
              text-white
              ">
                <BiSearch size = {20} />

              </div>

            </div>

          </div>

    </div>
  );
}
export default Search;
