import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo/LeagueFund.png" // ✅ Ensure the leading slash
        alt="LeagueFund Logo"
        width={100} // Adjust as needed
        height={100}
        priority
      />
    </Link>
  );
};

export default Logo;
