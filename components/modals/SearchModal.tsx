'use client';


import qs from "query-string"
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range } from "react-date-range";
import dynamic from "next/dynamic";
import CitySelect, { CitySelectValue } from "../Inputs/CitySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";


enum STEPS {

  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () =>{

  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CitySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  } ), [location]);

  const onBack = useCallback(() => {
    setStep((value)=> value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value)=> value +1 );
  }, []);

  const onSubmit = useCallback(async () => {

    if(step != STEPS.INFO){
      return onNext();
    }

    let currentQuery = {};

    if(params) {
      currentQuery = qs.parse(params.toString());
    }

    const upadatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if(DateRange.startDate){
      upadatedQuery.startDate = formatISO(DateRange.startDate);
    }
    if(DateRange.endDate){
      upadatedQuery.endDate = formatISO(DateRange.endDate);
    }


    const url = qs.stringifyUrl({
      url: '/',
      query: upadatedQuery
    },{skipNull: true});

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);




  } ,[
    step, 
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params


  ]);

  const actionLabel = useMemo(()=>{
    if(step == STEPS.INFO){
      return 'Search';
    }
    return 'Next';

  }, [step]);

  const secondaryActionLabel = useMemo(()=>{
    if(step == STEPS.LOCATION){
      return undefined;
    }

    return 'Back';
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading

        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />

      <CitySelect
        value={location}
        onChange={(value) => 
          setLocation(value as CitySelectValue)
        }

      />
      <hr />
      <Map
        center ={location?.latlng}
      />


    </div>
  )

  if(step == STEPS.DATE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
        />

        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />

      </div>
    )
  }

  if(step == STEPS.INFO){
    bodyContent= (
      <div className="flex flex-col gap-8">

        <Heading
        title="More Information"
        subtitle="Find your perfect place!"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming? "
          value={guestCount}
          onChange={(value) => setGuestCount(value)}

        />
         <Counter
          title="Rooms"
          subtitle="How many Rooms do you need ? "
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
          
        />
         <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need? "
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
          
        />

      </div>
    )
  }

  return (
    
    <Modal
      isOpen = {searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.LOCATION? undefined: onBack}
      body={bodyContent}
    />

  );
}
export default SearchModal;