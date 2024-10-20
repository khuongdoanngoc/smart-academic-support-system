import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FileItem {
  name: string;
  size: number;
}

interface FileUploadState {
  isDragging: boolean;
  menuDeleButton: boolean;
  alertFile: boolean;
  informationAlert: string;
  defaultUploadFile: boolean;
  fileSelected: File | null;
  isColorItemButton: number;
  fileDetailLoad: boolean;
  valueRow: string;
  valueRowYear: string;
  menuCheckItemRow: boolean;
  menuCheckItemRowYear: boolean;
  uploadFileSuccess: boolean;
  fileList: FileItem[];

  specialized: string;
  subject: string;
  folder: string;
  documentType: string;
  title: string;
  academicYear: string;
  description: string;
}

const initialState: FileUploadState = {
  fileList: [],
  isDragging: false,
  menuDeleButton: false,
  alertFile: false,
  informationAlert: "",
  defaultUploadFile: false,
  fileSelected: null,
  isColorItemButton: 1,
  fileDetailLoad: false,
  valueRow: "",
  valueRowYear: "",
  menuCheckItemRow: false,
  menuCheckItemRowYear: false,
  uploadFileSuccess: false,

  specialized: "",
  subject: "",
  folder: "",
  documentType: "",
  title: "",
  academicYear: "",
  description: "",
};
const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    setFileList: (state, action: PayloadAction<FileItem[]>) => {
      state.fileList = action.payload;
    },
    addFileToList: (state, action: PayloadAction<FileItem>) => {
      state.fileList.push(action.payload);
    },
    removeFileFromList: (state, action: PayloadAction<number>) => {
      state.fileList = state.fileList.filter(
        (_, index) => index !== action.payload
      );
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setMenuDeleButton: (state, action: PayloadAction<boolean>) => {
      state.menuDeleButton = action.payload;
    },
    setMenuDeleteButton: (state, action: PayloadAction<boolean>) => {
      state.menuDeleButton = action.payload;
    },
    setAlertFile: (state, action: PayloadAction<boolean>) => {
      state.alertFile = action.payload;
    },
    setInformationAlert: (state, action: PayloadAction<string>) => {
      state.informationAlert = action.payload;
    },
    setDefaultUploadFile: (state, action: PayloadAction<boolean>) => {
      state.defaultUploadFile = action.payload;
    },
    setFileSelected: (state, action: PayloadAction<File | null>) => {
      state.fileSelected = action.payload; // Chỉ lưu thông tin file cần thiết
    },
    setIsColorItemButton: (
      state,
      action: PayloadAction<number | ((item: number) => number)>
    ) => {
      if (typeof action.payload === "function") {
        state.isColorItemButton = Math.min(
          action.payload(state.isColorItemButton) + 1,
          3
        );
      } else {
        state.isColorItemButton = action.payload;
      }
    },
    setFileDetailLoad: (state, action: PayloadAction<boolean>) => {
      state.fileDetailLoad = action.payload;
    },
    setValueRow: (state, action: PayloadAction<string>) => {
      state.valueRow = action.payload;
    },
    setvalueRowYear: (state, action: PayloadAction<string>) => {
      state.valueRowYear = action.payload;
    },
    setmenuCheckItemRow: (state, action: PayloadAction<boolean>) => {
      state.menuCheckItemRow = action.payload;
    },
    setMenuCheckItemRowYear: (state, action: PayloadAction<boolean>) => {
      state.menuCheckItemRowYear = action.payload;
    },
    setUploadFileSuccess: (state, action: PayloadAction<boolean>) => {
      state.uploadFileSuccess = action.payload;
    },

    setSpecialized: (state, action: PayloadAction<string>) => {
      state.specialized = action.payload;
    },

    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    setFolder: (state, action: PayloadAction<string>) => {
      state.folder = action.payload;
    },
    setDocumentType: (state, action: PayloadAction<string>) => {
      state.documentType = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAcademicYear: (state, action: PayloadAction<string>) => {
      state.academicYear = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const {
  setFileList,
  setIsDragging,
  setMenuDeleButton,
  setAlertFile,
  setInformationAlert,
  setDefaultUploadFile,
  setFileSelected,
  setIsColorItemButton,
  setFileDetailLoad,
  setValueRow,
  setvalueRowYear,
  setmenuCheckItemRow,
  setMenuCheckItemRowYear,
  setUploadFileSuccess,
  setSpecialized,
  setSubject,
  setFolder,
  setDocumentType,
  setTitle,
  setAcademicYear,
  setDescription,
} = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
