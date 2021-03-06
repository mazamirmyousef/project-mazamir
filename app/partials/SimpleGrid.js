import React, { useState, useEffect, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, TableContainer, TableSortLabel, LinearProgress, Button, IconButton, Radio } from '@material-ui/core';
import objectPath from 'object-path';
import { dynamicSort } from '../utils/helper'
import ReactDOMServer from 'react-dom/server'

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'



{/* <Grid
filter={filter}
url="/auctionResponse/getItems"
columns={columns}
selectable={true}
onSelectChange={handleSelectChange} /> */}

export default function SimpleGrid(props) {
    const {
        columns,        // mandatory
        data,           // mandatory
        selectable,
        fontSize,
        onSelectChange,
        selectAll,
        setSelectAll,
        selectedItems,
        setSelectedItems,

        singleSelect,
        selected,

        defaultSort,
        fixHeight,
        minWidth,
        rowHeight,
        keyColumn,

        loading,
        noVirtual,
        rowStyle, // function or object {color: '#dd', ...}

    } = props;
    const classes = useStyles2();
    const [records, setRecords] = useState([]);
    const [orderby, setOrderby] = useState(defaultSort);
    const [orderDir, setOrderDir] = useState('asc');
    const [localFilter, setLocalFilter] = useState({}); //filter on each column
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    useEffect(() => {
        //just for test very bad idea if(!data || data.length == 0) return;
        
        let temp = [...data];
        if (localFilter) {
            for (var field in localFilter) {
                if(localFilter[field] == "") continue;
                let col = columns.find(x => x.field == field)
                if(col && col.template){
                    //generate template then remove tag
                    temp = temp.filter(x => {
                        var cellContent = col.template(x);
                        if(typeof cellContent == 'object'){ // jsx object
                            //jsx to string
                            //remove tags
                            let contentString = ReactDOMServer.renderToString(cellContent)
                            return contentString.replace(/(<([^>]+)>)/ig,'').toLowerCase().startsWith(localFilter[field].toLowerCase());
                        }else{ //number or string
                            return (cellContent + '').toLowerCase().startsWith(localFilter[field].toLowerCase())
                        }
                    })
                }else{
                    temp = temp.filter(x => (x[field] + '').toLowerCase().startsWith(localFilter[field].toLowerCase()))
                }
            }
        }

        if (orderby) {
            setRecords(temp.sort(dynamicSort(orderby, orderDir)));
        } else {
            setRecords(temp);
        }

    }, [orderby, orderDir, data, localFilter])



    const getStyle = (index, item) => {
        var style = { backgroundColor: index % 2 ? '#f5f5f5' : 'white' }
        if (rowStyle) {
            let c = rowStyle(item);
            if (c)
                return { ...style, ...c };
        }
        return style;
    }

    const sortHandler = (field) => {
        const isAsc = orderby === field && orderDir === 'asc';
        setOrderDir(isAsc ? 'desc' : 'asc');
        setOrderby(field);
    }

    const localFilterChange = (field, input) => {
        setLocalFilter(prev => {
            var n = { ...prev };
            n[field] = input;
            return n;
        });
    }

    const selectAllHandler = (isChecked) => {
        setSelectedItems([])
        //onSelectChange(-1, isChecked);
        setSelectAll(isChecked);
    }

    const selectHandler = (row, isChecked) => {

        if (isChecked) {
            setSelectedItems([...selectedItems, row[keyColumn]]);
        } else {
            if (selectAll) {
                setSelectAll(false);
                setSelectedItems(records.filter(x => x[keyColumn] != row[keyColumn]).map(x => x[keyColumn]));
            } else {
                setSelectedItems(selectedItems.filter(x => x != row[keyColumn]));
            }
        }

        //onSelectChange(row, isChecked);
    }

    const singleSelectHandler = (row) => {
        onSelectChange(row);
    }

    const cache = new CellMeasurerCache({
        defaultHeight: rowHeight || 24,
        fixedWidth: true,
    });


    const rowRenderer = ({ index, isScrolling, key, style, parent }) => {
        const row = records[index];
        //console.log(row)
        //{ ...getStripedStyle(index)
        let isSelected = false;
        if (singleSelect) {
            isSelected = selected == row[keyColumn];
        } else if (selectable) {
            isSelected = selectAll || (selectedItems && selectedItems.indexOf(row[keyColumn]) > -1);
        }

        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >

                <div key={key} style={{ ...style, ...getStyle(index, row) }} className={classes.row}>
                    {selectable ? (
                        <div key={0} className={classes.cell} style={{ flexBasis: 50 }}>
                            <Checkbox onChange={(event) => { selectHandler(row, event.target.checked) }} checked={isSelected} />
                        </div>) : null}

                    {singleSelect ? (
                        <div key={0} className={classes.cell} style={{ flexBasis: 50 }}>
                            <Radio onChange={(event) => { singleSelectHandler(row, event.target.checked) }} checked={isSelected} />
                        </div>) : null}

                    {columns.filter(x => !x.hidden).map((col, j) => {
                        var cell = null;
                        if (col.template) {
                            cell = col.template(row);
                        } else {

                            //cell = row[col.field];  simple  e.g. title
                            cell = objectPath.get(row, col.field);//   complex e.g. type.title
                        }
                        var style = col.width ? { flex: col.width } : {};
                        if(col.style){
                            if(typeof col.style == 'object')
                                style = {...style, ...col.style};
                            else{
                                var s = col.style(row)
                                style = {...style, ...s};
                            }
                        }
                        return (<div
                            style={{...style, ...col.style}}
                            className={classes.cell}
                            key={j}
                            align={col.align ? col.align : "inherit"}>
                            {cell}
                        </div>);
                    })}

                </div>
            </CellMeasurer>
        )
    }
    const dataBody = useMemo(() => records.map((row, index) => {
        let isSelected = false;
        if (singleSelect) {
            isSelected = selected == row[keyColumn];
        } else if (selectable) {
            isSelected = selectAll || (selectedItems && selectedItems.indexOf(row[keyColumn]) > -1);
        }
        return (
            <div key={index} style={{ ...getStyle(index, row) }} className={classes.row}>
                {selectable ? (
                    <div key={0} className={classes.cell} style={{ flexBasis: 50 }}>
                        <Checkbox onChange={(event) => { selectHandler(row, event.target.checked) }} checked={isSelected} />
                    </div>) : null}

                {singleSelect ? (
                    <div key={0} className={classes.cell} style={{ flexBasis: 50 }}>
                        <Radio onChange={(event) => { singleSelectHandler(row, event.target.checked) }} checked={isSelected} />
                    </div>) : null}

                {columns.filter(x => !x.hidden).map((col, j) => {
                    var cell = null;
                    if (col.template) {
                        cell = col.template(row);
                    } else {

                        //cell = row[col.field];  simple  e.g. title
                        cell = objectPath.get(row, col.field);//   complex e.g. type.title
                    }
                    return (<div
                        style={col.width ? { flex: col.width } : {}}
                        className={classes.cell}
                        key={j}
                        align={col.align ? col.align : "inherit"}>
                        {cell}
                    </div>);
                })}

            </div>
        )
    }
    ), [records])


    return (
        <div className={classes.root} style={{ height: fixHeight || "auto", overflowX: 'auto' }} >
            <div>
                {loading ? <LinearProgress style={{ height: "2px" }} /> : null}
            </div>
            <div className={classes.headerRow + " " + classes.header} style={{ minWidth: minWidth || '700px' }}>
                {selectable && setSelectAll ? (<div key={0} className={classes.cell} style={{ flexBasis: 50 }} >
                    <Checkbox onChange={(event) => selectAllHandler(event.target.checked)} checked={selectAll} />
                </div>) : null}

                {selectable && !setSelectAll ? (<div key={0} className={classes.cell} style={{ flexBasis: 50 }} >
                </div>) : null}

                {singleSelect ? (<div key={0} className={classes.cell} style={{ flex: 50 }} >&nbsp;</div>) : null}

                {columns.filter(x => !x.hidden).map((col, i) =>
                    <div
                        key={i}
                        align={col.align ? col.align : "inherit"}
                        style={col.width ? { flex: col.width } : {}}
                        className={classes.cell + ' ' + (col.filterable ? classes.headerCellWithFilter : '')}>
                        {col.sortable ?
                            (
                                <TableSortLabel
                                    style={{ flexDirection: 'row' }}
                                    active={orderby && orderby === col.field}
                                    direction={orderby === col.field ? orderDir : 'asc'}
                                    onClick={() => sortHandler(col.field)}
                                >
                                    {col.title}
                                </TableSortLabel>
                            )
                            :
                            <>
                                {col.title}
                            </>
                        }
                        {col.filterable &&
                            <div className={classes.filterInputCon}>
                                <input className={classes.filterInput} type="text" onChange={(e) => localFilterChange(col.field, e.target.value)} />
                            </div>
                        }
                    </div>
                )}
                <div style={{ flexBasis: "18px" }}>
                    {/* for scroll bar  */}
                        &nbsp;
                </div>
            </div>
            {records.length == 0 && !loading &&
                (<div className="kt-align-center">
                    No item found!
                </div>)}
            <div style={{ flexGrow: '1', fontSize: fontSize, minWidth: minWidth || '700px' }}>
                {noVirtual && dataBody}
                {!noVirtual && <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            width={width - 1}
                            rowCount={records.length}
                            rowHeight={rowHeight || cache.rowHeight}
                            rowRenderer={rowRenderer}
                            deferredMeasurementCache={cache}
                        />
                    )}
                </AutoSizer>
                }
            </div>
        </ div >
    );
}




//table
const useStyles2 = makeStyles({
    root: {
        border: "1px solid #e0e0e0",
        overflowY: 'hidden',
        //overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '& div.ReactVirtualized__Grid': {
            direction: 'ltr !important',
            overflowY: 'scroll !important'
        }
        //minWidth: '400px'
        //paddingTop: '' // for header
    },
    table: {
        //minWidth: 500,
    },
    loader: {
        position: "absolute",
        bottom: 10,
        left: 20
    },
    header: {
        fontSize: "0.8rem",
        fontWeight: "bold",
        background: "rgb(236,236,236)",
        background: "linear-gradient(0deg, rgba(236,236,236,1) 0%, rgba(250,250,250) 60%, rgba(242,242,242,1) 100%)",
    },
    headerCell: {
        lineHeight: '1rem',
    },
    headerCellWithFilter: {
        paddingBottom: '25px !important',
        lineHeight: '1rem',
        position: 'relative',
    },
    syncBtn: {
        position: "absolute",
        left: "10px"
    },
    stickyFooter: {
        position: "sticky",
        bottom: 0,
        zIndex: 2
    }
    , filterInputCon: {
        position: 'absolute',
        bottom: '2px'
    }
    , filterInput: {
        width: '90%',
        height: '20px',
        borderRadius: '4px',
        border: '1px solid #dedcdc'
    },
    headerRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        flex: 0,
        color: '#000000'
        // width:'100%',
        // position: 'absolute',
        // top:'0px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        borderTop: '1px solid #dcdcdc',
        color: '#000000'
    },
    cell: {
        //fontSize: '0.9rem',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        justifyContent: 'center',
        color: '#000', //may change dynamicly
        //flex: '1 1'
    }
});