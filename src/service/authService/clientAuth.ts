// // clientAuth.ts
// export const getAccessToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("accessToken");
//   }
//   return null;
// };


export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export function getUserData() {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("userData");
    return raw ? JSON.parse(raw) : null;
  }
  return null;
}

export const setClientAuth = (token: string, userData: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  }
};

export const clearClientAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
  }
};
