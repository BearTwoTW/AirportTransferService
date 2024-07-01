import Variables from "../scss/App.css";
import { Autocomplete, TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import { HandleSelectEvent, HandleInputEvent } from "../js/Types";
// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

/**
 * @description 選項型別
 * @param name 名稱
 * @param value 值
 */
export type optionsContent = {
    name: string;
    value: any;
};

export type CusOutlinedSelectProps = {
    id?: string,
    className?: string,
    size?: 'small' | 'medium',
    color?: string,
    style?: React.CSSProperties,
    disabled?: boolean,
    readOnly?: boolean,
    options: optionsContent[];
    label?: string,
    name: string,
    value: any,
    onChangeEvent: (e: HandleSelectEvent) => void;
    onInputChangeEvent?: (e: HandleInputEvent) => void;
    error?: boolean,
    required?: boolean,
    placeholder?: string,
    type?: string,
    optionKey: string,
    searchKey?: string,
};
/**
 * @description 單選下拉選單
 * @param props 
 */
export const CusOutlinedSelect = (props: CusOutlinedSelectProps) => {
    const { id, className, size, color, style, disabled, readOnly, options, label, name, value, onChangeEvent, error, required, placeholder, type, optionKey, onInputChangeEvent, searchKey
    } = props;
    return (
        <Autocomplete
            slotProps={{
                clearIndicator: {
                    sx: {
                        padding: "4px",
                        borderRadius: "15px",
                    },
                },
                popupIndicator: {
                    sx: {
                        [`&.MuiAutocomplete-popupIndicatorOpen`]: {
                            transform: "rotate(180deg)",
                        },
                        [`&.Mui-disabled`]: {
                            boxShadow: "none"
                        }
                    }
                }
            }}
            sx={{
                marginRight: { sm: "0.6rem", xs: "0rem" },
            }}
            // disablePortal // 先拿掉，不然預設的話，選單比較長的時候，會被Dialog遮住
            className={className}
            id={id}
            size={size ?? "small"}
            color={color ?? "primary"}
            value={value}
            style={style}
            disabled={disabled ?? false}
            readOnly={readOnly ?? false}
            options={options || []}
            filterOptions={(x) => x}
            openOnFocus={true}
            autoComplete={true}
            includeInputInList={true}
            isOptionEqualToValue={(option, val) => (option.value === val.value)}
            getOptionDisabled={(option) => option.disabled}
            onChange={(e, newValue) => {
                if (onChangeEvent !== undefined) {
                    onChangeEvent({
                        target: {
                            id: id,
                            name: name,
                            value: newValue === null ? "" : newValue,
                            label: label,
                            type: type,
                            key: optionKey,
                        }
                    })
                }
            }}
            onInputChange={(e, newInputValue) => {
                if (onInputChangeEvent !== undefined) {
                    onInputChangeEvent({
                        target: {
                            id: id,
                            name: searchKey ?? "",
                            value: newInputValue,
                        }
                    })
                }
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) =>
            (<TextField {...params}
                sx={{
                    marginTop: "0.6rem",
                    marginBottom: "0.6rem",
                    input: {
                        color: Variables[status + "__DefaultContrastText"]
                    },
                }}
                InputLabelProps={{
                    sx: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&.${inputLabelClasses.shrink}`]: {
                            color: Variables[status + "__Secondary"],
                        },
                    }
                }}
                autoComplete={"off"}
                value={value}
                label={label}
                error={error ?? false}
                helperText={error ? label + '必填' : null}
                required={required}
                placeholder={placeholder}
            />)
            }
            renderOption={(props, option) => {
                return (
                    <li {...props}>{option.name}</li>
                );
            }}
        />
    );
};



/**
 * @description 複選下拉選單傳入參數
 * @param id id
 * @param name 名稱
 * @param size 尺寸
 * @param multiple 是否多選
 * @param limitTags 顯示選擇的數量
 * @param value 值
 * @param disable 是否禁用
 * @param readOnly 是否唯讀
 * @param options 選項
 * @param onChangeEvent 輸入事件
 * @param label 標籤
 * @param error 是否錯誤
 * @param required 是否必填
 * @param placeholder 提示文字
 */
export type CusMultipleOutlinedSelectProps = {
    // -> Autocomplete
    id: string;
    name: string;
    size?: "small" | "medium";
    multiple?: boolean;
    limitTags?: number;
    value: optionsContent[];
    disable?: boolean;
    readOnly?: boolean;
    options: optionsContent[];
    onChangeEvent: (event: { target: { id: string; name: string; value: optionsContent[] } }) => void;
    // -> TextField
    label: string;
    error?: boolean;
    required?: boolean;
    placeholder?: string;
};

/**
 * @description 複選下拉選單
 * @param props
 */
export const CusMultipleOutlinedSelect = (props: CusMultipleOutlinedSelectProps) => {
    const {
        // -> Autocomplete
        id, name, size, limitTags, value, disable, readOnly, options, onChangeEvent,
        // -> TextField
        label, error, required, placeholder,
    } = props;

    return (
        <Autocomplete
            sx={{
                marginRight: { sm: "0.6rem", xs: "0rem" },
            }}
            slotProps={{
                clearIndicator: {
                    sx: {
                        padding: "4px",
                        borderRadius: "15px",
                    },
                },
                popupIndicator: {
                    sx: {
                        [`&.MuiAutocomplete-popupIndicatorOpen`]: {
                            transform: "rotate(180deg)",
                        },
                        [`&.Mui-disabled`]: {
                            boxShadow: "none"
                        }
                    }
                }
            }}
            id={id}
            size={size ?? "small"}
            multiple={true}
            limitTags={limitTags ?? 2}
            disableCloseOnSelect={true}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            value={value}
            disabled={disable}
            readOnly={readOnly}
            options={options}
            filterOptions={(x) => x}
            openOnFocus={true}
            autoComplete={true}
            includeInputInList={true}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
                onChangeEvent({
                    target: {
                        id: id,
                        name: name,
                        value: value,
                    },
                });
            }}
            renderInput={(params) =>
            (<TextField
                {...params}
                sx={{
                    marginTop: "0.6rem",
                    marginBottom: "0.6rem",
                    input: {
                        color: Variables[status + "__DefaultContrastText"]
                    },
                }}
                InputLabelProps={{
                    sx: {
                        color: Variables[status + "__DefaultContrastText"],
                        [`&.${inputLabelClasses.shrink}`]: {
                            color: Variables[status + "__Secondary"],
                        },
                    }
                }}
                autoComplete={"off"}
                // value={value}
                label={label}
                error={error}
                helperText={error ? label + '必填' : null}
                required={required}
                placeholder={placeholder}
            />)}
        />
    );
};