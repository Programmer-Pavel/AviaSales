import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    withStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    checkbox_container: {
        '&:hover': {
            background: "#F1FCFF",
            border: 0,
        },
    },
    paper: {
        margin: 'auto',
        maxWidth: 500,
    },
    formLabel: {
        margin: 20,
        marginBottom: 5,
        color: '#4A4A4A',
        fontStyle: 'normal',
        fontWeight: 550,
        fontSize: '14px',
        lineHeight: '12px'
    },
    formControl: {
        marginTop: 20,
    },
    labelText: {
        margin: '0 -20px'
    }
}))

const Styled = withStyles({
    root: {
        margin: 0
    },
    label: {
        textTransform: 'capitalize',
    },
})(FormControlLabel);

export default function Filter({filter, setFilter}) {
    const classes = useStyles();

    const allHandler = () => {
        if (!filter.all) {
            setFilter({all: true, without: true, one: true, two: true, three: true})
        } else {
            setFilter({all: false, without: false, one: false, two: false, three: false})
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel className={classes.formLabel} component="legend">КОЛИЧЕСТВО ПЕРЕСАДОК</FormLabel>
                    <ListItem role={undefined} dense button onClick={() => allHandler()}>
                        <ListItemIcon>
                            <FormControlLabel
                                control={<Checkbox name="gilad"
                                                   color="primary"
                                                   onChange={() => allHandler()}
                                                   checked={filter.all}/>}
                                className={classes.checkbox_container}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.labelText} primary='Все'/>
                    </ListItem>
                    <ListItem role={undefined} dense button
                              onClick={() => setFilter({...filter, without: !filter.without})}>
                        <ListItemIcon>
                            <FormControlLabel
                                control={<Checkbox name="gilad"
                                                   color="primary"
                                                   onChange={() => setFilter({...filter, without: !filter.without})}
                                                   checked={filter.without}/>}
                                className={classes.checkbox_container}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.labelText} primary='Без пересадок'/>
                    </ListItem>
                    <ListItem role={undefined} dense button onClick={() => setFilter({...filter, one: !filter.one})}>
                        <ListItemIcon>
                            <FormControlLabel
                                control={<Checkbox name="gilad"
                                                   color="primary"
                                                   onChange={() => setFilter({...filter, one: !filter.one})}
                                                   checked={filter.one}/>}
                                className={classes.checkbox_container}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.labelText} primary='1 пересадка'/>
                    </ListItem>
                    <ListItem role={undefined} dense button onClick={() => setFilter({...filter, two: !filter.two})}>
                        <ListItemIcon>
                            <FormControlLabel
                                control={<Checkbox name="gilad"
                                                   color="primary"
                                                   onChange={() => setFilter({...filter, two: !filter.two})}
                                                   checked={filter.two}/>}
                                className={classes.checkbox_container}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.labelText} primary='2 пересадки'/>
                    </ListItem>
                    <ListItem role={undefined} dense button
                              onClick={() => setFilter({...filter, three: !filter.three})}>
                        <ListItemIcon>
                            <FormControlLabel
                                control={<Checkbox name="gilad"
                                                   color="primary"
                                                   onChange={() => setFilter({...filter, three: !filter.three})}
                                                   checked={filter.three}/>}
                                className={classes.checkbox_container}
                            />
                        </ListItemIcon>
                        <ListItemText className={classes.labelText} primary='3 пересадки'/>
                    </ListItem>
                </FormControl>
            </Paper>
        </div>
    );
}
