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

