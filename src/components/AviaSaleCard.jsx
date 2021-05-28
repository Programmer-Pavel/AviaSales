import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Grid} from "@material-ui/core";
import {getPeriod, stops, travelTime} from "../utils/helper";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: '17px',
        paddingLeft: '20px',
        paddingRight: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    imageAndPrice: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
    },
    body: {
        display: 'flex',
        marginTop: '10px'
    },
    group: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '10px'
    },
    cover: {
        height: 40,
        width: 120,
    },
    label: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '12px',
        color: '#A0B0B9'
    },
    item: {
        marginTop: '8px',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '12px',
        color: '#4A4A4A'
    },
    price: {
        marginTop: '8px',
        color: "#2196F3",
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: '24px',
        lineHeight: '24px'
    }
});

export default function AviaSaleCard({data}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.imageAndPrice}>
                    <div>
                        <div className={classes.price}>{data.price} Р</div>
                    </div>
                    <div>
                        <img
                            className={classes.cover}
                            src={`https://pics.avs.io/99/36/${data.carrier}.png`}
                        />
                    </div>
                </div>
                {data.segments.map((d, index) => {
                    return <Grid container spacing={3} key={index}>
                        <Grid item xs>
                            <div className={classes.label}>{d.origin}-{d.destination}</div>
                            <div className={classes.item}>{getPeriod(d.date, d.duration)}</div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.label}>В ПУТИ</div>
                            <div className={classes.item}>{travelTime(d.duration)}</div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.label}>{stops(d.stops.length)}</div>
                            <div className={classes.item}>{d.stops.join(', ')}</div>
                        </Grid>
                    </Grid>
                })}
            </CardContent>
        </Card>
    );
}
