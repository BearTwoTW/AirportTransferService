
import { OutlinedInput, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

export const WebOutlinedSelect3 = (props) => {
  return (
    <FormControl sx={{ minWidth: "100%" }}>
      <Select
        disabled={props.disabled ? props.disabled : false}
        fullWidth={props.fullWidth ? props.fullWidth : false}
        sx={{
          width: "100%",
          paddingRight: { sm: "0.2rem", xs: "0rem" },
          marginTop: "0.6rem",
          marginBottom: "0.6rem",
          [`&.MuiInputBase-root`]: {
            [`& fieldset`]: {
              // input 樣式
            },
            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              // input focused 樣式
            }
          },
        }}
        displayEmpty
        // value={props.value}
        value={
          (props.value === undefined ||
            props.value === null ||
            props.options.length === 0) ? '' : props.value}
        onChange={(e) => props.onChangeEvent({
          "target": {
            "name": props.name,
            "value": e.target.value
          }
        })}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected) {
            return selected
          }
          return <span style={{ color: '#A3A3A3', fontWeight: "300" }}>{props.label}</span>
        }}
        MenuProps={{
          PaperProps: {
            style: { borderRadius: "0" }
          },
          MenuListProps: {
            style: { margin: "0" }
          }
        }}
        // required={props.required}
        inputProps={{ 'aria-label': 'Without label' }}
        // IconComponent={() => (
        //   <ArrowForwardIosSlenderDownOutlined className={"w-4"} color={"#000"} />)}
        IconComponent={KeyboardArrowDown}
      >
        <MenuItem disabled value="">{props.label}</MenuItem>
        {props.options ? props.options.map((ele, seq) => (
          <MenuItem key={seq} value={ele.name} disabled={ele.disabled}>
            {ele.name}
          </MenuItem>
        )) : null}
      </Select>
      {props.error ? <FormHelperText error={props.error}>{"必填"}</FormHelperText> : null}
    </FormControl >
  );
}