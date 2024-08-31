import { Autocomplete, TextField } from '@mui/material';
import Variables from "../scss/App.css";
import PropTypes from 'prop-types';
import { inputLabelClasses } from "@mui/material/InputLabel";

// UI樣式
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus")

const CusOutlinedSelect = (props) => {
  // 輸入後模糊查詢 option 內的選項
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  return (
    <Autocomplete
      slotProps={{
        clearIndicator: {
          sx: {
            padding: "4px",
            borderRadius: "15px",
            '.MuiAutocomplete-clearIndicator': {
              display: 'none',
            },
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
      className={props.className}
      id={props.id}
      size={props.size}
      color={props.color}
      value={props.value}
      style={props.style}
      disabled={props.disabled}
      readOnly={props.readOnly}
      options={props.options || []}
      filterOptions={filterOptions}
      openOnFocus={true}
      autoComplete={true}
      includeInputInList={true}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={(e, value) => {
        if (props.onChangeEvent !== undefined) {
          props.onChangeEvent({
            "target": {
              "id": props.id,
              "name": props.name,
              "value": value,
              "label": props.label,
              "type": props.type,
              "key": (props.optionKey === undefined ? "" : props.optionKey),
            }
          })
        }
      }}
      onInputChange={(e, newInputValue) => {
        if (props.onInputChangeEvent !== undefined) {
          props.onInputChangeEvent({
            "target": {
              "id": props.id,
              "name": props.searchKey,
              "value": newInputValue,
            }
          })
        }
      }}
      getOptionLabel={(option) => option.name || null}
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
        value={props.value}
        label={props.label}
        error={props.error}
        helperText={props.error ? props.label + '必填' : null}
        required={props.required}
        placeholder={props.placeholder}
      />)
      }
      renderOption={(props, option) => {
        return (
          <li {...props}>{option.name}</li>
        );
      }}
    />
  );
}

CusOutlinedSelect.defaultProps = {
  fullWidth: true,
  id: '',
  className: '',
  size: 'small',
  color: "primary",
  style: {},
  error: false,
  helperText: '',
  disabled: false,
  readOnly: false,
  options: [],
  label: '',
};

CusOutlinedSelect.prototype = {
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  option: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

export { CusOutlinedSelect }