'use client';

import { useEffect, useState } from "react";
import { handbookContent } from "../app/training/handbook/content";

export default function TrainingProgress() {
    const [mounted, setMounted] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('gcu_handbook_progress');
        if (saved) {
            const completed = JSON.parse(saved);
            setCompletedCount(completed.length);
        }
    }, []);

    const total = handbookContent.length;
    const progress = Math.round((completedCount / total) * 100);

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gcu-purple transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-sm font-medium text-gcu-purple-light whitespace-nowrap">
                {progress}% Complete
            </span>
        </div>
    );
}
