import { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Variables from "../scss/App.css";
const status = sessionStorage.getItem("themeStatus") === null ? "LightON" : sessionStorage.getItem("themeStatus");

const CusRadio = (props) => {
    return (
        <FormControl>
            <FormLabel id={props.id} />
            <RadioGroup
                row
                name={props.name}
                value={"Y"} // 決定哪個值要選起來，這邊先寫死
            >
                {props.formControl.map((ele, index) => (
                    <FormControlLabel
                        key={ele.key + index}
                        value={ele.value} // radio的value
                        control={<Radio />}
                        label={ele.key}
                        disabled={ele.disabled}
                        onChange={props.onChangeEvent}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
};

CusRadio.defaultProps = {
    id: "",
    name: "",
    label: "",
    disabled: false,
    formControl: [],
    value: ""
};

CusRadio.prototype = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    formControl: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const CusRadioCard = (props) => {
    const { name, data } = props;
    const [selectedValue, setSelectedValue] = useState(null);

    const radioStyle = {
        clipPath: "inset(100%)",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
    }

    const handleClick = (value) => {
        setSelectedValue(value);
    };

    return (
        <FormControl>
            <RadioGroup row name={name}>
                {data.map((ele, index) => (
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
                            },
                        }}
                        key={ele.key}
                        value={ele.value}
                        label={""}
                        control={
                            <Box>
                                <Radio
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
        </FormControl >
    )
};

CusRadioCard.defaultProps = {

};

CusRadioCard.prototype = {

};

export {
    CusRadio,
    CusRadioCard
}