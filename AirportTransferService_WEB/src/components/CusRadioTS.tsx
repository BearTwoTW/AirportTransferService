import { useMemo, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography, FormHelperText } from '@mui/material';
import { HandleInputEvent } from "../js/Types";
import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

export type CusRadioItem = {
  key: string;
  control: string;
  text: string;
  value: string | number | null;
  disabled: boolean;
  name: string;
  type: string;
}

export type CusRadioProps = {
  id: string;
  name: string;
  label: string;
  disabled: boolean;
  formControl: CusRadioItem[];
  value: string;
  onChangeEvent: (e: {
    target: {
      type: string;
      name: string;
      value: string | number | null;
    }
  }) => void;
}

export const CusRadio = (props: CusRadioProps) => {
  const { id, name, formControl, onChangeEvent } = props
  return (
    <FormControl>
      <FormLabel id={id} />
      <RadioGroup
        row
        name={name}
        // 決定哪個值要選起來，這邊先寫死
        value={"Y"}>
        {formControl.map((ele, index) => (
          <FormControlLabel
            key={ele.key + index}
            value={ele.value} // radio的value
            control={<Radio />}
            label={ele.key}
            disabled={ele.disabled}
            onChange={(e) => onChangeEvent({
              target: {
                name: ele.name,
                value: ele.value,
                type: ele.type
              }
            })} />
        ))}
      </RadioGroup>
    </FormControl>
  )
};

export type CusRadioCardItem = {
  key?: string;
  label?: string;
  text?: string;
  value?: string | number | null | undefined;
  disabled?: boolean;
}

export type CusRadioCardProps = {
  label?: string;
  name: string;
  value?: string | number | null | undefined;
  error?: boolean;
  required?: boolean;
  data: CusRadioCardItem[],
  onChangeEvent: (e: HandleInputEvent) => void;
}

const getRadioStyle = () => ({
  clipPath: "inset(100%)",
  height: "1px",
  width: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
})

export const CusRadioCard = (props: CusRadioCardProps) => {
  const { name, data, onChangeEvent, error, required, label, value } = props;
  const [selectedValue, setSelectedValue] = useState<string | number | null | undefined>(value);
  const radioStyle = useMemo(getRadioStyle, []);



  const handleClick = (value: string | number | null | undefined) => {
    setSelectedValue(value);
    onChangeEvent({
      target: {
        name: name,
        label: label,
        value: value,
        type: "Radio",
      }
    })
  };

  return (
    <FormControl error={error ?? false}>
      <RadioGroup row name={name}>
        {data.map((ele) => (
          <FormControlLabel
            sx={{
              margin: "10px 10px 0 0",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "flex-start",
              minWidth: "100px",
              maxWidth: "200px",
              minHeight: "80px",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              position: "relative",
              outline: selectedValue === ele.value ? `2px solid ${Variables[status + "__BtnInfo"]}` : "none",
              border: selectedValue === ele.value ? "none" : "1px solid rgba(0,0,0,0.12)",
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.6)"
              }
            }}
            key={ele.key}
            value={ele.value}
            label={""}
            disabled={ele.disabled}
            control={
              <Box>
                <Radio
                  disabled={ele.disabled}
                  required={required ?? false}
                  sx={radioStyle}
                  checked={selectedValue === ele.value}
                  onChange={() => handleClick(ele.value)} />
                <Box style={{ display: "flex", flexDirection: "column", wordBreak: "break-word" }}>
                  <Typography variant='h6' fontWeight={"bold"}>{ele.label}</Typography>
                  <Typography variant='subtitle1' color={"#cdced1"}>{ele.text}</Typography>
                </Box>
              </Box>
            } />
        ))}
      </RadioGroup>
      <FormHelperText>{error ? label + "必填" : ""}</FormHelperText>
    </FormControl >
  )
};