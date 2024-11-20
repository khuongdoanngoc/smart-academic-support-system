import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginApi,
  LogoutApi,
  RegisterApi,
} from "../../services/AuthenticationApi/AuthenticationApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
// import { error } from "console";

interface ILogin {
  email: string;
  password: string;
}
interface ILoginS {
  listRoles: string[];
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface IRegister {
  email: string;
  password: string;
  roleName: string;
}

interface InitialStateStylesLogin {
  loading: boolean;
  Error: string | null;
  isLogined: boolean;
  isRegister: boolean;
  username: string;
  listRoles: string[];
  accessToken: string;
  refreshToken: string;
}
const initialState: InitialStateStylesLogin = {
  loading: false,
  Error: "",
  isLogined: false,
  isRegister: false,
  username: "",
  listRoles: [],
  accessToken: "",
  refreshToken: "",
};

export const LoginAction = createAsyncThunk<ILoginS, ILogin>(
  "Authentication/LoginAction",
  async (login: ILogin, { rejectWithValue }) => {
    try {
      const response = await LoginApi(login);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.message);
    }
  }
);

export const RegisterAction = createAsyncThunk(
  "Authentication/RegisterAction",
  async (register: IRegister) => {
    const values = {
      email: register.email,
      password: register.password,
      roleName: register.roleName,
    };

    try {
      const response = await RegisterApi(values);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      throw Error(error.message);
    }
  }
);
export const LogoutAction = createAsyncThunk(
  "Authentication/LogoutAction",
  async () => {
    try {
      const response = await LogoutApi();
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message);
      throw Error(error.message);
    }
  }
);
const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
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

    loginSuccess: (state) => {
      state.loading = false; // Đặt loading = false khi đăng nhập thành công
      state.isLogined = true;
    },
    registerSuccess: (state) => {
      state.loading = false; // Đặt loading = false khi đăng nhập thành công
      state.isRegister = true;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    registerFailure: (state) => {
      state.loading = false;
    },
  },
  //caovanan
  //caovanan
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
        // state.username = "";
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
} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
