import React, { useEffect, useState } from "react";
import { Button, Input, Avatar } from "@heroui/react";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { Eye, EyeOff, Save, User } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { UsersInterface } from "~/components/interface";
import { errorToast, successToast } from "~/components/toast";
import AdminLayout from "~/Layout/AttendantLayout";
import { requireAuthenticatedUser } from "~/utils/roleCheck";
import bcrypt from 'bcryptjs';
import UserModel from "~/model/users";

export default function SettingsPage() {
    const { user } = useLoaderData<{ user: UsersInterface }>();
    const actionData = useActionData<any>();
    const navigation = useNavigation();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    return (
        <AdminLayout user={user}>
            <Toaster position="top-right" />
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <User className="h-6 w-6" />
                            Settings
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
                    </div>

                    <div className="p-6">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Profile Information */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    Profile Information
                                </h2>
                                
                                <div className="flex items-center space-x-4">
                                    <Avatar
                                        src={user.image || undefined}
                                        name={user.fullName}
                                        size="lg"
                                        className="w-16 h-16"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{user.fullName}</h3>
                                        <p className="text-gray-600">{user.position}</p>
                                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <Input
                                            value={user.fullName}
                                            isReadOnly
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "bg-gray-50"
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            value={user.email}
                                            isReadOnly
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "bg-gray-50"
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <Input
                                            value={user.phone}
                                            isReadOnly
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "bg-gray-50"
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Position
                                        </label>
                                        <Input
                                            value={user.position}
                                            isReadOnly
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "bg-gray-50"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    Change Password
                                </h2>

                                <Form method="post" className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showCurrentPassword ? "text" : "password"}
                                                name="currentPassword"
                                                placeholder="Enter current password"
                                                variant="bordered"
                                                isRequired
                                                endContent={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        className="focus:outline-none"
                                                    >
                                                        {showCurrentPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                placeholder="Enter new password"
                                                variant="bordered"
                                                isRequired
                                                endContent={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="focus:outline-none"
                                                    >
                                                        {showNewPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="Confirm new password"
                                                variant="bordered"
                                                isRequired
                                                endContent={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="focus:outline-none"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            className="bg-pink-500 hover:bg-pink-600"
                                            isLoading={navigation.state === "submitting"}
                                            startContent={<Save className="h-4 w-4" />}
                                        >
                                            {navigation.state === "submitting" ? "Updating..." : "Update Password"}
                                        </Button>
                                    </div>

                                    <input type="hidden" name="intent" value="changePassword" />
                                </Form>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-yellow-800 mb-2">
                                        Password Requirements:
                                    </h3>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• At least 8 characters long</li>
                                        <li>• Contains at least one uppercase letter</li>
                                        <li>• Contains at least one lowercase letter</li>
                                        <li>• Contains at least one number</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireAuthenticatedUser(request);
    return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    if (intent === "changePassword") {
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return json({ success: false, message: "All password fields are required" });
        }

        if (newPassword !== confirmPassword) {
            return json({ success: false, message: "New passwords do not match" });
        }

        if (newPassword.length < 8) {
            return json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Password complexity check
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /\d/.test(newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            return json({ 
                success: false, 
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
            });
        }

        try {
            const user = await requireAuthenticatedUser(request);
            
            // Verify current password
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return json({ success: false, message: "Current password is incorrect" });
            }

            // Hash new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update password in database
            await UserModel.findByIdAndUpdate(user._id, { 
                password: hashedNewPassword 
            });

            return json({ success: true, message: "Password updated successfully!" });

        } catch (error) {
            console.error("Error updating password:", error);
            return json({ success: false, message: "Failed to update password. Please try again." });
        }
    }

    return json({ success: false, message: "Invalid action" });
}; 