import Papa from 'papaparse';

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
    const parsedDate = new Date(date);
    if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return null;

    const dateNow = new Date();
    const diff = (dateNow - parsedDate) / (1000 * 60 * 60 * 24);
    return Math.floor(diff);
}

export function calculateSecar(date) {
    const parsedDate = new Date(date);
    if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) return null;

    parsedDate.setDate(parsedDate.getDate() - 60);
    return new Date(parsedDate);
}

export function parseFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = (e) => {
            const content = e.target.result;
            const result = Papa.parse(content, { skipEmptyLines: true });
            resolve(result.data);
        };

        reader.onerror = (e) => {
            reject(e);
        };
    });
}
