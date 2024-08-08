import { Trash } from 'react-bootstrap-icons';
import EditIcon from '../../../components/Images/svg/EditIcon';
import classes from './StudyRegistrationDash.module.scss';
import { dateFormatter } from '../../../lib/componentHelpers/SupportFunctions/dateFormatter';

export const studyRegistrationTableColumns = (userRole, handleEdit, handleDelete, selectedItem) => {
    let tableColumns;

    tableColumns = [
        {
            id: 'phs',
            accessorKey: 'phs',
            cell: (info) => info.getValue(),
            header: 'PHS',
            alignLeft: true,
            size: 120,
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
            id: 'status',
            accessorKey: 'status',
            cell: (info) => info.getValue(),
            header: 'Status',
            alignLeft: true,
            size: 120,
        },
        {
            id: 'createdAt',
            accessorKey: 'createdAt',
            cell: (info) => dateFormatter(info.getValue(), 'US Date'),
            header: 'Created Date',
            alignLeft: true,
            size: 120,
        },
    ];
    if (userRole === 'curator') {
        tableColumns.push({
            id: 'edit',
            accessorKey: '',
            cell: (info) => (
                <button type="button" className={classes.editIcon} onClick={() => handleEdit(userRole, info.row.original.studyId)}>
                    <EditIcon />
                </button>
            ),
            header: 'Edit',
            size: 80,
        });
        tableColumns.push({
            id: 'delete',
            accessorKey: '',
            cell: (info) => (
                <button type="button" className={classes.deleteIcon} onClick={() => handleDelete(info.row.original.studyId)}>
                    <Trash />
                </button>
            ),
            header: 'Delete',
            size: 80,
        });
    }
    if (userRole === 'dcc' && selectedItem.label === 'Pending DCC Input') {
        tableColumns.push({
            id: 'edit',
            accessorKey: '',
            cell: (info) => (
                <button type="button" className={classes.editIcon} onClick={() => handleEdit(userRole, info.row.original.studyId)}>
                    <EditIcon />
                </button>
            ),
            header: 'Edit',
            size: 80,
        });
    }

    return tableColumns;
};
