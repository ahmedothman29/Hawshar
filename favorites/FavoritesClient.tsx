import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing } from "../types";


interface FavoritesClientProps{
  listings: SafeListing[];
  currentUser?: SafeUser | null;

}


const FavoritesClient:React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) =>{


  return (
    <Container>
    <div className="mt-5 ">
    <Heading
      title="Favorites"
      subtitle="List of places you have favorited! "
    />
    <hr className="mt-4 "/>

    <div className="
        mt-5
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
    ">
      {listings.map((listing) => (
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
        />
      ))}

    
    </div>
    </div>

    </Container>
  );
}
export default FavoritesClient;