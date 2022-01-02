import React, { useState, useRef } from "react"
import Grid from "../partials/grid"
import { DeleteButton, EditButton } from "../partials/content/UIHelper";
import { Portlet, PortletHeader, PortletHeaderToolbar, PortletBody } from "../partials/content/Portlet";
import { makeStyles } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form'
import GenModal from "../partials/modal";
import baseService from "../services/base.service";
import { useDispatch } from "react-redux";
import { loaderActions } from "../store/ducks/loader.duck";
import { snackbarActions } from "../store/ducks/snackbar.duck";
import Alert from "@material-ui/lab/Alert";
import confirmService from "../partials/content/ConfirmService";
import objectPath from "object-path";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ShowMoreModal from "./ShowMoreModal";
import { MoreVert } from "@material-ui/icons";
import { passIdsActions } from "../store/ducks/passIds.duck";
import { useSelector } from "react-redux";

const PopupCurd = (props) => {

    const { title, columns, urls, form, searchForm, key, initFormValues, backButton, moreColumn } = props
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10
    });
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formError, setFormError] = useState("");
    const [showMoreModal, setShowMoreModal] = useState(false);
    //const [formValues, setFormValues] = useState();
    const [editMode, setEditMode] = useState(false);
    const [moreData, setmoreData] = useState();
    const searchMethods = useForm();
    const formMethods = useForm();
    let history = useHistory();
    const classes = useStyle();

    const formRef = useRef();

    const dispatch = useDispatch();

    const selectValue = useSelector((state) => state.passIds.fetchSelectData);
    const selectTax = useSelector((state) => state.passIds.fetchSelectTax);
    const selectTax2 = useSelector((state) => state.passIds.fetchSelectTax2);

    const editHandler = (item) => {
      //  debugger;
        console.log("editHandler",item)
        setEditMode(true);
        setModalTitle("به روز رسانی");

        if (urls.getUrl) { //which means data is complexer than grid data and needs to be fetch
            dispatch(loaderActions.show())
            baseService.post(urls.getUrl, { id: item.SRL }).then(res => {

                //setFormValues(res.data);
                formMethods.reset(res.data)
                 
                dispatch(loaderActions.hide())
                setShowModal(true);
            });
        } else {
            //setFormValues(item);
            formMethods.reset({ ...item })
            dispatch(passIdsActions.fetchFormData(item));
            setShowModal(true);
        }
    }

    const showMoreHandler = (item) => {
        setmoreData(item)
        setShowMoreModal(true);
    }

    const deleteHandler = (item) => {
        confirmService.show("آیا از حذف اطمیان دارید؟").then(isConfirmed => {

            if (isConfirmed) {
                dispatch(loaderActions.show())
                baseService.post(urls.deleteUrl, { Id: item.SRL }).then((result) => {
                    if (result.succeed) {
                        setShowModal(false);
                        dispatch(snackbarActions.success("با موفقیت حذف شد"))
                        forceGridUpdate();

                    } else {
                        setFormError(result.errorMessage);
                    }
                    dispatch(loaderActions.hide())
                })
            }

        });


    }

    const searchHandler = (data) => {
        setFilter(prev => ({
            page: 1,
            pageSize: prev.pageSize,
            ...data
        }));
    }

    const formSubmitHandler = (data) => {
        console.log("formSubmitHandler",data);

        var url = editMode ? urls.editUrl : urls.createUrl;
        setFormError(null);
        dispatch(loaderActions.show())
        if(selectValue !== undefined || selectTax !== undefined || selectTax2 !== undefined ){
            Object.assign(data, {
                "GASUBA_GAMAIN_SRL4" : selectValue,
                "TAX1_GASUBA_GAMAIN_SRL" : selectTax,
                "TAX2_GADETL_SRL" : selectTax2 
              });
        }
        
        baseService.post(url, data).then((result) => {

            if (result.succeed) {
                setShowModal(false);
                dispatch(snackbarActions.success("با موفقیت ثبت شد"))
                forceGridUpdate();

            } else {
                setFormError(result.errorMessage);
            }
            dispatch(loaderActions.hide())

        })
    }
    const addNewHandler = () => {
       // debugger;
        let initVal = { ...initFormValues };
        let k = key ? key : "id";
        objectPath.set(initVal, k, 0);//null id => server validation error
        //setFormValues(initVal);
        formMethods.reset(initVal)
        setFormError(null);

        setEditMode(false);
        setModalTitle("ثبت مورد جدید");
        setShowModal(true);
    }

    const modalConfirmHandler = () => {
        //تا وقتی فرم معتبر نباشد همه ورودی ها صدا زده نمیشود
        formRef.current.dispatchEvent(new Event('submit'));
    }


    const forceGridUpdate = () => {
        setFilter(prev => ({ ...prev }));
    }



    let finalColumns = [...columns]

    if (urls.editUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    <EditButton onClick={() => editHandler(item)} />
                </>
            ),
            width: 100
        })
    }
    if (urls.deleteUrl) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    <DeleteButton onClick={() => deleteHandler(item)} />
                </>
            ),
            width: 100
        })
    }


    if (moreColumn) {
        finalColumns.push({
            title: "",
            template: (item) => (
                <>
                    <IconButton style={{ float: "left" }} size="small" onClick={() => showMoreHandler(item)} component="span">
                        <MoreVert />
                    </IconButton>
                </>

            ),
            width: 10
        })
    }

    return (
        <>

            <ShowMoreModal
                moreColumn={moreColumn}
                data={moreData}
                isShow={showMoreModal}
                onClose={() => setShowMoreModal(false)} />

            <Portlet>
                <PortletHeader
                    title={title}
                    toolbar={
                        (
                            <PortletHeaderToolbar>
                                <Button
                                    onClick={addNewHandler}
                                    variant="success"
                                >
                                    <i className="fa fa-plus" />
                                    ثبت مورد جدید
                            </Button>
                            </PortletHeaderToolbar>
                        )}

                />

                <PortletBody>

                    {searchForm && (
                        <FormProvider  {...searchMethods}>
                            <form onSubmit={searchMethods.handleSubmit(searchHandler)} className={classes.form}>
                                {searchForm}
                            </form>
                        </FormProvider >
                    )}

                    <Grid
                        GetId={urls.GetId}
                        filter={filter}
                        url={urls.readUrl}
                        columns={finalColumns}
                    />
                </PortletBody>
            </Portlet>

            <GenModal
                title={modalTitle}
                isShow={showModal}
                onDismiss={() => setShowModal(false)}
                onConfirm={modalConfirmHandler}>
                {formError && (
                    <Alert severity="error">{formError}</Alert>
                )}

                {backButton ?
                    <div className="clearfix" style={{ padding: '.5rem' }}>
                        <button onClick={() => history.goBack()} className="btn btn-warning float-right">
                            <i className="fa fa-angle-right" />
                                بازگشت
                                </button>
                    </div>
                    :
                    null
                }

                {/* values={formValues} */}
                <FormProvider {...formMethods}>
                      
                    <form onSubmit={formMethods.handleSubmit(formSubmitHandler)} ref={formRef} >
                        {form(formMethods)}
                    </form>
                </FormProvider >

            </GenModal >
        </>
    );
}

const useStyle = makeStyles({
    form: {
        marginBottom: "10px"
    }
})

export default PopupCurd;