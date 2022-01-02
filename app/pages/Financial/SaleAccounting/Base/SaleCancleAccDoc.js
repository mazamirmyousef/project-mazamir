import React, { useEffect, useState } from "react";
import PopupCurd from "../../../../template/PopupCrud";
import InputHidden from "../../../../partials/editors/InputHidden";
import { Row, Col, Button } from "react-bootstrap";
import InputSelect from "../../../../partials/editors/InputSelect";
import InputModal from "../../../../partials/editors/InputModal";
import SimpleInputHidden from "../../../../partials/editors/SimpleInputHidden";


const SaleCancleAccDoc = (props) => {

    const columns = [
        {
            field: "sRL",
            title: "كد",
            width: 150
        },
        {
            field: "GAMAIN_SRL",
            title: "كد",
            width: 150
        },
        {
            field: "GAMAIN_SRL_LOV",
            title: "شرح",
            width: 150
        },
        {
            field: "GATYCO_SRL",
            title: "نوع مركز",
            width: 150
        },
        {
            field: "CAR_GRP_DESC",
            title: "نوع خودرو",
            width: 150
        },
        {
            field: "PUMONY_DESC",
            title: "نوع ارز",
            width: 150
        },
        {
            field: "GADETL_ID1_DES",
            title: "كد تفضيلي بدهكار",
            width: 150
        },
        {
            field: "GADETL_DES1_DES",
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
            field: "PAY_TYPE_CODE",
            title: "نوع پرداخت",
            width: 150
        },
        {
            field: "ACCOUNT_PAYE_DES",
            title: "نوع شرکت",
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

    const form = () => (
        <div className="form-container">
            <InputHidden name="SRL" />
            <SimpleInputHidden name="GATYPO_SRL" value={props.gatypo_srl} />
            <Row>
                <Col>
                    <p><strong>تعریف سند</strong></p>
                </Col>
            </Row>
            <Row>
            <Col md={3}>
                    <InputSelect
                        enumType="accountTypeCustomer"
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
        </div>
    );

    return (<>

        <PopupCurd
            style={{ width: '200px' }}
            columns={columns}
            title="تعریف سند ابطال پذیرش"
            urls={{
                readUrl: "/Satrmnt/Show_Sale_CancleAcc_Doc",
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

export default SaleCancleAccDoc;