
'use client';

import useCities from "@/app/hooks/useCities";
import Select from "react-select";

export type CitySelectValue = {
  label: string;
  value: string;
  region: string;
};

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCities();
  
  return (
    <div>
      <Select
        placeholder="Select a city"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'green',
            primary25: '#e9ffdb'
          }
        })}
      />
    </div>
  );
};

export default CitySelect;
