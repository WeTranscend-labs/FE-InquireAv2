"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingEffectProps {
    className?: string;
}

export function LoadingSpinner({ className }: LoadingEffectProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center h-full", className)}>

            <motion.div
                className="relative w-40 h-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full border-t-4 border-[#D8FF76]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-4 rounded-full border-t-4 border-[#D8FF76]/70"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 6V12L16 14"
                            stroke="#D8FF76"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="12" cy="12" r="10" stroke="#D8FF76" strokeWidth="2" />
                    </svg>
                </motion.div>
            </motion.div>


            {/* Text animation */}
            <div className="mt-8 relative">
                <motion.p
                    className="text-lg font-bold text-[#D8FF76]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    >
                        I
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
                    >
                        n
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    >
                        q
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                    >
                        u
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    >
                        i
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                    >
                        r
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                    >
                        e
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, -2, 0]
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.7 }}
                    >
                        A
                    </motion.span>
                </motion.p>
            </div>
        </div>
    );
}