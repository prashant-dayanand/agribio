import Image from "next/image";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--bg)] border-t border-[var(--bdM)] py-12 md:py-16 mt-auto">
            <div className="section-max flex flex-col items-center justify-center text-center px-4">
                {/* Logo */}
                <div className="relative w-60 h-60 mb-6">
                    <Image
                        src="/logo.png"
                        alt="AgriBioVentures Logo"
                        fill
                        className="object-contain"
                        priority={false}
                    />
                </div>

                {/* Description */}
                <p className="max-w-[500px] text-sm md:text-base text-[var(--t2)] leading-relaxed font-medium mb-8">
                    Decentralising funding and automating operational overhead for the next generation of on-chain Agritech and Biotech startups.
                </p>

                <div className="w-full max-w-[600px] h-px bg-gradient-to-r from-transparent via-[var(--bdA)] to-transparent mb-8" />

                {/* Copyright */}
                <p className="text-[0.65rem] font-bold text-[var(--t3)] uppercase tracking-widest">
                    &copy; {currentYear} AgriBioVentures. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
