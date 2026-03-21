import mongoose, { Schema, models, model } from "mongoose";

const ApplicationSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true, index: true },
        phone: { type: String, default: "" },
        country: { type: String, required: true },
        role: { type: String, required: true },
        linkedin: { type: String, default: "" },
        domain: { type: String, required: true },

        startupName: { type: String, required: true, trim: true },
        website: { type: String, default: "" },
        sector: { type: String, required: true },
        year: { type: String, default: "" },
        cofounders: { type: String, default: "" },
        blockchain: { type: String, default: "" },

        idea: { type: String, required: true },
        edge: { type: String, required: true },
        targetMarket: { type: String, default: "" },
        scored: { type: String, default: "" },

        stage: { type: String, required: true },
        funding: { type: String, default: "" },
        hearAbout: { type: String, default: "" },
        needs: { type: [String], default: [] },

        agreed: { type: Boolean, required: true },

        status: {
            type: String,
            enum: ["submitted", "under_review", "shortlisted", "rejected", "accepted"],
            default: "submitted",
            index: true,
        },

        source: {
            type: String,
            default: "website",
        },
    },
    {
        timestamps: true,
    }
);

ApplicationSchema.index({ createdAt: -1 });
ApplicationSchema.index({ email: 1, startupName: 1 });

const Application =
    models.Application || model("Application", ApplicationSchema);

export default Application;