import { useEffect, useState } from "react";
import { parseName } from "../users/helpers";

export default function UserForm({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = parseName(user.name);
      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        department: user.company?.name || "",
      });
    } else {
      setFormData({ firstName: "", lastName: "", email: "", department: "" });
    }
    setErrors({});
  }, [user, isOpen]);

  function validateForm() {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      company: { name: formData.department },
    };
    onSubmit(userData);
  }

  function handleInputChange(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/40">
      <div className="w-[520px] max-w-[calc(100%-24px)] overflow-hidden rounded-xl bg-white">
        <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
          <h2 className="m-0 text-lg font-semibold">
            {user ? "Edit User" : "Add New User"}
          </h2>
          <button
            className="rounded p-1 text-xl leading-none hover:bg-neutral-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-4 py-4">
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-neutral-700">First Name *</label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-neutral-100"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={isLoading}
              />
              {errors.firstName && (
                <div className="mt-1 text-xs text-red-700">{errors.firstName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-neutral-700">Last Name *</label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-neutral-100"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={isLoading}
              />
              {errors.lastName && (
                <div className="mt-1 text-xs text-red-700">{errors.lastName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-neutral-700">Email *</label>
              <input
                type="email"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-neutral-100"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isLoading}
              />
              {errors.email && (
                <div className="mt-1 text-xs text-red-700">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-neutral-700">Department *</label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-neutral-100"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                disabled={isLoading}
              />
              {errors.department && (
                <div className="mt-1 text-xs text-red-700">{errors.department}</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 bg-neutral-50 px-4 py-3">
            <button
              type="button"
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm hover:bg-neutral-300 disabled:opacity-50"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : user ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
