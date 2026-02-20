"use client";
import {useState, useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {MobileToggleBtn} from "./mobileToggleBtn";
import {DesktopToggleBtn} from "./desktopToggleBtn";
import {UserProfileSection} from "./userProfileSection";
import {AppNav} from "./appNav";
import {UserNav} from "./userNav";

export const Drawer = () => {
    const {user, setUser, loading} = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile screen size and handle drawer state
    useEffect(() => {
        const checkIfMobile = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);

            // Only automatically change the drawer state when the view type changes
            // This prevents resetting the user's preference when just resizing within the same view type
            if (isMobileView !== isMobile) {
                setIsOpen(!isMobileView); // Open on desktop, closed on mobile by default
            }
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, [isMobile]);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    async function handleLogout() {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        setUser(null);
        router.push("/");
    }

    return (
        <>
            {/* Mobile Toggle Button - Shown only on mobile */}
                <MobileToggleBtn isOpen={isOpen} toggleDrawer={toggleDrawer}/>

            {/* Overlay for mobile - only shown when drawer is open on mobile */}
            {isMobile && isOpen && (
                <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setIsOpen(false)}></div>
            )}

            {/* Drawer content */}
                <div
                    className={`${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed  top-0 left-0 lg:static lg:translate-x-0 h-full z-20
        w-64 bg-white  dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 transition-transform duration-500 ${
                        !isOpen && !isMobile ? "lg:-translate-x-full lg:w-0" : ""
                    }`}
                >
                    {/* Toggle Button for Desktop - Shown only on desktop */}
                    <DesktopToggleBtn isOpen={isOpen} toggleDrawer={toggleDrawer}/>

                    <div className="flex flex-col h-full overflow-y-auto">
                        <div className="p-4 mb-6 min-h-[80px] flex flex-col justify-center">
                            {loading ? (
                                <div className="animate-pulse flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"/>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"/>
                                </div>
                            ) : (
                                user && <UserProfileSection user={user}/>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <AppNav isMobile={isMobile} setIsOpen={setIsOpen}/>
                        {/* Bottom Section */}
                        <UserNav isMobile={isMobile} setIsOpen={setIsOpen} handleLogout={handleLogout}/>
                    </div>
                </div>
        </>
    )
        ;
};
