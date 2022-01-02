import React, { useEffect, useState } from "react";
import PopupCurd from "../../../../template/PopupCrud";
import InputHidden from "../../../../partials/editors/InputHidden";
import { Row, Col, Button } from "react-bootstrap";
import InputSelect from "../../../../partials/editors/InputSelect";
import InputSelectHandleChange from "../../../../partials/editors/Custom/InputSelectHandleChange";
import InputModal from "../../../../partials/editors/InputModal";
import SimpleInputHidden from "../../../../partials/editors/SimpleInputHidden";
import { Button as MatBtn } from "@material-ui/core";
import { connect } from "react-redux";
import baseService from "../../../../services/base.service";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../../../../store/ducks/snackbar.duck";

const SaleAmaniDocument = (props) => {
    const { formData } = props
    const [RecType, setRecType] = useState([]);
    const [CarType, setCarType] = useState([]);
    const dispatch = useDispatch();


    const columns = [
        {
            field: "SRL",
            title: "سريال",
            width: 150
        },
        {
            field: "REC_TYP_TRUST",
            title: "شناسه فروش",
            width: 150
        },
        {
            field: "CAR_GRP_DESC",
            title: "نوع خودرو",
            width: 150
        },
        {
            field: "GADET_BED_TYP_DES",
            title: "نوع تفصيلي بدهكار",
            width: 150
        },
        {
            field: "GADET_BES_TYP_DES",
            title: "نوع تفضيلي بستانكار",
            width: 150
        },
        {
            field: "GADETL_ID1",
            title: "كد تفضيلي بدهكار",
            width: 150
        },
        {
            field: "GADETL_DES1",
            title: "شرح تفضيلي بدهكار",
            width: 150
        },
        {
            field: "GADETL_ID2",
            title: "كد تفضيلي بستانكار",
            width: 150
        },
        {
            field: "GADETL_DES2",
            title: "شرح تفضيلي بستانكار",
            width: 150
        },
        {
            field: "SUB_CODE1",
            title: "كد معين بدهكار",
            width: 150
        },
        {
            field: "GALDER_DES",
            title: "شرح معين بدهكار",
            width: 150
        },
        {
            field: "SUB_CODE2",
            title: "كد معين بستانكار",
            width: 150
        },
        {
            field: "GALDER_DES2",
            title: "شرح معين بستانكار",
            width: 150
        },
        {
            field: "CAR_CLASS_DES",
            title: "کلاس خودرو",
            width: 150
        },
    ]

    const GASUB_SRL_FNCColumns = [
        {
            field: "DES",
            title: "عنوان",
            width: 15
        },


    ]

    const GAFRML_SRL_Columns = [
        {
            field: "FULL_DES",
            title: "عنوان",
            width: 15
        },


    ]

    const handleRecType = (value) => {
        debugger;
        setRecType(value);
    }

    const handleCarType = (value) => {
        //debugger;
        setCarType(value);
    }

    const form = () => (
        <div className="form-container">
            <InputHidden name="SRL" />
            <SimpleInputHidden name="GATYPO_SRL" value={props.gatypo_srl} />
            <Row>
                <Col>
                <p><strong>ثبت مقدمه سند</strong></p>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <InputSelectHandleChange
                        label="شناسه فروش"
                        name="REC_TYPE"
                        onChange={handleRecType}
                        serverBinding={{
                            url: '/Common/GetSelectRec_Type_Amani_Doc',
                            filter: {},
                            textField: 'desc',
                            valueField: 'id'
                        }}
                    />

                </Col>

                <Col md={3}>
                    <InputSelectHandleChange
                        label="نوع خودرو"
                        name="CAR_GRP_CODE"
                        onChange={handleCarType}
                        serverBinding={{
                            url: '/Common/GetSelectCar_Type',
                            filter: {},
                            textField: 'desc',
                            valueField: 'id'
                        }}
                    />

                </Col>

                <Col md={3}>

                    {formData.CAR_GRP_CODE === 70 || CarType == 70 ?
                        <>
                            <InputSelect
                                label="کلاس خودرو"
                                name="CAR_CLASS_CODE"
                                url='/Common/GetSelectCar_Class'
                                filter=""
                                textField='desc'
                                valueField='id'
                            />
                        </>
                        : <></>}
                </Col>
            </Row>

            <Row>
                <Col>
                <p><strong>تعریف نتیجه سند</strong></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputSelect
                        enumType="GADETTypeAmani"
                        name="GADET_BED_TYP"
                        label="نوع تفضيلي بدهكار"
                        defaultValue="1"
                    />
                </Col>
                <Col>
                    <InputSelect
                        enumType="GADETTypeAmani"
                        name="GADET_BES_TYP"
                        label="نوع تفضيلي بستانكار"
                        defaultValue="1"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <InputModal
                        column={GASUB_SRL_FNCColumns}
                        name="GASUB_SRL1_FNC"
                        titleName="GALDER_DES"
                        selectLabel="DES"
                        selectKey="SRL"
                        label="معين بدهكار"
                        url="/Common/Select_GasubatFnc"
                    />
                </Col>
                <Col md={6}>
                    <InputModal
                        column={GASUB_SRL_FNCColumns}
                        name="GASUB_SRL2_FNC"
                        titleName="GALDER_DES2"
                        selectLabel="DES"
                        selectKey="SRL"
                        label="معين بستانكار"
                        url="/Common/Select_GasubatFnc"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <InputModal
                        column={GAFRML_SRL_Columns}
                        name="GAFRML_SRL"
                        titleName="GADETL_DES1"
                        selectLabel="FULL_DES"
                        selectKey="SRL"
                        label="تفصيلي بدهكار"
                        url="/Common/Select_GafrmlSrl"
                    />
                </Col>
                <Col md={6}>
                    <InputModal
                        column={GAFRML_SRL_Columns}
                        name="GAFRML_SRL2"
                        titleName="GADETL_DES2"
                        selectLabel="FULL_DES"
                        selectKey="SRL"
                        label="تفصيلي بستانكار"
                        url="/Common/Select_GafrmlSrl"
                    />
                </Col>
            </Row>
        </div>
    );

    const CopyHandler = (item,copystate) => {
       // debugger;
        //console.log('copyrow', item);
        baseService.post("/Satrmnt/Copy_Row_Doc", {ROW_SRL : item.SRL,COPY_STATE: copystate}).then(({ data }) => {

            console.log('CopyRow', data);
            dispatch(snackbarActions.success("عملیات با موفقیت انجام شد."))

        })

    }


    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => CopyHandler(item,1)} color="primary">کپی ردیف</MatBtn>
            </>
        ),
        width: 150
    })

    columns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <MatBtn variant="outlined" className="ml-1" size="small" onClick={() => CopyHandler(item,2)} color="primary">کپی معکوس</MatBtn>
            </>
        ),
        width: 150
    })

    return (<>

        <PopupCurd
            style={{ width: '200px' }}
            columns={columns}
            title="سند امانی"
            urls={{
                readUrl: "/Satrmnt/Show_Sale_Amani_Doc",
                createUrl: "/Satrmnt/Insert_Sale_Doc",
                deleteUrl: "/Satrmnt/Delete_Sale_Doc",
                editUrl: "/Satrmnt/Update_Sale_Doc",
                getUrl: "",
                GetId: props.gatypo_srl
            }}
            form={form}
        />

    </>);
}

const mapStateToProps = state => {
    console.log("redux", state)
    return {
        formData: state.passIds.fetchFormData,

    };
};
export default connect(mapStateToProps)(SaleAmaniDocument);
