import { Box } from '@mui/material';

const WebTabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (<Box>{children}</Box>)}
    </div>
  );
}
export { TabPanel }