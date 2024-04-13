export function formatCurrency(value) {
    return '$' + value.toFixed(2);
}

export function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date, template) {
    if (!date instanceof Date || !date) return;
    return date.toLocaleDateString('pt-BR', template);
}

