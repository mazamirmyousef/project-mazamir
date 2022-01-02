import React, { useEffect, useState } from "react";
import PopupCurd from "../../../../template/PopupCrud";
import InputHidden from "../../../../partials/editors/InputHidden";
import { Row, Col, Button } from "react-bootstrap";
import InputSelect from "../../../../partials/editors/InputSelect";
import InputSelectUrlData from "../../../../partials/editors/Custom/InputSelectUrlData";
import InputSelectHandleChange from "../../../../partials/editors/Custom/InputSelectHandleChange";
import InputModal from "../../../../partials/editors/InputModal";
import SimpleInputHidden from "../../../../partials/editors/SimpleInputHidden";
import PopupCurdSaleDoc from "../../../../partials/editors/Custom/PopupCurdSaleDoc";
import { connect } from "react-redux";



const SaleReturnDoc = (props) => {
    const {formData} = props
    const [RecType, setRecType] = useState([]);
    const [CarType, setCarType] = useState([]);
    const [PrDuCode, setPrDuCode] = useState([]);

    const columns = [
        {
            field: "SRL",
            title: "سريال",
            width: 150
        },
        {
            field: "REC_TYPE_DES",
            title: "شناسه فروش",
            width: 150
        },
        {
            field: "DUE_CODE_DESC",
            title: "شناسه نوع هزينه فروش",
            width: 150
        },
        {
            field: "GAMAIN_SRL_LOV",
            title: "شرح",
            width: 150
        },
        {
            field: "CAR_GRP_DESC",
            title: "نوع خودرو",
            width: 150
        },
        {
            field: "PAY_TYPE_CODE",
            title: "نوع پرداخت",
            width: 150
        },
        {
            field: "SAIPA_LIZING_DESC",
            title: "نوع فروش",
            width: 150
        },
        {
            field: "GATYCO_SRL",
            title: "نوع مركز",
            width: 150
        },
        {
            field: "PUMONY_DESC",
            title: "نوع ارز",
            width: 150
        },
        {
            field: "KIND_PRICE",
            title: "نحوه محاسبه مبلغ",
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
                            url: '/Common/GetSelectRec_Type_Sale_Doc',
                            filter: {},
                            textField: 'desc',
                            valueField: 'id'
                        }}
                    />

                </Col>

                <Col sm={3}>
                    {console.log("RecType",RecType)}
                    <InputSelectUrlData
                        urlDatas="/Common/Rec_Type_Sale"
                        urlDatasParam={RecType}
                        name="PR_DU_CODE"
                        label="شناسه نوع هزينه فروش"
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
            </Row>

            <Row>

                <Col md={3}>
                    <InputSelect
                        enumType="LizingType"
                        name="SAYPA_LIZING"
                        label="نوع"
                    // rules={{ required: "اجباری است" }}
                    />
                </Col>

                <Col md={3}>

                    {formData.CAR_GRP_CODE === 70 || CarType == 70?
                            <>
                                <InputSelect
                                    label="کلاس خودرو"
                                    name="CAR_CLASS_CODE"
                                    url= '/Common/GetSelectCar_Class'
                                    filter=""
                                    textField= 'desc'
                                    valueField= 'id'
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
                        enumType="GADETTypeReturn"
                        name="GADET_BED_TYP"
                        label="نوع تفضيلي بدهكار"
                        defaultValue="1"
                    />
                </Col>
                <Col>
                    <InputSelect
                        enumType="GADETTypeReturn"
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
                        label="تفضيلي بدهكار"
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
                        label="تفضيلي بستانكار"
                        url="/Common/Select_GafrmlSrl"
                    />
                </Col>
            </Row>
            <Row>
                {RecType == 4 && formData.REC_TYPE === 4 ?
                    <Col md={6}>
                        <InputModal
                            column={GASUB_SRL_FNCColumns}
                            name="GASUB_SRL3_FNC"
                            titleName="DES"
                            selectLabel="DES"
                            selectKey="SRL"
                            label="معين بستانكار ليزينگ"
                            url="/Common/Select_GasubatFnc"
                        />
                    </Col>
                    : <></>}
            </Row>
        </div>
    );



    return (<>
        <div>
            {console.log("props", props)}
            <PopupCurd
            //    insertData={true}
            //    dynamicField={field}
                style={{ width: '200px' }}
                columns={columns}
                title="تعریف سند برگشت از فروش"
                urls={{
                    readUrl: "/Satrmnt/Show_Sale_Return_Doc",
                    createUrl: "/Satrmnt/Insert_Sale_Doc",
                    deleteUrl: "/Satrmnt/Delete_Sale_Doc",
                    editUrl: "/Satrmnt/Update_Sale_Doc",
                    getUrl: "",
                    GetId: props.gatypo_srl
                }}
                form={form}
            />
        </div>

    </>);
}


const mapStateToProps = state => {
    console.log("redux" , state)
    return {
        formData: state.passIds.fetchFormData,

    };
};
export default connect(mapStateToProps)(SaleReturnDoc);
