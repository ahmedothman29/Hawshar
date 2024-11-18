'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  return(
    <Image
    onClick={() => router.push('/')}
     alt = "Logo" 
      className="hidden md:block cursor-pointer -ml-5  " 
      height="200" 
      width="200"
      src="/images/hawshar.png" 
      />
  );
};
export default Logo;