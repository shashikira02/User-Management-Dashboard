import { useCallback, useEffect, useMemo, useState } from "react";
import { filterUsers, sortUsers } from "../components/users/helpers";
import {
  fetchUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/usersApi";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUsersApi();
      setUsers(data);
    } catch (e) {
      setError("Failed to load users. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const processedUsers = useMemo(() => {
    const filtered = filterUsers(users, searchQuery, filters);
    return sortUsers(filtered, sortConfig);
  }, [users, searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(processedUsers.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, processedUsers.length);
  const paginatedUsers = useMemo(
    () => processedUsers.slice(startIndex, endIndex),
    [processedUsers, startIndex, endIndex]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortConfig, pageSize]);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      const nextDir =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction: nextDir };
    });
  }, []);

  const renderSortIndicator = useCallback(
    (key) => {
      if (sortConfig.key !== key)
        return <span className="ml-1 opacity-60">↕</span>;
      return (
        <span className="ml-1 font-semibold text-neutral-800">
          {sortConfig.direction === "asc" ? "↑" : "↓"}
        </span>
      );
    },
    [sortConfig]
  );

  const handleAddUser = useCallback(
    async (userData) => {
      setFormLoading(true);
      try {
        await addUserApi(userData);
        const localId =
          (users.length ? Math.max(...users.map((u) => u.id)) : 0) + 1;
        setUsers((prev) => [{ ...userData, id: localId }, ...prev]);
        setShowUserForm(false);
        setSelectedUser(null);
      } catch (e) {
        setError("Failed to add user. Please try again.");
        console.error(e);
      } finally {
        setFormLoading(false);
      }
    },
    [users]
  );

  const handleEditUser = useCallback(
    async (userData) => {
      if (!selectedUser) return;
      setFormLoading(true);
      try {
        await updateUserApi(selectedUser.id, userData);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...u, ...userData } : u
          )
        );
        setShowUserForm(false);
        setSelectedUser(null);
      } catch (e) {
        setError("Failed to update user. Please try again.");
        console.error(e);
      } finally {
        setFormLoading(false);
      }
    },
    [selectedUser]
  );

  const handleDeleteUser = useCallback(async () => {
    if (!selectedUser) return;
    setFormLoading(true);
    try {
      await deleteUserApi(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    } catch (e) {
      setError("Failed to delete user. Please try again.");
      console.error(e);
    } finally {
      setFormLoading(false);
    }
  }, [selectedUser]);

  return {
    // Data
    users,
    processedUsers,
    paginatedUsers,
    totalPages,
    startIndex,
    endIndex,
    // Loading & Error
    loading,
    formLoading,
    error,
    // Search, Filter and Sort
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    handleSort,
    renderSortIndicator,

    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,

    // Selection
    selectedUser,
    setSelectedUser,
    showUserForm,
    setShowUserForm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showFilterPanel,
    setShowFilterPanel,

    // Actions
    fetchUsers,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
}
