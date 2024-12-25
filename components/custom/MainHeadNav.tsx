import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ThemeToggle'

function MainHeadNav() {
    return (
        <div className="flex px-6 w-full items-center justify-between py-4 border-b-2">
            <Link href="/" className='font-bold text-xl'>Pomodoro App</Link>
            <ModeToggle />
        </div>
    )
}

export default MainHeadNav