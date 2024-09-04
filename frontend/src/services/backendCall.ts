import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { authEndPoint, blogEndPoint } from "./api";

const { SIGNUP, LOGIN, LOGOUT } = authEndPoint;
const { CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG, ALL_BLOG, GET_BLOG, USER_BLOG } =
  blogEndPoint;

interface SignupBody {
  name?: string;
  email: string;
  password: string;
}

export async function signup(data: SignupBody) {
  const toastId = toast.loading("Signing...");
  try {
    const response = await apiConnector({
      method: "POST",
      URL: SIGNUP,
      bodyData: data,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Account Created!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> ACCOUNT CREATION API ERROR: ", message);
    toast.error(message || "Failed to create Account");
  } finally {
    toast.dismiss(toastId);
  }
}

interface LoginBody {
  email: string;
  password: string;
}

export async function login(data: LoginBody) {
  const toastId = toast.loading("Loging...");
  try {
    const response = await apiConnector({
      method: "POST",
      URL: LOGIN,
      bodyData: data,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Login success!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> LOGIN API ERROR: ", message);
    toast.error(message || "Failed to Login");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function logout() {
  const toastId = toast.loading("Loging out...");
  try {
    const response = await apiConnector({
      method: "POST",
      URL: LOGOUT,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("User Logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> LOGOUT API ERROR: ", message);
    toast.error(message || "Failed to Logout");
  } finally {
    toast.dismiss(toastId);
  }
}

interface CreateBlog {
  title: string;
  content: string;
}

export async function createBlog(token: string, data: CreateBlog) {
  const toastId = toast.loading("Creating Blog...");
  const headers = { Authorization: "Bearer " + token };
  try {
    const response = await apiConnector({
      method: "POST",
      URL: CREATE_BLOG,
      bodyData: data,
      headers: headers,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blog Created!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> BLOG CREATION API ERROR: ", message);
    toast.error(message || "Failed to create Blog");
  } finally {
    toast.dismiss(toastId);
  }
}

interface UpdateBlog {
  title: string;
  content: string;
}

export async function updateBlog(
  token: string,
  data: UpdateBlog,
  param: string
) {
  const toastId = toast.loading("Updating Blog...");
  const headers = { Authorization: "Bearer " + token };
  try {
    const response = await apiConnector({
      method: "PUT",
      URL: `${UPDATE_BLOG}?id=${param}`,
      bodyData: data,
      headers: headers,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blog Updated!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> BLOG UPDATE API ERROR: ", message);
    toast.error(message || "Failed to update Blog");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function getAllBlogs(token: string) {
  const toastId = toast.loading("Fetching Blog...");
  const headers = { Authorization: "Bearer " + token };

  try {
    const response = await apiConnector({
      method: "GET",
      URL: ALL_BLOG,
      bodyData: undefined,
      headers: headers,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blogs in Your timeline!!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> FETCHED BLOGS API ERROR: ", message);
    toast.error(message || "Failed to Fetch Blogs");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function getBlog(token: string, param: string) {
  const toastId = toast.loading("Fetching Blog...");
  const headers = { Authorization: "Bearer " + token };

  try {
    const response = await apiConnector({
      method: "GET",
      URL: `${GET_BLOG}?id=${param}`,
      bodyData: undefined,
      headers: headers,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blog Fetched!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> BLOG FETCH API ERROR: ", message);
    toast.error(message || "Failed to fetch specific Blog");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function userBlog(token: string, param: string) {
  const toastId = toast.loading("Fetching Blog...");
  const headers = { Authorization: "Bearer " + token };
  try {
    const response = await apiConnector({
      method: "GET",
      URL: USER_BLOG,
      bodyData: undefined,
      headers: headers,
      params: param,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blog Fetched!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> BLOG API ERROR: ", message);
    toast.error(message || "Failed to Fetch user Blog");
  } finally {
    toast.dismiss(toastId);
  }
}

export async function deleteBlog(token: string, param: string) {
  const toastId = toast.loading("deleting Blog...");
  const headers = { Authorization: "Bearer " + token };

  try {
    const response = await apiConnector({
      method: "DELETE",
      URL: `${DELETE_BLOG}?id=${param}`,
      bodyData: undefined,
      headers: headers,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Blog deleted!");
    return response;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    console.error("> BLOG DELETE API ERROR: ", message);
    toast.error(message || "Failed to delete Blog");
  } finally {
    toast.dismiss(toastId);
  }
}
