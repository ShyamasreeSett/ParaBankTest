import * as XLSX from 'xlsx';

export function readExcel(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];

    // Cast options to 'any' to bypass TS error
    const options: any = {defval: ''};

    return XLSX.utils.sheet_to_json(worksheet, options);
}
