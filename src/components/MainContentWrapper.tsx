'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHandbook = pathname?.startsWith('/training/handbook');
    const isProposalBuilder = pathname?.startsWith('/tools/proposal-builder');
    const isCampusMap = pathname?.startsWith('/tools/campus-map');

    return (
        <div className={clsx(
            "transition-all duration-300",
            !isHandbook && !isProposalBuilder && !isCampusMap && "p-8 max-w-7xl mx-auto"
        )}>
            {children}
        </div>
    );
}
