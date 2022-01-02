import React, { useEffect, useState } from "react";
import PopupCurd from "../../../../template/PopupCrud";
import baseService from "../../../../services/base.service";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../../../../store/ducks/snackbar.duck";
import { Button as MatBtn } from "@material-ui/core";
import InputHidden from "../../../../partials/editors/InputHidden";
import { Row, Col } from "react-bootstrap";
import InputSelect from "../../../../partials/editors/InputSelect";
import InputSelectUrlData from "../../../../partials/editors/Custom/InputSelectUrlData";
import InputSelectHandleChange from "../../../../partials/editors/Custom/InputSelectHandleChange";
import InputModal from "../../../../partials/editors/InputModal";
import SimpleInputHidden from "../../../../partials/editors/SimpleInputHidden";
import PopupCurdSaleDoc from "../../../../partials/editors/Custom/PopupCurdSaleDoc";
import { connect } from "react-redux";
import InputText from "../../../../partials/editors/InputText";
import InputModalSelectGasub from "../../../../partials/editors/Custom/InputModalSelectGasub";
import InputModalSelectTax from "../../../../partials/editors/Custom/InputModalSelectTax";
import InputModalSelectTax2 from "../../../../partials/editors/Custom/InputModalSelectTax2";



const SaleAmongDocument = (props) => {
    const { formData, SelectData } = props;

    const [GamainSrl, setGamainSrl] = useState([]);

    const columns = [
        {
            field: "SRL",
            title: "سريال",
            width: 150
        },
        {
            field: "REC_TYPE_DES",
            title: "نوع",
            width: 150
        },
        {
            field: "PAY_TYPE_DES",
            title: "نوع پرداخت",
            width: 150
        },
        {
            field: "STPR_CODE_DES",
            title: "نوع سند پرداختي",
            width: 150
        },
        {
            field: "ACCOUNT_PAYE_DES",
            title: "نوع شركت",
            width: 150
        },
        {
            field: "KIND_PRICE",
            title: "نحوه محاسبه مبلغ",
            width: 150
        },
        {
            field: "DUE_CODE_DESC",
            title: "شناسه نوع هزينه فروش",
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
    ]


    const GASUB_SRL_FNCColumns = [
        {
            field: "DES",
            title: "عنوان",
            width: 15
        },


    ]

    const GASUB_GAMAIN_Columns = [
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
                        label="شناسه فروش"
                        name="REC_TYPE"
                        url='/Common/GetSelectRec_Type_PreReceive_Doc'
                        filter=""
                        textField='desc'
                        valueField='id'
                        defaultValue="1"
                    />
                </Col>
                <Col md={3}>
                    <InputSelect
                        enumType="PreReceiveAmountType"
                        name="PAY_TYPE_CODE"
                        label=" نوع پرداخت "
                        defaultValue="1"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <InputSelect
                        label="نوع سند پرداختي"
                        name="STPR_CODE"
                        url='/Common/GetSelectStpr_Code'
                        filter=""
                        textField='desc'
                        valueField='id'
                    />
                </Col>
                <Col md={3}>
                    <InputSelect
                        enumType="accountTypePreReceive"
                        name="ACCOUNT_PAYE"
                        label=" نوع شركت "
                    />
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
                        enumType="GADETTypePreReceive"
                        name="GADET_BED_TYP"
                        label="نوع تفضيلي بدهكار"
                        defaultValue="1"
                    />
                </Col>
                <Col>
                    <InputSelect
                        enumType="GADETTypePreReceive"
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
                <Col md={6}>
                    <InputModalSelectGasub
                        column={GASUB_GAMAIN_Columns}
                        name="GASUBA_SRL4"
                        titleName="DES"
                        selectLabel="DES"
                        selectKey="SRL"
                        label="معين بدهکار"
                        url="/Common/Select_Gasub_Gamain"
                    />
                </Col>
                <Col md={6}>
                    <InputModal
                        column={GAFRML_SRL_Columns}
                        name="GADETL_SRL4"
                        titleName="GADETL_DES3"
                        selectLabel="FULL_DES"
                        selectKey="SRL"
                        label="تفضيلي بدهکار"
                        url="/Common/Select_GafrmlSrl"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <InputModalSelectTax
                        column={GASUB_GAMAIN_Columns}
                        name="TAX1_GASUBA_SRL"
                        titleName="GASUBA_DES"
                        selectLabel="DES"
                        selectKey="SRL"
                        label="معين ماليات"
                        url="/Common/Select_Gasub_Gamain"
                    />
                </Col>
                <Col md={6}>
                    <InputModal
                        column={GAFRML_SRL_Columns}
                        name="TAX1_GADETL_SRL"
                        titleName="GADETL_DES4"
                        selectLabel="FULL_DES"
                        selectKey="SRL"
                        label="تفضيلي ماليات"
                        url="/Common/Select_GafrmlSrl"
                    />
                </Col>
            </Row>
            <Row>
            <Col md={6}>
                    <InputModalSelectTax2
                        column={GASUB_GAMAIN_Columns}
                        name="TAX2_GASUBA_SRL"
                        titleName="GASUBA_DES4"
                        selectLabel="DES"
                        selectKey="SRL"
                        label="معين عوارض"
                        url="/Common/Select_Gasub_Gamain"
                    />
                </Col>
                <Col md={6}>
                    <InputModal
                        column={GAFRML_SRL_Columns}
                        name="TAX2_GADETL_SRL"
                        titleName="GADETL_DES5"
                        selectLabel="FULL_DES"
                        selectKey="SRL"
                        label="تفضيلي عوارض"
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
            title="تعریف سند فی ما بین"
            urls={{
                readUrl: "/Satrmnt/Show_Sale_Among_Doc",
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
        SelectData: state.passIds.fetchSelectData,
        SelectTax: state.passIds.fetchSelectTax,
        SelectTax2: state.passIds.fetchSelectTax2

    };
};
export default connect(mapStateToProps)(SaleAmongDocument);
