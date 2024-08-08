import Link from 'next/link';
import { dateFormatter } from '../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const submissionsTableColumns = [
    {
        id: 'id',
        accessorKey: 'id',
        cell: (info) => {
            return <Link href={`/studyFileSubmissions/${info.getValue()}`} legacyBehavior>{`#${info.getValue()}`}</Link>;
        },
        header: 'ID',
        size: 80,
    },
    {
        id: 'studyName',
        accessorKey: 'studyName',
        cell: (info) => info.getValue(),
        header: 'Study Name',
        alignLeft: true,
        size: 250,
    },
    {
        id: 'phs',
        accessorKey: 'phs',
        cell: (info) => info.getValue(),
        header: 'PHS ID',
        alignLeft: true,
        size: 120,
    },
    {
        id: 'DCC',
        accessorKey: 'dcc',
        cell: (info) => info.getValue(),
        header: 'DCC',
        alignLeft: true,
        size: 110,
    },
    {
        id: 'DCCRep',
        accessorKey: 'dccrepresentative',
        cell: (info) => info.getValue(),
        header: '(C)DCC Representative',
        alignLeft: true,
        size: 200,
    },
    {
        id: 'submissionDate',
        accessorKey: 'submissionDate',
        cell: (info) => dateFormatter(info.getValue()),
        header: 'Submission Date',
        alignLeft: true,
        size: 150,
    },
];
