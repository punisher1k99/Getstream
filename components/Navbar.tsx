import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItems";
import { HiChevronDoubleDown } from "react-icons/hi";
import { FiSearch } from "react-icons/Fi";
import { BsBell } from "react-icons/Bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          console.log(window.scrollY)
          if (window.scrollY >= TOP_OFFSET) {
            setShowBackground(true)
          } else {
            setShowBackground(false)
          }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
      }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, []);
    
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, []);

    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>

                <img className="h-6 lg:h-9" src="/images/logo.png" alt="" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">

                    <NavbarItem label="Home" />
                    <NavbarItem label="Movies" />
                    <NavbarItem label="TV Series" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <HiChevronDoubleDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <FiSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="" />
                        </div>
                        <HiChevronDoubleDown className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                            <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;