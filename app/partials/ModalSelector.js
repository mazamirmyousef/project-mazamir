import React, { useRef, useState } from "react"
import GenModal from "./modal";
import Grid from "./grid";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from "react-bootstrap";
import InputText from "./editors/InputText";
const ModalSelector = props => {

    const {
        isShow,
        title,
        classes,
        size,
        onConfirm,
        onDismiss,
        keyColumn,
        singleSelect,
        columns, url, searchForm, initFilter } = props

    const [filter, setFilter] = useState(initFilter);
    const [selected, setSelected] = useState(singleSelect ? null : []);
    const searchMethodsw = useForm();

    const selectHandler = (item, isCheck) => {
        if (singleSelect) {
            if (isCheck) {
                setSelected(item)
            } else {
                setSelected(null)
            }
        } else {
            if (isCheck) {
                setSelected(prev => [...prev, item[keyColumn]])
            } else {
                setSelected(prev => prev.filter(x => x[keyColumn] !== item[keyColumn]))
            }
        }
    }

    const searchHandlerw = (searchData) => {
        setFilter(prev => ({ ...prev, ...searchData }))
    }

    const confirmHandler = () => {
        onConfirm(selected);
        onDismiss();
    }

    const inputRef = useRef();

    const submitSearch = (e) => {
        let name = inputRef.current.value
        setFilter(prev => ({ ...prev, name }))

    }
    return (
        <>
            <GenModal
                classes={classes}
                title={title}
                size={size}
                isShow={isShow}

                onConfirm={confirmHandler}
                onDismiss={onDismiss}
            >

                {/* <input ref={inputRef} />
        <button onClick={submitHandlerr}>Submit</button> */}

                {/* {searchForm && (
                    <FormProvider {...searchMethodsw}>
                        <form onSubmit={searchMethodsw.handleSubmit(searchHandlerw)}>
                            {searchForm}
                        </form>
                    </FormProvider>
                )}   */}
                {searchForm && (
                    <Row className='searchSection'>
                        <Col md={4}>
                            <TextField
                                name="name"
                                className='searchInput'
                                label="شماره یا عنوان"
                                inputRef={inputRef} variant="outlined" />

                        </Col>
                        <Col sm={2}>
                            <Button
                                className="btn btn-btn btn-outline-dark"
                                variant="outline-primary"
                                onClick={submitSearch} >
                                <i class="fa fa-search"></i>
                                جستجو
                            </Button>
                        </Col>
                    </Row>
                )}

                <Grid
                    columns={columns}
                    url={url}
                    filter={filter}
                    selectable={true}
                    selectedItems={selected}
                    keyColumn={keyColumn}
                    singleSelect={singleSelect}
                    onSelectChange={selectHandler}
                    fixHeight="400px"
                />
            </GenModal>
        </>
    );
}

ModalSelector.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    keyColumn: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default ModalSelector;

