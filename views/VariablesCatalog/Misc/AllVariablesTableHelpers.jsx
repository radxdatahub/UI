import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();
export const allVarCols = [
    {
        id: 'RADx Program',
        accessorKey: 'RADx Program',
        cell: (info) => info.getValue(),
        header: 'RADx Program',
        alignLeft: true,
        size: 40,
    },
    {
        id: 'Study Name',
        accessorKey: 'Study Name',
        cell: ({ row }) => {
            return (
                <a target="_blank" rel="noreferrer noopener" href={`/study/${row.original['Study ID']}`}>
                    {row.original['Study Name']}
                </a>
            );
        },
        header: 'Study Name',
        alignLeft: true,
        size: 80,
    },
    {
        id: 'dbGaP ID',
        accessorKey: 'dbGaP ID',
        cell: ({ row }) => {
            return (
                <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${row.original['dbGaP ID']}`}
                >
                    {row.original['dbGaP ID']}
                </a>
            );
        },
        header: 'dbGaP Study Accession',
        alignLeft: true,
        size: 35,
    },
    {
        id: 'File Name',
        accessorKey: 'File Name',
        cell: (info) => info.getValue(),
        header: 'File Name',
        alignLeft: true,
        size: 90,
    },
    columnHelper.accessor((row) => row['Data Variable'][0]['Variables'], {
        id: 'Data Variable',
        header: 'Variables',
        cell: (info) => info.getValue(),
        alignLeft: true,
        size: 200,
    }),
];
