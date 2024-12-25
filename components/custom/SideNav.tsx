'use client';
import React from 'react';
import NavButton from './NavButton';
import { usePathname } from 'next/navigation';

function SideNav({ pages }: any) {
    const pathname = usePathname();

    return (
        <div className="w-[250px] h-[93%] flex flex-col justify-between border-r-2 border-gray-200/70 dark:border-gray-200/20 pt-4">
            {/* Flex container for the navigation buttons */}
            <div className="flex flex-col">
                {pages.map((page: any, id: any) => (
                    <NavButton
                        key={id}
                        page={page}
                        styles={pathname === page.link ? "bg-gray-500/10 dark:bg-gray-200/10 mb-2" : "mb-2"}
                    />
                ))}
            </div>
            {/* User Credentials Section*/}
            <div className="w-full h-[48px] rounded-md shadow flex items-center pb-10 pl-5">
                User credentials
            </div>
        </div>
    );
}

export default SideNav;
