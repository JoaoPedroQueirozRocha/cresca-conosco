export function formatCurrency(value) {
    if (isNaN(Number(value))) return '$' + (0).toFixed(2);
    value = Number(value);
    return '$' + value.toFixed(2);
}

export function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date, template) {
    if (!date instanceof Date || !date) return;
    return date.toLocaleDateString('pt-BR', template);
}

export function formatDateString(date) {
    const convertToDate = new Date(date);
    return convertToDate.toLocaleDateString();
}

export function getColor(status) {
    switch (status) {
        case 'falhou':
            return 'red';
        case 'pendente':
            return 'yellow';
        case 'confirmada':
            return 'blue';
        case 'concluida':
            return 'green';
        default:
            return 'gray';
    }
}

export function csvExport(data, name) {
    let content = 'data:text/csv;charset=utf-8,';
    content += [
        Object.keys(data[0]).join(','), ...data.map((item) => Object.values(item).join(','))
    ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');

    const eData = encodeURIComponent(content);
    const link = document.createElement('a');
    link.setAttribute('href', eData);
    link.setAttribute('download', `${name || 'export'}.csv`);
    link.click();
}

export function calculateDaysInsem(date) {
    const dateInsem = date !== null ? new Date(date) : null;
    if (dateInsem) {
        const dateNow = new Date();
        const diff = (dateNow - dateInsem) / (1000 * 60 * 60 * 24);
        return Math.floor(diff);
    }
    return null;
}

export function calculateSecar(date) {
    const dataPrevParto = date !== null ? new Date(date) : null;
    if (dataPrevParto) {
        const dataSecar = dataPrevParto.setDate(dataPrevParto.getDate() - 60);
        return dataSecar;
    }
    return null;
}

