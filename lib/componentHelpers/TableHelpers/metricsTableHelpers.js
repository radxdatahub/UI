const metricsTooltips = {
    'Variables': 'Total number of variables',
    'Harmonizable Variables (Tier 1)': 'Number of variables that can be harmonized according to the Global Codebook',
    'Harmonized Variables (Tier 1)': 'Number of variables that have been harmonized according to the Global Codebook',
    'Harmonizable Variables (Tier 2)': 'Number of variables that can be harmonized according to Tier 2 data dictionaries provided by the DCCs',
    'Harmonized Variables (Tier 2)': 'Number of variables that have been harmonized according to Tier 2 data dictionaries provided by the DCCs'
}

/**
 * Function to create Metrics related Table definitions
 * @param {Array<String>} headerList - Array of all of the headers
 * @param {String} classes - CSS class used
 * @returns Column definitions to use with the general Tanstack table specific to the Metrics reports tables
 */

export function createMetricsColumns(headerList, classes) {
    const tableColumns = [];
    // go through each header and generate tanstack's column definition to pass to the table
    for (const header in headerList) {
        tableColumns.push({
            id: headerList[header],
            accessorKey: headerList[header],
            accessorFn: (props) => props[headerList[header]],
            cell: (props) => (
                <span className={classes.bold}>
                    {headerList[header] === 'Data Size'
                        ? props.getValue() >= 1000
                            ? Math.round((props.getValue() / 1000 + Number.EPSILON) * 100) / 100 + 'GB'
                            : Number.parseFloat((props.getValue() + Number.EPSILON) * 100 / 100).toFixed(1) + 'MB'
                        : props.getValue()}
                </span>
            ),
            header: headerList[header],
            size: headerList[header] === 'Study Name' ? 400 : 170,
            alignLeft: true,
            tooltip: headerList[header] in metricsTooltips ? metricsTooltips[headerList[header]] : null
        });
    }
    return tableColumns;
}

/**
 * Function to create an array of rows to be loaded by the table
 * @param {Array} rows - All of the row data to be sorted out
 * @returns Array containing all of the sorted rows.
 */
export function generateMetricsRows(rows) {
    const tableRows = [];
    for (let i = 0; i <= rows.length - 1; i++) {
        tableRows.push(rows[i]);
    }
    return tableRows;
}
