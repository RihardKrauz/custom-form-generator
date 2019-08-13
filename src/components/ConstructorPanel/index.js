import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ConfigPanel from '../ConfigPanel';
import ResultFormPanel from '../ResultFormPanel';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const TabBar = ({value, onChangeTab}) => {
    return (<AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={onChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="constructor-panel"
                    >
                    <Tab label="Item One"  />
                    <Tab label="Item Two"  />
                </Tabs>
            </AppBar>)
}

TabBar.propTypes = {
    onChangeTab: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default function ConstructorPanel() {
    const [tabIndex, setTabIndex] = React.useState(0);

    function changeTab(event, newValue) {
        setTabIndex(newValue);
    }

    return (
        <div className="constructor-panel">
        <TabBar value={tabIndex} onChangeTab={changeTab} />
            <TabPanel value={tabIndex} index={0}>
                <ConfigPanel />
            </TabPanel>
            <TabPanel value={tabIndex} index={1} >
                <ResultFormPanel />
            </TabPanel>
        </div>
    );
}