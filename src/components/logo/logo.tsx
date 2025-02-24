import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/imgs/Leaguefund.png"
        alt="Logo"
        width={100}
        height={100}
        priority
      />
    </Link>
  );
};

export default Logo;
