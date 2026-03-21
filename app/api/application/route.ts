import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/models/application";

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

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = formSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const data = parsed.data;

        await connectToDatabase();

        console.log("HELELELo")
        // Optional duplicate protection
        const existing = await Application.findOne({
            email: data.email.toLowerCase(),
            startupName: data.startupName,
        });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An application with this email and startup name already exists",
                },
                { status: 409 }
            );
        }

        const created = await Application.create({
            ...data,
            email: data.email.toLowerCase(),
            status: "submitted",
            source: "website",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Application submitted successfully",
                id: created._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Application submit error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while saving the application",
            },
            { status: 500 }
        );
    }
}