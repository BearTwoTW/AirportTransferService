import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { HandleInputEvent } from "../js/Types";

export type CusSwitchProps = {
    id: string;
    name: string;
    type: string;
    disabled?: boolean;
    checked?: string;
    color: "default" | "error" | "success" | "warning" | "info" | "primary" | "secondary";
    label?: string;
    onChange: (e: HandleInputEvent) => void;
};

export const CusSwitch = (props: CusSwitchProps) => {
    const { id, type, name, disabled, checked, color, label, onChange } = props;
    let BooleanChecked = (checked === "Y" ? true : false)

    const checkInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            target: {
                name: name,
                checked: !BooleanChecked,
                label: label,
                type: type,
            }
        });
    }

    return (
        <React.Fragment>
            {label ?
                <FormGroup>
                    <FormControlLabel
                        sx={{ margin: 0 }}
                        label={label + "：" + (BooleanChecked ? "是" : "否")}
                        control={
                            <Switch
                                disabled={disabled}
                                checked={BooleanChecked}
                                color={color}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkInputData(e)}
                            />
                        }
                    />
                </FormGroup >
                :
                <Switch
                    disabled={disabled}
                    checked={BooleanChecked}
                    color={color}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkInputData(e)}
                />
            }
        </React.Fragment>
    );
};