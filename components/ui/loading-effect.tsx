"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingEffectProps {
    className?: string;
}

export function LoadingEffect({ className }: LoadingEffectProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center h-full", className)}>
            <motion.div
                className="relative w-32 h-32"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Outer spinning ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#D8FF76]/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Middle spinning ring */}
                <motion.div
                    className="absolute inset-3 rounded-full border-4 border-[#D8FF76]/50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner spinning ring */}
                <motion.div
                    className="absolute inset-6 rounded-full border-4 border-[#D8FF76]/70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Center logo/icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M12 4L4 8L12 12L20 8L12 4Z"
                            stroke="#D8FF76"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
                        />
                        <motion.path
                            d="M4 12L12 16L20 12"
                            stroke="#D8FF76"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
                        />
                        <motion.path
                            d="M4 16L12 20L20 16"
                            stroke="#D8FF76"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
                        />
                    </svg>
                </motion.div>

                {/* Orbiting dot */}
                <motion.div
                    className="absolute w-3 h-3 bg-[#D8FF76] rounded-full shadow-lg shadow-[#D8FF76]/20"
                    animate={{
                        x: [0, 16, 0, -16, 0],
                        y: [-16, 0, 16, 0, -16],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ top: "50%", left: "50%", marginLeft: "-6px", marginTop: "-6px" }}
                />
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