"use client";

import { LoadingEffect } from "@/components/ui/loading-effect";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextProps {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    // Set loading when path changes
    useEffect(() => {
        setIsLoading(true);

        // Simulate loading time (between 1-2 seconds)
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000 + Math.random() * 1000);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading ? (
                <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
                    <LoadingEffect />
                </div>
            ) : (
                children
            )}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};