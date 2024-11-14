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
  username: string;
}

interface IRegister {
  email: string;
  password: string;
  roleName: string;
}

interface InitialStateStylesLogin {
  Loading: boolean;
  Error: string | null;
  isLogined: boolean;
  isRegister: boolean;
  username: string;
  listRoles: string[];
}
const initialState: InitialStateStylesLogin = {
  Loading: false,
  Error: "",
  isLogined: false,
  isRegister: false,
  username: "",
  listRoles: [],
};

export const LoginAction = createAsyncThunk<ILoginS, ILogin>(
  "Authentication/LoginAction",
  async (login: ILogin) => {
    try {
      const response = await LoginApi(login);
      return response as ILoginS;
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
      password: register.password,
      roleName: register.roleName,
    };
    try {
      const response = await RegisterApi(values);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data.message || "Registration failed");
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
        (state, action: PayloadAction<ILoginS>) => {
          console.log(123);

          state.Loading = false;
          state.isLogined = true;
          state.username = action.payload.username;
          state.listRoles = action.payload.listRoles;
        }
      )

      .addCase(RegisterAction.fulfilled, (state, action) => {
        console.log(123);

        state.Loading = false;
        console.log(action.payload);
        if (action.payload) {
          toast.success("Đăng ký tài khoản thành côngg!");
        }
      })
      .addCase(LogoutAction.fulfilled, (state) => {
        state.Loading = false;
        state.username = "";
      })

      .addCase(LoginAction.rejected, (state, action) => {
        state.Loading = false;
        state.isLogined = false;
        const errorMessage = action.payload as string;

        toast.error(
          errorMessage ||
            `Account not found with email or not active: ${state.username}`
        );
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
