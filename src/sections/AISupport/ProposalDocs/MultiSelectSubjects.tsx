import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const courses = [
    { code: "CMU-SE 100", name: "Introduction to Software Engineering" },
    { code: "CMU-CS 246", name: "Application Development Practices" },
    { code: "STA 151", name: "Lý Thuyết Xác Suất & Thống Kê Toán" },
    { code: "MTH 254", name: "Toán Rời Rạc & Ứng Dụng" },
    { code: "CMU-CS 316", name: "Fundamentals of Computing 2" },
    { code: "CS 211", name: "Lập Trình Cơ Sở" },
    {
        code: "CMU-CS 311",
        name: "Object-Oriented Programming C++ (Advanced Concepts in Computing)",
    },
    { code: "IS 301", name: "Cơ Sở Dữ Liệu" },
    {
        code: "CMU-CS 252",
        name: "Introduction to Network & Telecommunications Technology",
    },
    { code: "CMU-CS 303", name: "Fundamentals of Computing 1" },
    { code: "CMU-SE 214", name: "Requirements Engineering" },
    {
        code: "CMU-SE 252",
        name: "Computer Science for Practicing Engineers (Software Construction)",
    },
    { code: "CMU-ENG 130", name: "Anh Văn Chuyên Ngành cho Sinh Viên CMU 1" },
    { code: "CMU-ENG 230", name: "Anh Văn Chuyên Ngành cho Sinh Viên CMU 2" },
    { code: "DTE-CS 231", name: "Asia Community with IT" },
    { code: "CMU-CS 297", name: "Đồ Án CDIO" },
    { code: "MTH 291", name: "Toán Ứng Dụng cho Công Nghệ Thông Tin 1" },
    { code: "MTH 341", name: "Toán Ứng Dụng cho Công Nghệ Thông Tin 2" },
    { code: "CMU-CS 445", name: "System Integration Practices" },
    { code: "CMU-SE 445", name: "Software Reuse & Integration" },
    { code: "IS-CS 466", name: "Introduction to Data Science in Python" },
    { code: "IS-CS 468", name: "Artificial Intelligence (for Business)" },
    { code: "CR 424", name: "Lập Trình Ứng Dụng cho các Thiết Bị Di Động" },
    { code: "CS 366", name: "L.A.M.P. (Linux, Apache, MySQL, PHP)" },
    { code: "CS 466", name: "Perl & Python" },
    { code: "IS 385", name: "Kỹ Thuật Thương Mại Điện Tử" },
    { code: "CS 464", name: "Lập Trình Ứng Dụng .NET" },
    { code: "CMU-IS 401", name: "Information System Applications" },
    { code: "CMU-SE 403", name: "Software Architecture & Design" },
    { code: "CMU-IS 432", name: "Software Project Management" },
    { code: "CMU-SE 433", name: "Software Process & Quality Management" },
    {
        code: "CMU-SE 303",
        name: "Software Testing (Verification & Validation)",
    },
    { code: "CMU-CS 462", name: "Software Measurements & Analysis" },
    { code: "CMU-CS 447", name: "Đồ Án CDIO" },
    { code: "CMU-SE 450", name: "Capstone Project for Software Engineering 1" },
    { code: "CMU-SE 451", name: "Capstone Project for Software Engineering 2" },
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface IProps {
    courseName: string[];
    onChange: (
        event: SelectChangeEvent<string[]>,
        child: React.ReactNode
    ) => void;
}

export default function MultiSelectSubjects({ courseName, onChange }: IProps) {
    const theme = useTheme();

    return (
        <div>
            <FormControl sx={{ mt: "20px", width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                    Mã môn học
                </InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={courseName}
                    onChange={onChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="Mã môn học"
                        />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                overflowX: "auto",
                                gap: 0.5,
                            }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}>
                    {courses.map((value, index) => (
                        <MenuItem
                            key={index}
                            value={value.code}
                            style={getStyles(value.name, courseName, theme)}>
                            {value.code}: {value.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
