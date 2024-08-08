/* eslint-disable max-len */
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Card from '../../components/Card/Card';
import classes from './Playground.module.scss';
import NavigationBar from '../../components/CoreLayout/NavBar/NavBar';
import QueryBuilder from '../../components/QueryBuilder/QueryBuilder';
import BarGraph from '../../components/Infographics/Bar Graph/BarGraph';
import Button from '../../components/Button/Button';
import PieGraph from '../../components/Infographics/Pie Graph/PieGraph';
import ScatterGraph from '../../components/Infographics/ScatterGraph/ScatterGraph';
import Table from '../../components/Table/Table';
import SearchResultViewToggle from '../../components/Toggle/SpecificToggles/SearchResultViewToggle/SearchResultViewToggle';

/*
 */

//TODO: <NavigationBar activeTab={NavParams.activeTab} tabList={NavParams.tabList} setTab={setView} />
// Toss this somewhere

const Playground = (props) => {
    const tableColumns = [
        {
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
        },
        {
            id: 'lastName',
            accessorKey: 'lastName',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
        },
    ];

    const tableData = [
        {
            firstName: 'tanner',
            lastName: 'linsley',
        },
        {
            firstName: 'tandy',
            lastName: 'miller',
        },
        {
            firstName: 'joe',
            lastName: 'dirte',
        },
    ];

    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
    ];
    const initialQuery = {
        combinator: 'and',
        rules: [
            { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
            { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
        ],
    };
    // <BarGraph tabIndex="0" data={data} variant="infograph" title="title here" ariaText="some text about a graph" />
    const data = { labels: ['1', '2', '3', '4', '5'], datasets: [{ label: '', id: 1, data: [12, 6, 5, 8, 10] }] };

    //
    const dataPie = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataScatter = {
        datasets: [
            {
                label: 'A dataset',
                data: [
                    { x: 2, y: 8 },
                    { x: 1, y: 9 },
                    { x: 16, y: 8 },
                    { x: 8, y: 3 },
                    { x: 2, y: 5 },
                ],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };
    const [table, setTable] = useState('table');
    const [query, setQuery] = useState(initialQuery);
    return (
        <>
            <Container className={classes.Container}>
                <Card className={classes.Card}>
                    <div>
                        <ScatterGraph
                            tabIndex="0"
                            data={dataScatter}
                            variant="infograph"
                            title="title here"
                            ariaText="some text about a graph"
                        />
                    </div>
                    <Button label={'Select All'} variant={'primary'} size={'medium'} rounded />
                    <Col lg={4}>
                        <BarGraph
                            tabIndex="0"
                            data={data}
                            variant="infograph"
                            title="title here"
                            ariaText="some text about a graph"
                            size="medium"
                        />
                    </Col>
                    <SearchResultViewToggle setToggleState={setTable} toggleState={table} />
                    <Table tableRows={tableData} tableHeaders={tableColumns} />
                </Card>
            </Container>
        </>
    );
};

Playground.propTypes = {};

export default Playground;
