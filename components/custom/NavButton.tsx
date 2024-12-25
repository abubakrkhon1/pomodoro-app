import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function NavButton({ page, styles }: any) {
    const { name, link } = page;

    const customStyles = `${styles} w-[60%] h-[40px]`;

    return (
        <Link href={link} className="flex items-center justify-center p-1">
            <Button variant="ghost" className={customStyles}>
                <h1 className='font-semibold text-md'>{name}</h1>
            </Button>
        </Link>
    )
}

export default NavButton