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
  username: string;
  password: string;
}

interface IRegister {
  email: string;
  row: string;
  password: string;
  confirmPassword: string;
}

interface InitialStateStylesLogin {
  Loading: boolean;
  Error: string | null;
  isLogined: boolean;
  isRegister: boolean;
  username: string;
}
const initialState: InitialStateStylesLogin = {
  Loading: false,
  Error: "",
  isLogined: false,
  isRegister: false,
  username: "",
};

export const LoginAction = createAsyncThunk<string, ILogin>(
  "Authentication/LoginAction",
  async (login: ILogin) => {
    try {
      const response = await LoginApi(login);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message);
      throw Error(error.message);
    }
  }
);

export const RegisterAction = createAsyncThunk(
  "Authentication/RegisterAction",
  async (register: IRegister) => {
    const values = {
      email: register.email,
      row: register.row,
      password: register.password,
      confirmPassword: register.confirmPassword,
    };
    try {
      const response = await RegisterApi(values);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.message);
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
  },
  extraReducers(builder) {
    builder
      .addCase(LoginAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(RegisterAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(LogoutAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(
        LoginAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.Loading = false;
          state.isLogined = true;
          state.username = action.payload;
        }
      )
      .addCase(RegisterAction.fulfilled, (state) => {
        state.Loading = false;
      })
      .addCase(LogoutAction.fulfilled, (state) => {
        state.Loading = false;
        state.username = "";
      })

      .addCase(LoginAction.rejected, (state, action) => {
        state.Loading = false;
        state.isLogined = false;
        state.Error = action.error.message || "Login failed";
      })
      .addCase(RegisterAction.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.error.message || "Registration failed";
      })
      .addCase(LogoutAction.rejected, (state, action) => {
        state.Loading = false;
        state.isLogined = false;
        state.Error = action.error.message || "Logout failed";
      });
  },
});
// eslint-disable-next-line react-refresh/only-export-components
export const { userRegister, clearState, clearStateWhenLogout } =
  AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
