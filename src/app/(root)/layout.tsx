import LongLogo from "@/public/logo/dodamLongLogo.svg"
import { MENUS } from "@src/widgets/sidebar/constants/sidebar-item";
import Sidebar from "@src/widgets/sidebar/ui";

const MainLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex px-8 py-12 h-screen justify-start items-start gap-6 bg-background-default">
      <Sidebar 
        menus={MENUS} 
        logo={<div className="p-2"><LongLogo/></div>}
      />
      {children}
    </div>
  );
}

export default MainLayout