import OrganizationModel from "../Models/OrganizationModel";
import Organization from "./Organization"

class OrganizationService {
    static async addOrganization(organization : Organization) {
        try {
            await OrganizationModel.create({
                name: organization.getName(),
                description: organization.getDescription(),
                website: organization.getWebsite(),
                ownerId: organization.getOwnerId(),
                employees: [],
                workspaces: []            
            });
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async removeOrganization(organization : Organization) {
        try {
            if (organization.getId()) {
                await OrganizationModel.deleteOne({
                    id: organization.getId()
                });
            } else if (organization.getName()) {
                await OrganizationModel.deleteOne({
                    email: organization.getName()
                });
            } else {
                throw new Error("Can't delete user because of insufficient details.");
            }
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async updateOrganization(organization: Organization) {
        try {
            if (!organization.getId()) {
                throw new Error("Can't update Organization because _id is required.");
            }

            const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
                organization.getId(),
                {
                    description: organization.getDescription(),
                    website: organization.getWebsite()
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedOrganization) {
                throw new Error("User not found.");
            }
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async getById(id: string): Promise<Organization> {
        try {
            if (!id) {
                throw new Error("Organization _id is required.");
            }

            const organizationDocument = await OrganizationModel
                .findById(id);

            if (!organizationDocument) {
                throw new Error("Organization not found.");
            }

            return Organization.fromDocument(organizationDocument);

        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async getByName(email: string): Promise<Organization> {
        try {
            if (!email) {
                throw new Error("User email is required.");
            }

            const organizationDocument = await OrganizationModel
                .findOne({ email })
                .select("+password");

            if (!organizationDocument) {
                throw new Error("Organization not found.");
            }

            return Organization.fromDocument(organizationDocument);

        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }
}

export default OrganizationService