export function dateDiff(data) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date();
    const b = data.toString().split('T')[0];
    const b1 = new Date(b);
    const utc2 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc1 = Date.UTC(b1.getFullYear(), b1.getMonth(), b1.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) === 0
        ? 'Today'
        : Math.floor((utc2 - utc1) / _MS_PER_DAY) === 1
            ? 'Yesterday'
            : Math.floor((utc2 - utc1) / _MS_PER_DAY) + ' ' + 'days ago';
}

export function convertDate(value) {
    let date = new Date(value);
    let final = date.toDateString();
    return final;
}

export  function favouriteExists(id, favourites) {
    return favourites.some(function(el) {
        return el.id === id;
    });
}

