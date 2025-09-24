export function parseName(fullName) {
  const split = (fullName || "").trim().split(" ");
  const firstName = split[0] || "";
  const lastName = split.slice(1).join(" ") || "";
  return { firstName, lastName };
}

export function sortUsers(data, sortData) {
  if (!sortData?.key) return data;

  const { key: sortKey, direction: sortDirection } = sortData;

  const sortedList = [...data].sort((a, b) => {
    let valA, valB;

    if (sortKey === "firstName") {
      valA = parseName(a.name).firstName;
      valB = parseName(b.name).firstName;
    } else if (sortKey === "lastName") {
      valA = parseName(a.name).lastName;
      valB = parseName(b.name).lastName;
    } else if (sortKey === "department") {
      valA = a.company?.name || "";
      valB = b.company?.name || "";
    } else {
      valA = a[sortKey];
      valB = b[sortKey];
    }

    if (typeof valA === "string" && typeof valB === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return sortedList;
}

export function filterUsers(users, searchQuery, filters) {
  let filteredUsers = [...users];
  const query = (searchQuery || "").toLowerCase();

  if (query) {
    filteredUsers = filteredUsers.filter((user) => {
      const { firstName, lastName } = parseName(user.name);
      const departmentName = user.company?.name || "";

      return (
        (user.name || "").toLowerCase().includes(query) ||
        (user.email || "").toLowerCase().includes(query) ||
        departmentName.toLowerCase().includes(query) ||
        firstName.toLowerCase().includes(query) ||
        lastName.toLowerCase().includes(query)
      );
    });
  }

  const filteredQuery = {
    firstName: (filters.firstName || "").toLowerCase(),
    lastName: (filters.lastName || "").toLowerCase(),
    email: (filters.email || "").toLowerCase(),
    department: (filters.department || "").toLowerCase(),
  };

  const hasActiveFilters =
    filteredQuery.firstName ||
    filteredQuery.lastName ||
    filteredQuery.email ||
    filteredQuery.department;

  if (hasActiveFilters) {
    filteredUsers = filteredUsers.filter((user) => {
      const { firstName, lastName } = parseName(user.name);
      const departmentName = user.company?.name || "";

      const matchedFirstName =
        !filteredQuery.firstName ||
        firstName.toLowerCase().includes(filteredQuery.firstName);

      const matchedLastName =
        !filteredQuery.lastName ||
        lastName.toLowerCase().includes(filteredQuery.lastName);

      const matchedEmail =
        !filteredQuery.email ||
        (user.email || "").toLowerCase().includes(filteredQuery.email);

      const matchedDepartment =
        !filteredQuery.department ||
        departmentName.toLowerCase().includes(filteredQuery.department);

      return (
        matchedFirstName && matchedLastName && matchedEmail && matchedDepartment
      );
    });
  }

  return filteredUsers;
}
