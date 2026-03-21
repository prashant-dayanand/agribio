"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const STEPS = ["Founder", "Startup", "Idea", "Stage", "Submit"];

// --------------------
// ZOD SCHEMA
// --------------------
const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    role: z.string().min(1, "Role is required"),
    linkedin: z.union([z.literal(""), z.string().url("Enter a valid LinkedIn URL")]),
    domain: z.string().min(1, "Domain expertise is required"),

    startupName: z.string().min(1, "Startup / Project name is required"),
    website: z.union([z.literal(""), z.string().url("Enter a valid website URL")]),
    sector: z.string().min(1, "Sector is required"),
    year: z.string().optional(),
    cofounders: z.string().optional(),
    blockchain: z.string().optional(),

    idea: z
        .string()
        .min(50, "Idea must be at least 50 characters")
        .max(3000, "Idea is too long"),
    edge: z.string().min(1, "Technical edge is required"),
    targetMarket: z.string().optional(),
    scored: z.string().optional(),

    stage: z.string().min(1, "Current development stage is required"),
    funding: z.string().optional(),
    hearAbout: z.string().optional(),
    needs: z.array(z.string()).default([]),

    agreed: z.literal(true, {
        error: "You must agree before submitting",
    }),
});

type FormValues = z.infer<typeof formSchema>;

// --------------------
// REUSABLE FIELDS
// --------------------
const InputField = ({ label, required = false, error, ...props }: any) => (
    <div className="mb-5">
        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
            {label} {required && <span className="text-[var(--gn)]">*</span>}
        </label>
        <input
            className={cn(
                "w-full border rounded-xl px-4 py-2 text-[0.95rem] focus:outline-none focus:ring-1 transition-all placeholder-gray-400 font-sans",
                error
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#E5E0DA] focus:ring-[var(--gn)] focus:border-[var(--gn)]"
            )}
            {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const SelectField = ({
    label,
    required = false,
    options,
    error,
    ...props
}: any) => (
    <div className="mb-5">
        <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
            {label} {required && <span className="text-[var(--gn)]">*</span>}
        </label>
        <select
            className={cn(
                "w-full border rounded-xl px-4 py-2 text-[0.95rem] focus:outline-none focus:ring-1 transition-all appearance-none font-sans",
                error
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#E5E0DA] focus:ring-[var(--gn)] focus:border-[var(--gn)]"
            )}
            {...props}
        >
            <option value="" disabled hidden>
                Select...
            </option>
            {options.map((opt: string) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const RadioCard = ({
    icon,
    title,
    subtitle,
    selected,
    onClick,
    inline = false,
}: any) => (
    <div
        onClick={onClick}
        className={cn(
            "border rounded-xl cursor-pointer transition-all flex h-full",
            inline ? "p-3 items-center gap-3" : "p-2 items-start gap-2",
            selected
                ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]"
                : "border-gray-200 hover:border-gray-300 bg-white"
        )}
    >
        <div
            className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                inline ? "" : "mt-0.5",
                selected ? "border-[var(--gn)]" : "border-gray-300"
            )}
        >
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--gn)]" />}
        </div>
        {icon && <span className="text-xl">{icon}</span>}
        <div>
            <div className="font-bold text-sm text-[var(--tx)]">{title}</div>
            {subtitle && (
                <div className="text-xs text-gray-500 leading-relaxed font-sans">
                    {subtitle}
                </div>
            )}
        </div>
    </div>
);

const CheckboxCard = ({ icon, title, subtitle, selected, onClick }: any) => (
    <div
        onClick={onClick}
        className={cn(
            "border rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-all mb-3",
            selected
                ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]"
                : "border-gray-200 hover:border-gray-300 bg-white"
        )}
    >
        <div
            className={cn(
                "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                selected ? "bg-[var(--gn)] border-[var(--gn)]" : "border-gray-300"
            )}
        >
            {selected && <Check size={14} className="text-white" />}
        </div>
        {icon && <span className="text-xl">{icon}</span>}
        <div>
            <div className="font-bold text-[0.95rem] text-[var(--tx)]">{title}</div>
            {subtitle && (
                <div className="text-[0.75rem] text-gray-500 mt-1 leading-relaxed font-sans">
                    {subtitle}
                </div>
            )}
        </div>
    </div>
);

export default function ApplyPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            role: "",
            linkedin: "",
            domain: "",

            startupName: "",
            website: "",
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
            needs: [],

            agreed: false,
        },
    });

    const values = watch();

    const stepFields: Record<number, (keyof FormValues)[]> = {
        1: ["firstName", "lastName", "email", "country", "role", "domain"],
        2: ["startupName", "sector"],
        3: ["idea", "edge"],
        4: ["stage"],
        5: ["agreed"],
    };

    const nextStep = async () => {
        const isValid = await trigger(stepFields[currentStep]);
        if (!isValid) return;
        setCurrentStep((prev) => Math.min(prev + 1, 5));
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSaving(true);
            setSubmitError("");

            const res = await fetch("/api/application", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to submit application");
            }

            console.log("FORM SUBMITTED DATA:", data);
            console.log("Saved application id:", result.id);

            setIsSubmitted(true);
        } catch (error: any) {
            console.error("Submit error:", error);
            setSubmitError(error.message || "Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setSubmitError("");
        reset();
    };

    const handleNeedToggle = (need: string) => {
        const currentNeeds = values.needs || [];
        const updatedNeeds = currentNeeds.includes(need)
            ? currentNeeds.filter((n) => n !== need)
            : [...currentNeeds, need];

        setValue("needs", updatedNeeds, { shouldValidate: true });
    };

    return (
        <main className="min-h-screen bg-[#F8F6F1] py-10 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-[24px] w-full flex flex-col overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] min-h-[80vh]"
                >
                    {/* Header */}
                    <div className="px-8 sm:px-10 pt-10 pb-4 shrink-0 bg-white relative z-10 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-black text-2xl text-[var(--tx)] mb-2">
                                    Apply to Batch 4
                                </h2>
                                <p className="text-gray-500 text-xs font-sans">
                                    AgriBioVentures Incubator · Agritech & Biotech · Applications open
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-semibold"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center justify-between mt-6 mb-2 relative max-w-full mx-auto">
                            <div className="absolute top-[13px] left-0 w-full h-[1.5px] bg-gray-200 -z-10" />

                            <div
                                className="absolute top-[13px] left-0 h-[1.5px] bg-[var(--gn)] -z-10 transition-all duration-500"
                                style={{
                                    width: `${(Math.min((isSubmitted ? 5 : currentStep) - 1, 4) / 4) * 100}%`,
                                }}
                            />

                            {STEPS.map((step, idx) => {
                                const stepNum = idx + 1;
                                const isActive = currentStep === stepNum && !isSubmitted;
                                const isCompleted = currentStep > stepNum || isSubmitted;

                                return (
                                    <div
                                        key={step}
                                        className="flex flex-col items-center justify-center bg-white px-2"
                                    >
                                        <div
                                            className={cn(
                                                "w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-bold border-2 transition-all duration-300",
                                                isCompleted
                                                    ? "bg-[var(--gn)] border-[var(--gn)] text-white"
                                                    : isActive
                                                        ? "bg-[var(--gn)] border-[var(--gn)] text-white"
                                                        : "bg-white border-gray-200 text-gray-400"
                                            )}
                                        >
                                            {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
                                        </div>
                                        <div
                                            className={cn(
                                                "font-sans text-[0.65rem] font-bold mt-2 capitalize tracking-wide",
                                                isActive || isCompleted ? "text-[var(--gn)]" : "text-gray-400"
                                            )}
                                        >
                                            {step}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto px-8 sm:px-10 pb-10 pt-4 no-scrollbar relative bg-white">
                        {!isSubmitted && (
                            <>
                                {/* STEP 1 */}
                                {currentStep === 1 && (
                                    <div className="animate-reveal">
                                        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                            Tell us about yourself
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                            <InputField
                                                label="First name"
                                                required
                                                {...register("firstName")}
                                                error={errors.firstName?.message}
                                            />

                                            <InputField
                                                label="Last name"
                                                required
                                                {...register("lastName")}
                                                error={errors.lastName?.message}
                                            />

                                            <InputField
                                                label="Email address"
                                                required
                                                {...register("email")}
                                                error={errors.email?.message}
                                            />

                                            <InputField
                                                label="Phone number"
                                                {...register("phone")}
                                                error={errors.phone?.message}
                                            />

                                            <SelectField
                                                label="Country"
                                                required
                                                options={[
                                                    "India",
                                                    "United States",
                                                    "UK",
                                                    "Canada",
                                                    "Japan",
                                                    "Germany",
                                                    "New Zealand",
                                                    "Netherlands",
                                                    "Others",
                                                ]}
                                                {...register("country")}
                                                error={errors.country?.message}
                                            />

                                            <SelectField
                                                label="Your role"
                                                required
                                                options={[
                                                    "CEO / Founder",
                                                    "CTO / Co-founder",
                                                    "Lead Researcher",
                                                    "Investor",
                                                    "CEO",
                                                    "Other",
                                                ]}
                                                {...register("role")}
                                                error={errors.role?.message}
                                            />
                                        </div>

                                        <InputField
                                            label="LinkedIn profile URL"
                                            {...register("linkedin")}
                                            error={errors.linkedin?.message}
                                        />

                                        <div className="mb-2">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                Domain expertise <span className="text-[var(--gn)]">*</span>
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <RadioCard
                                                    inline
                                                    icon="🌾"
                                                    title="Agritech"
                                                    selected={values.domain === "Agritech"}
                                                    onClick={() => setValue("domain", "Agritech", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    icon="🧬"
                                                    title="Biotech"
                                                    selected={values.domain === "Biotech"}
                                                    onClick={() => setValue("domain", "Biotech", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    icon="🔬"
                                                    title="Both"
                                                    selected={values.domain === "Both"}
                                                    onClick={() => setValue("domain", "Both", { shouldValidate: true })}
                                                />
                                            </div>
                                            {errors.domain && (
                                                <p className="text-red-500 text-xs mt-1">{errors.domain.message}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2 */}
                                {currentStep === 2 && (
                                    <div className="animate-reveal">
                                        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                            About your startup
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                            <InputField
                                                label="Startup / Project name"
                                                required
                                                {...register("startupName")}
                                                error={errors.startupName?.message}
                                            />

                                            <InputField
                                                label="Website (if any)"
                                                {...register("website")}
                                                error={errors.website?.message}
                                            />

                                            <SelectField
                                                label="Sector"
                                                required
                                                options={[
                                                    "Precision Agriculture",
                                                    "Crop Genomics",
                                                    "Bioinformatics",
                                                    "Other",
                                                ]}
                                                {...register("sector")}
                                                error={errors.sector?.message}
                                            />

                                            <SelectField
                                                label="Year incorporated"
                                                options={[
                                                    "Not incorporated yet",
                                                    "2024",
                                                    "2023",
                                                    "2022",
                                                    "Older",
                                                ]}
                                                {...register("year")}
                                                error={errors.year?.message}
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                Number of co-founders
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {["Solo", "2", "3", "4+"].map((num) => (
                                                    <RadioCard
                                                        key={num}
                                                        inline
                                                        title={num}
                                                        selected={values.cofounders === num}
                                                        onClick={() => setValue("cofounders", num, { shouldValidate: true })}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                Does your startup have on-chain / blockchain utility potential?
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <RadioCard
                                                    title="Yes"
                                                    subtitle="DAO funding eligible"
                                                    selected={values.blockchain === "Yes"}
                                                    onClick={() => setValue("blockchain", "Yes", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    title="Maybe"
                                                    subtitle="Exploring"
                                                    selected={values.blockchain === "Maybe"}
                                                    onClick={() => setValue("blockchain", "Maybe", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    title="No"
                                                    subtitle="Standard funding"
                                                    selected={values.blockchain === "No"}
                                                    onClick={() => setValue("blockchain", "No", { shouldValidate: true })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3 */}
                                {currentStep === 3 && (
                                    <div className="animate-reveal">
                                        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                            Your idea & problem
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
                                                Describe your startup idea <span className="text-[var(--gn)]">*</span>{" "}
                                                <span className="text-gray-400 font-normal ml-1 font-sans">(50–300 words)</span>
                                            </label>
                                            <textarea
                                                className={cn(
                                                    "w-full rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 transition-all min-h-[120px] resize-y placeholder-gray-400 font-sans border",
                                                    errors.idea
                                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                        : "border-[#E5E0DA] focus:ring-[var(--gn)] focus:border-[var(--gn)]"
                                                )}
                                                placeholder="What problem do you solve? Who has this problem? What's your technical approach? Why now?"
                                                {...register("idea")}
                                            />
                                            <div className="text-[0.65rem] text-gray-400 font-mono mt-2 text-right">
                                                {values.idea?.split(/\s+/).filter(Boolean).length || 0} words
                                            </div>
                                            {errors.idea && (
                                                <p className="text-red-500 text-xs mt-1">{errors.idea.message}</p>
                                            )}
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-2 tracking-tight">
                                                What's your unique scientific or technical edge? <span className="text-[var(--gn)]">*</span>
                                            </label>
                                            <textarea
                                                className={cn(
                                                    "w-full rounded-xl px-4 py-3 text-[0.95rem] focus:outline-none focus:ring-1 transition-all min-h-[100px] resize-y placeholder-gray-400 font-sans border",
                                                    errors.edge
                                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                        : "border-[#E5E0DA] focus:ring-[var(--gn)] focus:border-[var(--gn)]"
                                                )}
                                                placeholder="What makes your approach defensible? Patents, proprietary data, scientific method, team expertise..."
                                                {...register("edge")}
                                            />
                                            {errors.edge && (
                                                <p className="text-red-500 text-xs mt-1">{errors.edge.message}</p>
                                            )}
                                        </div>

                                        <InputField
                                            label="Target market & geography"
                                            placeholder="e.g. Smallholder farmers in India and sub-Saharan Africa"
                                            {...register("targetMarket")}
                                            error={errors.targetMarket?.message}
                                        />

                                        <div className="mb-2 mt-4">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                Have you already scored your idea using our Idea Evaluator?
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm">
                                                <RadioCard
                                                    inline
                                                    title="Yes"
                                                    selected={values.scored === "Yes"}
                                                    onClick={() => setValue("scored", "Yes", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    title="No"
                                                    subtitle="Score it first..."
                                                    selected={values.scored === "No"}
                                                    onClick={() => setValue("scored", "No", { shouldValidate: true })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4 */}
                                {currentStep === 4 && (
                                    <div className="animate-reveal">
                                        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                            Current stage & traction
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                Current development stage <span className="text-[var(--gn)]">*</span>
                                            </label>
                                            <div className="space-y-3">
                                                <RadioCard
                                                    inline
                                                    icon="💡"
                                                    title="Idea stage"
                                                    subtitle="Concept exists, no prototype or validation yet"
                                                    selected={values.stage === "Idea stage"}
                                                    onClick={() => setValue("stage", "Idea stage", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    icon="🔬"
                                                    title="Proof of concept"
                                                    subtitle="Early lab validation or prototype built"
                                                    selected={values.stage === "Proof of concept"}
                                                    onClick={() => setValue("stage", "Proof of concept", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    icon="🌱"
                                                    title="Pilot / field trials"
                                                    subtitle="Testing with real users or in real conditions"
                                                    selected={values.stage === "Pilot / field trials"}
                                                    onClick={() => setValue("stage", "Pilot / field trials", { shouldValidate: true })}
                                                />
                                                <RadioCard
                                                    inline
                                                    icon="📊"
                                                    title="Early revenue"
                                                    subtitle="First paying customers, pre-Series A"
                                                    selected={values.stage === "Early revenue"}
                                                    onClick={() => setValue("stage", "Early revenue", { shouldValidate: true })}
                                                />
                                            </div>
                                            {errors.stage && (
                                                <p className="text-red-500 text-xs mt-1">{errors.stage.message}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                            <SelectField
                                                label="Prior funding raised"
                                                options={[
                                                    "None / bootstrapped",
                                                    "Under $50k",
                                                    "$50k - $250k",
                                                    "$250k - $1M",
                                                    "Over $1M",
                                                ]}
                                                {...register("funding")}
                                                error={errors.funding?.message}
                                            />

                                            <SelectField
                                                label="How did you hear about ABVentures?"
                                                options={[
                                                    "Google Search",
                                                    "LinkedIn",
                                                    "Referral",
                                                    "Event",
                                                    "Other",
                                                ]}
                                                {...register("hearAbout")}
                                                error={errors.hearAbout?.message}
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label className="block text-[0.85rem] font-bold text-[var(--tx)] mb-3 tracking-tight">
                                                What do you need most from ABVentures?{" "}
                                                <span className="text-gray-400 font-normal ml-1 font-sans">
                                                    (select all that apply)
                                                </span>
                                            </label>
                                            <div className="space-y-3">
                                                <CheckboxCard
                                                    icon="💰"
                                                    title="Funding"
                                                    subtitle="Seed capital to accelerate R&D and product development"
                                                    selected={values.needs.includes("Funding")}
                                                    onClick={() => handleNeedToggle("Funding")}
                                                />
                                                <CheckboxCard
                                                    icon="📣"
                                                    title="AI Marketing & Lead Generation"
                                                    subtitle="ABventures AI Lab running marketing, lead gen, and CRM"
                                                    selected={values.needs.includes("AI Marketing")}
                                                    onClick={() => handleNeedToggle("AI Marketing")}
                                                />
                                                <CheckboxCard
                                                    icon="🤝"
                                                    title="Mentorship & Network"
                                                    subtitle="Access to domain experts, agronomists, and biotech researchers"
                                                    selected={values.needs.includes("Mentorship")}
                                                    onClick={() => handleNeedToggle("Mentorship")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5 */}
                                {currentStep === 5 && (
                                    <div className="animate-reveal">
                                        <div className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                            Review & Submit
                                        </div>

                                        <div className="border border-[#E5E0DA] rounded-xl p-6 mb-6">
                                            <div className="space-y-3 text-sm font-sans">
                                                <div><strong className="text-[var(--tx)] font-bold">Founder:</strong> {values.firstName} {values.lastName}</div>
                                                <div><strong className="text-[var(--tx)] font-bold">Email:</strong> {values.email}</div>
                                                <div>
                                                    <strong className="text-[var(--tx)] font-bold">Country:</strong> {values.country || "—"}{" "}
                                                    <span className="mx-2 text-gray-400">·</span>{" "}
                                                    <strong className="text-[var(--tx)] font-bold">Domain:</strong> {values.domain || "—"}
                                                </div>
                                                <div><strong className="text-[var(--tx)] font-bold">Startup:</strong> {values.startupName || "—"}</div>
                                                <div><strong className="text-[var(--tx)] font-bold">Sector:</strong> {values.sector || "—"}</div>
                                                <div>
                                                    <strong className="text-[var(--tx)] font-bold">Stage:</strong> {values.stage || "—"}{" "}
                                                    <span className="mx-2 text-gray-400">·</span>{" "}
                                                    <strong className="text-[var(--tx)] font-bold">Funding raised:</strong> {values.funding || "None / bootstrapped"}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-[#E5E0DA] text-gray-600 line-clamp-2">
                                                    <strong className="text-[var(--tx)] font-bold">Idea summary:</strong> {values.idea || "—"}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => setValue("agreed", !values.agreed, { shouldValidate: true })}
                                            className={cn(
                                                "border rounded-xl p-5 flex items-start gap-4 cursor-pointer transition-all mb-2",
                                                values.agreed
                                                    ? "border-[var(--gn)] bg-[var(--gn)]/5 ring-1 ring-[var(--gn)]"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                                                    values.agreed ? "bg-[var(--gn)] border-[var(--gn)]" : "border-gray-300"
                                                )}
                                            >
                                                {values.agreed && <Check size={14} className="text-white" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-[0.95rem] text-[var(--tx)]">
                                                    I confirm this information is accurate and I agree to ABVentures reviewing my application
                                                </div>
                                                <div className="text-[0.75rem] text-gray-500 mt-1 font-sans">
                                                    Your data will be used only for the application review process
                                                </div>
                                            </div>
                                        </div>

                                        {errors.agreed && (
                                            <p className="text-red-500 text-xs mt-1 mb-4">{errors.agreed.message}</p>
                                        )}

                                        {submitError && (
                                            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                                {submitError}
                                            </div>
                                        )}

                                        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 text-[0.85rem] text-green-800 font-sans shadow-sm">
                                            <strong className="font-bold">What happens next?</strong> Our team reviews every application within 5 business days.
                                            Shortlisted founders are invited for a 30-minute call. Batch 4 closes when all 8 spots are filled.
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Success UI */}
                        {isSubmitted && (
                            <div className="animate-reveal flex flex-col items-center justify-center pt-8 pb-10 px-4 text-center min-h-[50vh]">
                                <div className="text-6xl mb-6 select-none animate-bounce" style={{ animationDuration: "2s" }}>
                                    🎉
                                </div>
                                <h2 className="font-serif font-black tracking-tight text-3xl mb-4 text-[var(--tx)]">
                                    Application submitted!
                                </h2>
                                <p className="text-[0.95rem] text-gray-600 font-sans max-w-md mx-auto leading-relaxed mb-8">
                                    Thank you, <strong className="font-bold text-[var(--tx)]">{values.firstName || "Founder"}</strong>. We&apos;ve received your Batch 4 application for{" "}
                                    <strong className="font-bold text-[var(--tx)]">{values.startupName || "your startup"}</strong>.
                                    Our team will review it within 5 business days and reach out to shortlisted founders.
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
                                    type="button"
                                    onClick={handleReset}
                                    className="px-8 py-2.5 rounded-xl bg-[var(--gn)] text-white font-bold text-[0.9rem] hover:bg-[var(--g2)] shadow-md shadow-[var(--gn)]/20 transition-all hover:scale-[1.02]"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!isSubmitted && (
                        <div className="px-8 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 border-t border-gray-100">
                            <div className="text-[0.8rem] text-gray-500 font-medium font-sans w-full sm:w-auto text-center sm:text-left">
                                Step {currentStep} of 5
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 rounded-xl bg-white border border-gray-300 text-[var(--tx)] font-bold text-[0.9rem] hover:bg-gray-50 transition-colors shadow-sm font-sans flex-1 sm:flex-none"
                                    >
                                        ← Back
                                    </button>
                                )}

                                {currentStep < 5 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-6 py-2.5 rounded-xl bg-[var(--gn)] text-white font-bold text-[0.9rem] shadow-md shadow-[var(--gn)]/20 transition-all hover:scale-[1.02] font-sans flex-1 sm:flex-none"
                                    >
                                        Continue →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className={cn(
                                            "px-6 py-2.5 rounded-xl font-bold text-[0.9rem] shadow-sm transition-all font-sans flex-1 sm:flex-none",
                                            isSaving
                                                ? "bg-gray-400 text-white cursor-not-allowed"
                                                : "bg-[var(--gn)] text-white shadow-[var(--gn)]/20 hover:scale-[1.02]"
                                        )}
                                    >
                                        {isSaving ? "Submitting..." : "Submit Application →"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}