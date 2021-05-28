import React, {useCallback, useEffect, useState} from 'react';
import Filter from "./components/Filter";
import {Button, ButtonGroup, CircularProgress, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AviaSaleCard from "./components/AviaSaleCard";
import {getAviaSales, getSearchId} from "./actions/aviaSale";
import {useDispatch, useSelector} from "react-redux";
import logo from './assets/logo.svg';
import {Alert, AlertTitle} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        background: '#F3F7FA',
    },
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    list: {
        marginTop: '17px',
        marginBottom: '50px',
    },
    group: {
        width: 500,
        marginLeft: '20px'
    },
    img: {
        padding: '50px 0',
        textAlign: 'center'
    },
    button: {
        color: '#4A4A4A',
        fontStyle: 'normal',
        fontWeight: 550,
        fontSize: '14px',
        lineHeight: '12px'
    },
    error: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const StyledButton = withStyles({
    root: {
        background: 'white',
        height: 48,
        padding: '0 30px',
        width: 250,
        '&:hover': {
            background: "#2196F3",
            border: 0,
            color: '#fff'
        },
        '&:onClick': {
            background: "#2196F3",
            border: 0,
            color: '#fff'
        },
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const App = () => {

    const dispatch = useDispatch()
    const searchId = useSelector(state => state.avia.searchId)
    const tickets = useSelector(state => state.avia.tickets)
    const isFetching = useSelector(state => state.avia.isFetching)
    const isFetchError = useSelector(state => state.avia.isFetchError)
    const classes = useStyles();
    const [sortTickets, setSortTickets] = useState([]);
    const [filter, setFilter] = useState({all: true, without: false, one: false, two: false, three: false})

    const filterTickets = useCallback((arr) => {
        if (Object.keys(filter).every((key) => {
            return filter[key] === false;
        })) {
            return arr;
        }
        return arr.filter((f) => {
            if (filter.all) return f;
            if (filter.without && f.segments[0].stops.length === 0 && f.segments[1].stops.length === 0) return f;
            if (filter.one && f.segments[0].stops.length === 1 && f.segments[1].stops.length === 1) return f;
            if (filter.two && f.segments[0].stops.length === 2 && f.segments[1].stops.length === 2) return f;
            if (filter.three && f.segments[0].stops.length === 3 && f.segments[1].stops.length === 3) return f;
        })
    }, [filter])

    useEffect(() => {
        setSortTickets(filterTickets(tickets).slice(0, 5))
    }, [tickets, filterTickets])

    useEffect(() => {
        dispatch(getSearchId())
    }, [])

    useEffect(() => {
        dispatch(getAviaSales(searchId))
        setSortTickets(tickets)
    }, [searchId])

    const sortByPriceAsc = () => {
        const temp = JSON.parse(JSON.stringify(sortTickets))
        temp.sort((a, b) => a.price > b.price ? 1 : -1)
        setSortTickets(temp)
    }

    const sortByDurationAsc = () => {
        const tem = JSON.parse(JSON.stringify(sortTickets))
        tem.sort((a, b) => b.segments[0].duration + b.segments[1].duration < a.segments[0].duration + a.segments[1].duration ? 1 : -1)
        setSortTickets(tem)
    }

    return (
        <div>
            {isFetchError &&
            <Alert severity="error" className={classes.error}>
                <AlertTitle>Server Error!</AlertTitle>
                Произошла ошибка! — <strong>Пожалуйста, обновите страницу!</strong>
            </Alert>
            }
            <div className={classes.root}>
                <div className={classes.img}>
                    <img src={logo}/>
                </div>
                <div className={classes.main}>
                    <div>
                        <Filter filter={filter} setFilter={setFilter}/>
                    </div>
                    <div className={classes.group}>
                        <div>
                            <ButtonGroup variant="outlined" size="large" aria-label="large outlined button group">
                                <StyledButton className={classes.button} onClick={sortByPriceAsc}>САМЫЙ
                                    ДЕШЕВЫЙ</StyledButton>
                                <StyledButton className={classes.button} onClick={sortByDurationAsc}>САМЫЙ
                                    БЫСТРЫЙ</StyledButton>
                            </ButtonGroup>
                        </div>
                        <div className={classes.list}>
                            {!isFetching ?
                                sortTickets.map((data, index) => {
                                    return <AviaSaleCard key={index} data={data}/>
                                })
                                : <div className={classes.error}>
                                    <CircularProgress/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;