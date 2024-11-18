'use client';
import { TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiAncientColumns, GiBoatFishing, GiCastle, GiForestCamp} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

import { IoDiamondOutline } from "react-icons/io5";
import { RiCaravanLine } from "react-icons/ri";
import { PiFarm } from "react-icons/pi";

export const categories = [
  {
    label: 'LUX',
    icon: IoDiamondOutline,
    descrption: 'this property is very Luxurios'
  },
  {
    label: 'Caravans',
    icon: RiCaravanLine,
    descrption: 'this property is a Caravan'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    descrption: 'this property is Modern'
  },
  {
    label: 'Mountains',
    icon: TbMountain,
    descrption: 'this property is in the Mountains'
  },
  {
    label: 'Pools',
    icon: TbPool,
    descrption: 'this property has a pool'
  },
  {
    label: 'Farms',
    icon: PiFarm,
    descrption: 'this property is In an Farm'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    descrption: 'this property is close to a lake'
  },
  {
    label: 'Relics',
    icon: GiAncientColumns ,
    descrption: 'this property is near Historical Sites'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    descrption: 'this property is near a Castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    descrption: 'this property has camping activites'
  },
  
]
const Categories = () =>{
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname == '/';
  if(!isMainPage){
    return null;
  }

  return (
    <Container>
      <div 
      className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto"
        >
          
          {categories.map((item) => (
            <CategoryBox
              key = {item.label}
              label = {item.label}
              selected = {category == item.label}
              icon = {item.icon}
             
            />
          ))}

      </div>
    </Container>
    )
}
export default Categories;