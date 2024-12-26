import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ICensorDropdown {
    censor: string;
    onDropdownChange: (value: string) => void;
    values: any[];
}

export default function CensorDropdown({
    censor,
    onDropdownChange,
    values,
}: ICensorDropdown) {
    const handleChange = (event: SelectChangeEvent) => {
        onDropdownChange(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Phân loại theo...
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={censor}
                    style={{ borderRadius: "10px" }}
                    label="Phân loại theo..."
                    onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {values?.map((value, index) => (
                        <MenuItem key={index} value={value.code}>
                            {value.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
