export const toShortTime = (date: number = 0) => {
    const [h, m] = new Date(date).toTimeString().split(':');
    return `${h}:${m}`;
}

export const randomRange = (range: number) => Math.floor( range * Math.random());