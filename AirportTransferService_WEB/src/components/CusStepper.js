import React, { useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Grid, Typography } from '@mui/material';
import { CusTextButton } from './CusButton';

const CusVerticalLinearStepper = (props) => {
  let { steps, nowStep, handleNextEvent, handleBackEvent, content } = props
  const [activeStep, setActiveStep] = React.useState(nowStep);

  const handleNext = async (e) => {
    const result = await handleNextEvent(e, parseInt(activeStep + 1), activeStep);
    if (!result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleBackEvent(e, parseInt(activeStep - 1))
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            {content}
            <Grid item xs={12} sx={{ mb: 2, display: "flex", justifyContent: "end" }}>
              <CusTextButton
                sx={{ mt: 1, mr: 1 }}
                disabled={index === 0}
                variant="primary"
                text={"返回"}
                onClick={handleBack}
              />
              {index === steps.length - 1 ? "" :
                (<CusTextButton
                  sx={{ mt: 1, mr: 1 }}
                  variant="primary"
                  text={"下一步"}
                  onClick={(e) => handleNext(e)}
                />)}
            </Grid>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

const CusVerticalLinearStepper1 = (props) => {
  let { steps, nowStep, content, error } = props
  const [activeStep, setActiveStep] = React.useState(nowStep);

  useEffect(() => {
    setActiveStep(nowStep)
  }, [nowStep]);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => {
        const labelProps = {};
        if (error) {
          labelProps.optional = (
            <Typography variant="caption" color="error">
              資訊尚未填寫完整
            </Typography>
          );
          labelProps.error = true;
        }
        return (
          <Step key={index}>
            {index === nowStep ?
              <StepLabel {...labelProps}>{step.label}</StepLabel>
              : <StepLabel>{step.label}</StepLabel>}
            <StepContent>{content}</StepContent>
          </Step>
        )
      })}
    </Stepper>
  );
}


export {
  CusVerticalLinearStepper,
  CusVerticalLinearStepper1
}