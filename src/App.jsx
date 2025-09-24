import HeaderControls from "./components/header/HeaderControls";
import LoadingSpinner from "./components/feedback/LoadingSpinner";
import ErrorMessage from "./components/feedback/ErrorMessage";
import EmptyState from "./components/feedback/EmptyState";
import Pagination from "./components/pagination/Pagination";
import FilterPanel from "./components/filters/FilterPanel";
import UserForm from "./components/modals/UserForm";
import DeleteConfirmation from "./components/modals/DeleteConfirmation";
import UsersTable from "./components/users/UsersTable";
import useUsers from "./hooks/useUsers";

export default function App() {
  const {
    processedUsers,
    paginatedUsers,
    totalPages,
    startIndex,
    endIndex,
    loading,
    formLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleSort,
    renderSortIndicator,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    selectedUser,
    setSelectedUser,
    showUserForm,
    setShowUserForm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showFilterPanel,
    setShowFilterPanel,
    fetchUsers,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  } = useUsers();

  return (
    <div className="min-h-dvh bg-regal-blue">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold sm:text-2xl">
            User Management System
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="space-y-4">
          {error && <ErrorMessage message={error} onRetry={fetchUsers} />}

          <div className="rounded-xl border border-neutral-200 bg-white/80 p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
            <HeaderControls
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              filters={filters}
              onFilterChange={setFilters}
              showFilterPanel={showFilterPanel}
              onToggleFilterPanel={() => setShowFilterPanel((s) => !s)}
              onOpenAdd={() => {
                setSelectedUser(null);
                setShowUserForm(true);
              }}
              FilterPanelComponent={FilterPanel}
            />
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white/70 shadow-sm ring-1 ring-black/5">
            {loading ? (
              <LoadingSpinner />
            ) : processedUsers.length === 0 ? (
              <EmptyState
                title="No users found"
                message="Try adjusting your search or filter criteria."
              />
            ) : (
              <>
                <UsersTable
                  users={paginatedUsers}
                  onSort={handleSort}
                  renderSortIndicator={renderSortIndicator}
                  onEdit={(u) => {
                    setSelectedUser(u);
                    setShowUserForm(true);
                  }}
                  onDelete={(u) => {
                    setSelectedUser(u);
                    setShowDeleteConfirm(true);
                  }}
                />
                <div className="border-t p-3 sm:p-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={processedUsers.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                    startIndex={startIndex}
                    endIndex={endIndex}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <UserForm
        isOpen={showUserForm}
        onClose={() => {
          setShowUserForm(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
        user={selectedUser}
        isLoading={formLoading}
      />

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        user={selectedUser}
        isLoading={formLoading}
      />
    </div>
  );
}
