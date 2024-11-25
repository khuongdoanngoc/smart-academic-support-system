import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginApi,
  LogoutApi,
  RegisterApi,
} from "../../services/AuthenticationApi/AuthenticationApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ILogin {
  //interface login
  email: string;
  password: string;
}
interface ILoginS {
  //interface login success
  listRoles: string[];
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface IRegister {
  //interface register
  email: string;
  password: string;
  roleName: string;
}

interface InitialStateStylesLogin {
  //interface initial state login
  loading: boolean;
  Error: string;
  isLogined: boolean;
  isRegister: boolean;
  username: string;
  listRoles: string[];
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}
const getStorageItem = (key: string) => {
  //hàm lấy item từ local storage
  const item = localStorage.getItem(key);
  return item || null;
};
const initialState: InitialStateStylesLogin = {
  //initial state login
  loading: false,
  Error: "",
  isLogined: false,
  isRegister: false,
  username: "",
  listRoles: [],
  isAuthenticated: !!localStorage.getItem("accessToken"),

  accessToken: getStorageItem("accessToken"),
  refreshToken: getStorageItem("refreshToken"),
};

export const LoginAction = createAsyncThunk<ILoginS, ILogin>(
  "Authentication/LoginAction", //name login
  async (login: ILogin, { rejectWithValue }) => {
    try {
      const response = await LoginApi(login); //login api
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.message); //rejectWithValue
    }
  }
);

export const RegisterAction = createAsyncThunk(
  "Authentication/RegisterAction", //name register
  async (register: IRegister) => {
    const values = {
      email: register.email,
      password: register.password,
      roleName: register.roleName,
    };

    try {
      const response = await RegisterApi(values); //register api
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw Error(error.message); //throw error
    }
  }
);
export const LogoutAction = createAsyncThunk(
  "Authentication/LogoutAction", //name logout
  async () => {
    try {
      const response = await LogoutApi(); //logout api
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message); //toast error
      throw Error(error.message); //throw error
    }
  }
);
const AuthenticationSlice = createSlice({
  name: "Authentication", //name slice
  initialState, //initial state
  reducers: {
    userRegister: (state) => {
      state.isRegister = true;
    },
    clearState: (state) => {
      state.isRegister = false;
    },
    clearStateWhenLogout: (state) => {
      state.isLogined = false;
    },
    loginStart: (state) => {
      state.loading = true; // Đặt loading = true khi bắt đầu đăng nhập
    },
    registerStart: (state) => {
      state.loading = true; // Đặt loading = true khi bắt đầu đăng ký
    },

    loginSuccess: (state, action) => {
      const { username, listRoles, accessToken, refreshToken } = action.payload;
      state.loading = false; // Đặt loading = false khi đăng nhập thành công
      state.isLogined = true; //đăng nhập thành công
      state.isAuthenticated = true; //đăng nhập thành công
      state.accessToken = accessToken; //accessToken
      state.refreshToken = refreshToken; //refreshToken
      state.username = username; //username
      state.listRoles = listRoles; //listRoles
      localStorage.setItem("accessToken", accessToken); //set accessToken
      localStorage.setItem("refreshToken", refreshToken); //set refreshToken
      localStorage.setItem("username", username); //set username
    },
    updateToken: (state, action) => {
      const { accessToken } = action.payload; //payload accessToken
      state.accessToken = accessToken; //accessToken
      localStorage.setItem("accessToken", accessToken); //set accessToken
    },
    registerSuccess: (state) => {
      state.loading = false; // Đặt loading = false khi đăng nhập thành công
      state.isRegister = true; //đăng ký thành công
    },
    loginFailure: (state) => {
      state.loading = false; //đăng nhập thất bại
    },
    registerFailure: (state) => {
      state.loading = false; //đăng ký thất bại
    },
    logout: (state) => {
      state.isAuthenticated = false; //đăng nhập thất bại
      state.isLogined = false; //đăng nhập thất bại
      state.username = ""; //username
      state.listRoles = []; //listRoles
      state.accessToken = null; //accessToken
      state.refreshToken = null; //refreshToken
      localStorage.removeItem("accessToken"); //remove accessToken
      localStorage.removeItem("refreshToken"); //remove refreshToken
      localStorage.removeItem("username"); //remove username
    },
  },
  extraReducers(builder) {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        LoginAction.fulfilled,
        (state, action: PayloadAction<ILoginS>) => {
          state.loading = false;
          state.isLogined = true;
          state.username = action.payload.username;
          state.listRoles = action.payload.listRoles;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      )
      .addCase(RegisterAction.fulfilled, (state) => {
        state.loading = false;
        state.isRegister = true;
      })
      .addCase(LogoutAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(LoginAction.rejected, (state) => {
        state.loading = false;
        state.isLogined = false;
      })

      .addCase(RegisterAction.rejected, (state) => {
        state.loading = false;
        state.isRegister = false;
      })
      .addCase(LogoutAction.rejected, (state, action) => {
        state.loading = false;
        state.isLogined = false;
        state.Error = action.error.message || "Logout failed";
      });
  },
});
// eslint-disable-next-line react-refresh/only-export-components
export const {
  userRegister,
  clearState,
  clearStateWhenLogout,
  loginStart,
  loginFailure,
  loginSuccess,
  registerStart,
  registerFailure,
  registerSuccess,
  updateToken,
  logout,
} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
