class DateFormat{
    formatDate(date){
        const region = 'es-ES';
        const timeFormat = { day : '2-digit', month : 'short', year : 'numeric' };

        return new Intl.DateTimeFormat(region, timeFormat).format(new Date(Date.parse(date)))
    }
}

export default new DateFormat();