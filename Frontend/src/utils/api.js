export const apiFetch = async (url, options = {}, navigate) => {

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  // 🔥 global unauthorized handling
  if (response.status === 401) {

    sessionStorage.clear();

    alert("SPlease login to proceed.");

    navigate("/", { replace: true });

    throw new Error("Unauthorized");
  }

  return response;
};