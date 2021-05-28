import moment from "moment";

export function getPeriod (start, durationInMin) {
    const format = 'H:mm';
    const d1 = moment(start);
    const d2 = moment(d1).add(durationInMin, 'minutes');

    return d1.format(format) + ' - ' + d2.format(format);
}

export function travelTime (duration) {
    const hours = Math.floor(duration /60);
    const minutes = duration - hours * 60;
    return <>{hours}ч {minutes}м</>
}

export function stops (stops) {
    switch(stops) {
        case 0:
            return 'Без пересадок';
        case 1:
            return '1 пересадка';
        default:
            return `${stops} пересадки`;
    }
}