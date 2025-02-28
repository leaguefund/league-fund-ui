import Image from "next/image";
import Link from "next/link";

const Icon = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo/icon.png" // ✅ Ensure the leading slash
        alt="LeagueFund Icon"
        width={30} // Adjust as needed
        height={30}
        priority
      />
    </Link>
  );
};

export default Icon;
