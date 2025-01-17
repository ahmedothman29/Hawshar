

'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CitySelect, { CitySelectValue } from "../Inputs/CitySelect";

import dynamic from "next/dynamic";
import useCities from "@/app/hooks/useCities";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading,setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const { getByValue } = useCities();
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    if(step != STEPS.PRICE){
      return onNext();
    }
    setIsLoading(true);
    axios.post('/api/listings' , data)
    .then(() => {
      toast.success('Listing Created!');
    router.refresh();
    reset();
    setStep(STEPS.CATEGORY);
    rentModal.onClose();
    })
    .catch(() =>{
      toast.error('Something Went Wrong');
    }) .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

 
  const selectedCity = location ? getByValue(location.value) : null;

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a Category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto"
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CitySelect
          value={location as CitySelectValue}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={selectedCity?.latlng} />
      </div>
    );
  }

  if(step == STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading 
        title="Share Some Information About Your Place"
        subtitle="What amenities do you offer ?"
        />
        <Counter 
          title="Guests"
          subtitle="How many Guests do you allow? "
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        
        <Counter 
          title="Rooms"
          subtitle="How many Rooms do you have ? "
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter 
          title="Bathrooms"
          subtitle="How many Bathrooms do you have? "
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
        

      </div>
    )
  }
  if(step == STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
        title="Add the photos of your property"
        subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) =>setCustomValue('imageSrc' , value)}
        />

      </div>
    )
  }
  if(step == STEPS.DESCRIPTION){
    bodyContent= (
      <div className=" flex flex-col gap-8">
        <Heading
          title="How Would You describe Your Place"
          subtitle="Short and Sweet works best"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }

  if(step == STEPS.PRICE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set Your Price"
          subtitle="How Much Do you Charge Per Night"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Hawshar Rent"
      body={bodyContent}
    />
  );
};

export default RentModal;
