import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";

const Logo = () => {
  const { toggleSidebar } = useSidebar();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSidebar();
  };

  return (
    <button onClick={handleLogoClick} className="flex items-center gap-2">
      <Image
        src="/images/logo/LeagueFund.png" // ✅ Ensure the leading slash
        alt="LeagueFund Logo"
        width={150} // Adjust as needed
        height={150}
        priority
      />
    </button>
  );
};

export default Logo;
