import React from 'react';
import {Button, Col, Table} from "react-bootstrap";
import {Scrollbars} from "rc-scrollbars";


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};

const ModerationTable = (props) => {
    const {items, requestSort, sortConfig} = useSortableData(props.comments);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <Table>
            <thead>
            <tr>
                <th>

                    <Button
                        type="button"
                        onClick={() => requestSort('date')}
                        className={getClassNamesFor('date')}
                    >

                        {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                        {/*     className="bi bi-caret-down-fill" viewBox="0 0 16 16">*/}
                        {/*    <path*/}
                        {/*        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>*/}
                        {/*</svg>*/}
                        Дата
                    </Button>
                </th>
                <th>
                    <Button
                        type="button"
                        onClick={() => requestSort('text')}
                        className={getClassNamesFor('text')}
                    >
                        Комментарий
                    </Button>
                </th>
                <th>
                    <Button
                        type="button"
                        onClick={() => requestSort('postVkId')}
                        className={getClassNamesFor('postVkId')}
                    >
                        Id поста
                    </Button>
                </th>
            </tr>
            </thead>

            <tbody className="text_color">

            {items.map((line) => (
                <tr key={line.id}>
                    <td>{new Date(line.date*1000).getDate()+'/'+(new Date(line.date*1000).getMonth()+1)+'/'+ new Date(line.date*1000).getFullYear()}</td>
                    <td>{line.text}</td>
                    <td>{line.postVkId}</td>
                </tr>
            ))}

            </tbody>

        </Table>
    );
};

export default ModerationTable;
