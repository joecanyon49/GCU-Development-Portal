'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import clsx from 'clsx';

interface LayoutControllerProps {
    children: React.ReactNode;
    userName?: string;
}

export default function LayoutController({ children, userName }: LayoutControllerProps) {
    const pathname = usePathname();
    const isProposalBuilder = pathname?.startsWith('/tools/proposal-builder');

    return (
        <div className="min-h-screen flex bg-background text-foreground">
            {/* Sidebar - Conditionally Rendered */}
            {!isProposalBuilder && (
                <Sidebar userName={userName} />
            )}

            {/* Main Content Area */}
            <main className={clsx(
                "flex-1 min-h-screen transition-all duration-300",
                !isProposalBuilder && "md:ml-64" // Add margin only if sidebar is present
            )}>
                {children}
            </main>
        </div>
    );
}
