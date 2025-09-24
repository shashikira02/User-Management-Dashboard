const BACKEND_POINT = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsersApi() {
  const res = await fetch(BACKEND_POINT);
  if (!res.ok) throw new Error("Failed to fetch users");
  //console.log(res)

  return res.json();
}

export async function addUserApi(userData) { 
  const res = await fetch(BACKEND_POINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to add user");

  return res.json();
}

export async function updateUserApi(id, userData) {
  const res = await fetch(`${BACKEND_POINT}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");

  return res.json();
}

export async function deleteUserApi(id) {
  const res = await fetch(`${BACKEND_POINT}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return true;
}
