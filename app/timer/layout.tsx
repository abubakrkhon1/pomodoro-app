'use client';

import { Suspense } from 'react';
import Loading from '@/components/custom/Loading'; // Replace with your actual loading component
import MainHeadNav from '@/components/custom/MainHeadNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Suspense fallback={<Loading />}>
                    <div className="w-full h-screen">
                        <MainHeadNav />
                        <div className="h-screen">
                            {children}
                        </div>
                    </div>
                </Suspense>
            </body>
        </html>
    );
}
