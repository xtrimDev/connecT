import mongoose, { Schema, Types } from "mongoose";

const OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        description : {
            type: String,
            trim: true
        },

        website : {
            type: String,
            trim: true,
            required: true
        },

        ownerId : {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        workspaces: [
            {
                type: Schema.Types.ObjectId,
                ref: "Workspace"
            }
        ]
    },
    {
        timestamps: true
    }
);

const OrganizationModel = mongoose.model(
    "Organization",
    OrganizationSchema
);

export default OrganizationModel;