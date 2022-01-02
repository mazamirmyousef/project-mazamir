import React, { useEffect, useState } from "react";
import PopupCurd from "../../../../template/PopupCrud";
import InputHidden from "../../../../partials/editors/InputHidden";
import { Row, Col, Button } from "react-bootstrap";
import InputSelect from "../../../../partials/editors/InputSelect";
import SimpleInputHidden from "../../../../partials/editors/SimpleInputHidden";
import InputSelectHandleChange from "../../../../partials/editors/Custom/InputSelectHandleChange";
import InputModal from "../../../../partials/editors/InputModal";
import { connect } from "react-redux";




const SaleCancleDocument = (props) => {

    const [StprCode, setStprCode] = useState([]);
    const { formData } = props
    const columns = [
        {
            field: "SRL",
            title: "سريال",
            width: 150
        },
        {
            field: "REC_TYP_CANCLE",
            title: "نوع",
            width: 150
        },
        {
            field: "CONVERT_TYPE_DES",
            title: "نوع مبلغ",
            width: 150
        },
        {
            field: "STPR_CODE_DES",
            title: "نوع سند پرداختی",
            width: 150
        },
        {
            field: "ACCOUNT_PAYE_DES",
            title: "نوع شركت",
            width: 150
        },
        {
            field: "GADET_BED_TYP_DES",
            title: "نوع تفضيلي بدهكار",
            width: 150
        },
        {
            field: "GADET_BES_TYP_DES",
            title: "نوع تفضيلي بستانكار",
            width: 150
        },
        {
            field: "GADETL_ID1",
            title: "كد تفصيلي بدهكار",
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
        }
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

    const handleStprCode = (value) => {
        debugger;
        setStprCode(value);
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
                    <InputSelect
                        label="نوع"
                        name="REC_TYPE"
                        url='/Common/GetSelectRec_Type_Cancle_Doc'
                        filter=""
                        textField='desc'
                        valueField='id'

                    />

                </Col>
                <Col md={3}>
                    <InputSelect
                        enumType="moneyamountType"
                        name="CONVERT_TYPE"
                        label=" نوع مبلغ"
                    />
                </Col>
            </Row>


            <Row>
                <Col md={3}>
                    <InputSelectHandleChange
                        label="نوع سند پرداختي"
                        name="STPR_CODE"
                        onChange={handleStprCode}
                        serverBinding={{
                            url: '/Common/GetSelectStpr_Code',
                            filter: {},
                            textField: 'desc',
                            valueField: 'id'
                        }}
                    />
                </Col>
                <Col md={3}>
                    <InputSelect
                        enumType="accountTypeCancle"
                        name="ACCOUNT_PAYE"
                        label=" نوع شركت "
                    />
                </Col>
                <Col md={3}>
                    {StprCode == 7 || formData.STPR_CODE === 7 ?
                        <InputSelect
                            enumType="boeType"
                            name="BOE_TYPE"
                            label="نوع گواهي "
                        />
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
                        enumType="GADETTypeCancle"
                        name="GADET_BED_TYP"
                        label="نوع تفصيلي بدهكار"
                        defaultValue="1"
                    />
                </Col>
                <Col>
                    <InputSelect
                        enumType="GADETTypeCancle"
                        name="GADET_BES_TYP"
                        label="نوع تفصيلي بستانكار"
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

    return (<>

        <PopupCurd
            style={{ width: '200px' }}
            columns={columns}
            title="تعريف سند انصراف"
            urls={{
                readUrl: "/Satrmnt/Show_Sale_Cancle_Doc",
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
export default connect(mapStateToProps)(SaleCancleDocument);
