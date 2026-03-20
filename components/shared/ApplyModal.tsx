"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEPS = ["Founder", "Startup", "Idea", "Stage", "Submit"];

const InputField = ({ label, required = false, ...props }: any) => (
    <div className="mb-5">
        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
            {label} {required && <span className="text-[var(--gn)]">*</span>}
        </label>
        <input
            className="w-full bg-[#F3F0E9] border border-[#E5E0DA] rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 focus:ring-[var(--gn)] focus:border-[var(--gn)] transition-all placeholder-gray-400 font-sans"
            {...props}
        />
    </div>
);

const SelectField = ({ label, required = false, options, ...props }: any) => (
    <div className="mb-5">
        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
            {label} {required && <span className="text-[var(--gn)]">*</span>}
        </label>
        <select
            className="w-full bg-[#F3F0E9] border border-[#E5E0DA] rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 focus:ring-[var(--gn)] focus:border-[var(--gn)] transition-all appearance-none font-sans"
            {...props}
        >
            <option value="" disabled hidden>Select...</option>
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const RadioCard = ({ icon, title, subtitle, selected, onClick, inline = false }: any) => (
    <div
        onClick={onClick}
        className={cn(
            "border rounded-xl cursor-pointer transition-all flex h-full",
            inline ? "p-3 items-center gap-3" : "p-4 items-start gap-4",
            selected ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]" : "border-gray-200 hover:border-gray-300 bg-white"
        )}
    >
        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", inline ? "" : "mt-0.5", selected ? "border-[var(--gn)]" : "border-gray-300")}>
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--gn)]" />}
        </div>
        {icon && <span className="text-xl">{icon}</span>}
        <div>
            <div className="font-bold text-[0.95rem] text-[var(--tx)]">{title}</div>
            {subtitle && <div className="text-[0.75rem] text-gray-500 mt-1 leading-relaxed font-sans">{subtitle}</div>}
        </div>
    </div>
);

const CheckboxCard = ({ icon, title, subtitle, selected, onClick }: any) => (
    <div
        onClick={onClick}
        className={cn(
            "border rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-all mb-3",
            selected ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]" : "border-gray-200 hover:border-gray-300 bg-white"
        )}
    >
        <div className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5", selected ? "bg-[var(--gn)] border-[var(--gn)]" : "border-gray-300")}>
            {selected && <Check size={14} className="text-white" />}
        </div>
        {icon && <span className="text-xl">{icon}</span>}
        <div>
            <div className="font-bold text-[0.95rem] text-[var(--tx)]">{title}</div>
            {subtitle && <div className="text-[0.75rem] text-gray-500 mt-1 leading-relaxed font-sans">{subtitle}</div>}
        </div>
    </div>
);

export function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "Priya",
        lastName: "Mehta",
        email: "priya@startup.com",
        phone: "+91 98765 43210",
        country: "",
        role: "",
        linkedin: "https://linkedin.com/in/yourname",
        domain: "",

        startupName: "PrecisionScan Agri",
        website: "https://yourstartup.com",
        sector: "",
        year: "",
        cofounders: "",
        blockchain: "",

        idea: "",
        edge: "",
        targetMarket: "",
        scored: "",

        stage: "",
        funding: "",
        hearAbout: "",
        needs: [] as string[],

        agreed: false,
    });

    if (!isOpen) return null;

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const submitForm = () => {
        setIsSubmitted(true);
        // Do not onClose immediately, show the submitted state instead
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setCurrentStep(1);
        onClose();
    };

    const update = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleNeedToggle = (need: string) => {
        setFormData(prev => ({
            ...prev,
            needs: prev.needs.includes(need)
                ? prev.needs.filter(n => n !== need)
                : [...prev.needs, need]
        }));
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 sm:py-12">
            <div className="bg-white rounded-[24px] w-full max-w-[750px] flex flex-col overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] max-h-[90vh]">

                {/* Fixed Header */}
                <div className="px-8 sm:px-10 pt-10 pb-4 shrink-0 bg-white relative z-10">
                    <button onClick={handleClose} className="absolute top-6 right-6 w-9 h-9 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors shadow-sm">
                        <X size={18} strokeWidth={2.5} />
                    </button>

                    <h2 className="font-serif font-black tracking-tight text-3xl text-[var(--tx)] mb-2">Apply to Batch 4</h2>
                    <p className="text-gray-500 text-sm font-sans">AgriBioVentures Incubator · Agritech & Biotech · Applications open</p>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-10 mb-2 relative max-w-[90%] mx-auto">
                        <div className="absolute top-[13px] left-0 w-full h-[1.5px] bg-gray-200 -z-10" />
                        {/* Progress Line */}
                        <div
                            className="absolute top-[13px] left-0 h-[1.5px] bg-[var(--gn)] -z-10 transition-all duration-500"
                            style={{ width: `${(Math.min((isSubmitted ? 5 : currentStep) - 1, 4) / 4) * 100}%` }}
                        />

                        {STEPS.map((step, idx) => {
                            const stepNum = idx + 1;
                            const isActive = currentStep === stepNum && !isSubmitted;
                            const isCompleted = currentStep > stepNum || isSubmitted;

                            return (
                                <div key={step} className="flex flex-col items-center justify-center bg-white px-2">
                                    <div className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-bold border-2 transition-all duration-300",
                                        isCompleted ? "bg-[var(--gn)] border-[var(--gn)] text-white" :
                                            isActive ? "bg-[var(--gn)] border-[var(--gn)] text-white" :
                                                "bg-white border-gray-200 text-gray-400"
                                    )}>
                                        {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
                                    </div>
                                    <div className={cn(
                                        "font-sans text-[0.65rem] font-bold mt-2 capitalize tracking-wide",
                                        (isActive || isCompleted) ? "text-[var(--gn)]" : "text-gray-400"
                                    )}>
                                        {step}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-8 sm:px-10 pb-10 pt-4 no-scrollbar relative bg-white">
                    {/* Steps Content */}
                    {!isSubmitted && (
                        <>
                            {currentStep === 1 && (
                                <div className="animate-reveal">
                                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Tell us about yourself</div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        <InputField label="First name" required value={formData.firstName} onChange={(e: any) => update("firstName", e.target.value)} />
                                        <InputField label="Last name" required value={formData.lastName} onChange={(e: any) => update("lastName", e.target.value)} />
                                        <InputField label="Email address" required value={formData.email} onChange={(e: any) => update("email", e.target.value)} />
                                        <InputField label="Phone number" value={formData.phone} onChange={(e: any) => update("phone", e.target.value)} />
                                        <SelectField label="Country" required options={["India", "United States", "UK", "Canada"]} value={formData.country} onChange={(e: any) => update("country", e.target.value)} />
                                        <SelectField label="Your role" required options={["CEO / Founder", "CTO / Co-founder", "Lead Researcher", "Other"]} value={formData.role} onChange={(e: any) => update("role", e.target.value)} />
                                    </div>

                                    <InputField label="LinkedIn profile URL" value={formData.linkedin} onChange={(e: any) => update("linkedin", e.target.value)} />

                                    <div className="mb-2">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">Domain expertise <span className="text-[var(--gn)]">*</span></label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <RadioCard inline icon="🌾" title="Agritech" selected={formData.domain === "Agritech"} onClick={() => update("domain", "Agritech")} />
                                            <RadioCard inline icon="🧬" title="Biotech" selected={formData.domain === "Biotech"} onClick={() => update("domain", "Biotech")} />
                                            <RadioCard inline icon="🔬" title="Both" selected={formData.domain === "Both"} onClick={() => update("domain", "Both")} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="animate-reveal">
                                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">About your startup</div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        <InputField label="Startup / Project name" required value={formData.startupName} onChange={(e: any) => update("startupName", e.target.value)} />
                                        <InputField label="Website (if any)" value={formData.website} onChange={(e: any) => update("website", e.target.value)} />
                                        <SelectField label="Sector" required options={["Precision Agriculture", "Crop Genomics", "Bioinformatics", "Other"]} value={formData.sector} onChange={(e: any) => update("sector", e.target.value)} />
                                        <SelectField label="Year incorporated" options={["Not incorporated yet", "2024", "2023", "2022", "Older"]} value={formData.year} onChange={(e: any) => update("year", e.target.value)} />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">Number of co-founders</label>
                                        <div className="flex flex-wrap gap-3">
                                            {["Solo", "2", "3", "4+"].map(num => (
                                                <RadioCard key={num} inline title={num} selected={formData.cofounders === num} onClick={() => update("cofounders", num)} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">Does your startup have on-chain / blockchain utility potential?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <RadioCard title="Yes" subtitle="DAO funding eligible" selected={formData.blockchain === "Yes"} onClick={() => update("blockchain", "Yes")} />
                                            <RadioCard title="Maybe" subtitle="Exploring" selected={formData.blockchain === "Maybe"} onClick={() => update("blockchain", "Maybe")} />
                                            <RadioCard title="No" subtitle="Standard funding" selected={formData.blockchain === "No"} onClick={() => update("blockchain", "No")} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="animate-reveal">
                                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Your idea & problem</div>

                                    <div className="mb-6">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
                                            Describe your startup idea <span className="text-[var(--gn)]">*</span> <span className="text-gray-400 font-normal ml-1 font-sans">(50–300 words)</span>
                                        </label>
                                        <textarea
                                            className="w-full bg-[#F3F0E9] border border-[#E5E0DA] rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 focus:ring-[var(--gn)] focus:border-[var(--gn)] transition-all min-h-[120px] resize-y placeholder-gray-400 font-sans"
                                            placeholder="What problem do you solve? Who has this problem? What's your technical approach? Why now?"
                                            value={formData.idea}
                                            onChange={(e: any) => update("idea", e.target.value)}
                                        />
                                        <div className="text-[0.65rem] text-gray-400 font-mono mt-2 text-right">{formData.idea.split(/\s+/).filter(Boolean).length} words</div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
                                            What's your unique scientific or technical edge? <span className="text-[var(--gn)]">*</span>
                                        </label>
                                        <textarea
                                            className="w-full bg-[#F3F0E9] border border-[#E5E0DA] rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 focus:ring-[var(--gn)] focus:border-[var(--gn)] transition-all min-h-[100px] resize-y placeholder-gray-400 font-sans"
                                            placeholder="What makes your approach defensible? Patents, proprietary data, scientific method, team expertise..."
                                            value={formData.edge}
                                            onChange={(e: any) => update("edge", e.target.value)}
                                        />
                                    </div>

                                    <InputField label="Target market & geography" placeholder="e.g. Smallholder farmers in India and sub-Saharan Africa" value={formData.targetMarket} onChange={(e: any) => update("targetMarket", e.target.value)} />

                                    <div className="mb-2 mt-4">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">Have you already scored your idea using our Idea Evaluator?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm">
                                            <RadioCard inline title="Yes" selected={formData.scored === "Yes"} onClick={() => update("scored", "Yes")} />
                                            <RadioCard inline title="No" subtitle="Score it first..." selected={formData.scored === "No"} onClick={() => update("scored", "No")} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="animate-reveal">
                                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Current stage & traction</div>

                                    <div className="mb-6">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">Current development stage <span className="text-[var(--gn)]">*</span></label>
                                        <div className="space-y-3">
                                            <RadioCard inline icon="💡" title="Idea stage" subtitle="Concept exists, no prototype or validation yet" selected={formData.stage === "Idea stage"} onClick={() => update("stage", "Idea stage")} />
                                            <RadioCard inline icon="🔬" title="Proof of concept" subtitle="Early lab validation or prototype built" selected={formData.stage === "Proof of concept"} onClick={() => update("stage", "Proof of concept")} />
                                            <RadioCard inline icon="🌱" title="Pilot / field trials" subtitle="Testing with real users or in real conditions" selected={formData.stage === "Pilot / field trials"} onClick={() => update("stage", "Pilot / field trials")} />
                                            <RadioCard inline icon="📊" title="Early revenue" subtitle="First paying customers, pre-Series A" selected={formData.stage === "Early revenue"} onClick={() => update("stage", "Early revenue")} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        <SelectField label="Prior funding raised" options={["None / bootstrapped", "Under $50k", "$50k - $250k", "$250k - $1M", "Over $1M"]} value={formData.funding} onChange={(e: any) => update("funding", e.target.value)} />
                                        <SelectField label="How did you hear about ABVentures?" options={["Google Search", "LinkedIn", "Referral", "Event", "Other"]} value={formData.hearAbout} onChange={(e: any) => update("hearAbout", e.target.value)} />
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">What do you need most from ABVentures? <span className="text-gray-400 font-normal ml-1 font-sans">(select all that apply)</span></label>
                                        <div className="space-y-3">
                                            <CheckboxCard icon="💰" title="Funding" subtitle="Seed capital to accelerate R&D and product development" selected={formData.needs.includes("Funding")} onClick={() => handleNeedToggle("Funding")} />
                                            <CheckboxCard icon="📣" title="AI Marketing & Lead Generation" subtitle="ABventures AI Lab running marketing, lead gen, and CRM" selected={formData.needs.includes("AI Marketing")} onClick={() => handleNeedToggle("AI Marketing")} />
                                            <CheckboxCard icon="🤝" title="Mentorship & Network" subtitle="Access to domain experts, agronomists, and biotech researchers" selected={formData.needs.includes("Mentorship")} onClick={() => handleNeedToggle("Mentorship")} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 5 && (
                                <div className="animate-reveal">
                                    <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">Review & Submit</div>

                                    <div className="bg-[#EFEBE4]/50 border border-[#E5E0DA] rounded-xl p-6 mb-6">
                                        <div className="space-y-3 text-sm font-sans">
                                            <div><strong className="text-[var(--tx)] font-bold">Founder:</strong> {formData.firstName} {formData.lastName || "dayanand"}</div>
                                            <div><strong className="text-[var(--tx)] font-bold">Email:</strong> {formData.email || "priya@gmail.com"}</div>
                                            <div><strong className="text-[var(--tx)] font-bold">Country:</strong> {formData.country || "India"} <span className="mx-2 text-gray-400">·</span> <strong className="text-[var(--tx)] font-bold">Domain:</strong> {formData.domain || "biotech"}</div>
                                            <div><strong className="text-[var(--tx)] font-bold">Startup:</strong> {formData.startupName || "sssss"}</div>
                                            <div><strong className="text-[var(--tx)] font-bold">Sector:</strong> {formData.sector || "Precision Agriculture"}</div>
                                            <div><strong className="text-[var(--tx)] font-bold">Stage:</strong> {formData.stage || "idea"} <span className="mx-2 text-gray-400">·</span> <strong className="text-[var(--tx)] font-bold">Funding raised:</strong> {formData.funding || "None / bootstrapped"}</div>

                                            <div className="mt-4 pt-4 border-t border-[#E5E0DA] text-gray-600 line-clamp-2">
                                                <strong className="text-[var(--tx)] font-bold">Idea summary:</strong> {formData.idea || "ssssss s s s s s s s s s s s sssssss s s s s s s s s s..."}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => update("agreed", !formData.agreed)}
                                        className={cn(
                                            "border rounded-xl p-5 flex items-start gap-4 cursor-pointer transition-all mb-6",
                                            formData.agreed ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]" : "border-gray-200 hover:border-gray-300 bg-white"
                                        )}
                                    >
                                        <div className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5", formData.agreed ? "bg-[var(--gn)] border-[var(--gn)]" : "border-gray-300")}>
                                            {formData.agreed && <Check size={14} className="text-white" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[0.95rem] text-[var(--tx)]">I confirm this information is accurate and I agree to ABVentures reviewing my application</div>
                                            <div className="text-[0.75rem] text-gray-500 mt-1 font-sans">Your data will be used only for the application review process</div>
                                        </div>
                                    </div>

                                    <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 text-[0.85rem] text-green-800 font-sans shadow-sm">
                                        <strong className="font-bold">What happens next?</strong> Our team reviews every application within 5 business days. Shortlisted founders are invited for a 30-minute call. Batch 4 closes when all 8 spots are filled.
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Submit Success UI */}
                    {isSubmitted && (
                        <div className="animate-reveal flex flex-col items-center justify-center pt-8 pb-10 px-4 text-center">
                            <div className="text-6xl mb-6 select-none animate-bounce" style={{ animationDuration: '2s' }}>🎉</div>
                            <h2 className="font-serif font-black tracking-tight text-3xl mb-4 text-[var(--tx)]">
                                Application submitted!
                            </h2>
                            <p className="text-[0.95rem] text-gray-600 font-sans max-w-md mx-auto leading-relaxed mb-8">
                                Thank you, <strong className="font-bold text-[var(--tx)]">{formData.firstName || "Founder"}</strong>. We've received your Batch 4 application for <strong className="font-bold text-[var(--tx)]">{formData.startupName || "your startup"}</strong>. Our team will review it within 5 business days and reach out to shortlisted founders.
                            </p>

                            <div className="flex flex-wrap justify-center gap-3 mb-10">
                                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-green-200 bg-green-50 text-green-700 text-[0.65rem] font-bold uppercase tracking-widest font-mono">
                                    <span className="text-green-500 mr-0.5">✓</span> APPLICATION RECEIVED
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 bg-[#EFEBE4] text-gray-600 text-[0.65rem] font-bold uppercase tracking-widest font-mono">
                                    REVIEW: 5 BUSINESS DAYS
                                </div>
                            </div>

                            <button
                                onClick={handleClose}
                                className="px-8 py-2.5 rounded-xl bg-[var(--gn)] text-white font-bold text-[0.9rem] hover:bg-[var(--g2)] shadow-md shadow-[var(--gn)]/20 transition-all hover:scale-[1.02] flex items-center gap-1.5"
                            >
                                Close <X size={16} strokeWidth={3} className="ml-1" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Fixed Footer */}
                {!isSubmitted && (
                    <div className="bg-[#EFEBE4] border-t border-[#D9D5CD] px-8 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4">
                        <div className="text-[0.8rem] text-gray-500 font-medium font-sans w-full sm:w-auto text-center sm:text-left">
                            Step {currentStep} of 5
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                            {currentStep > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-2.5 rounded-xl bg-white border border-gray-300 text-[var(--tx)] font-bold text-[0.9rem] hover:bg-gray-50 transition-colors shadow-sm font-sans flex-1 sm:flex-none"
                                >
                                    ← Back
                                </button>
                            )}
                            {currentStep < 5 ? (
                                <button
                                    onClick={nextStep}
                                    className="px-6 py-2.5 rounded-xl bg-[var(--gn)] text-white font-bold text-[0.9rem] hover:bg-[var(--g2)] shadow-md shadow-[var(--gn)]/20 transition-all hover:scale-[1.02] font-sans flex-1 sm:flex-none"
                                >
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    onClick={submitForm}
                                    disabled={!formData.agreed}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl font-bold text-[0.9rem] shadow-sm transition-all font-sans flex-1 sm:flex-none",
                                        formData.agreed ? "bg-[var(--gn)] text-white hover:bg-[var(--g2)] shadow-[var(--gn)]/20 hover:scale-[1.02]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    )}
                                >
                                    Submit Application →
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
