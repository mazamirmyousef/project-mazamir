import React, { useState } from "react"
import Grid from "../../../../partials/grid";
import { Button as Btn } from "@material-ui/core";
import SaleInvoiceDocument from "./SaleInvoiceDocument";
import SaleCancleDocument from "./SaleCancleDocument";
import SaleAmaniDocument from "./SaleAmaniDocument";
import SalePreReceiveDoc from "./SalePreReceiveDoc";
import SaleConvertDoc from "./SaleConvertDoc";
import SaleReturnDoc from "./SaleReturnDoc";
import SaleAmongDocument from "./SaleAmongDocument";
import SaleExtraPayDoc from "./SaleExtraPayDoc";
import SalePayDocument from "./SalePayDocument";
import SaleExportDocument from "./SaleExportDocument";
import SaleCustomerdoc from "./SaleCustomerdoc";
import SaleCancleAccDoc from "./SaleCancleAccDoc";
import SaleCarDeliveryDoc from "./SaleCarDeliveryDoc";


const MainDocumentSale = (props) => {

    const [DocSrl, setDocSrl] = useState();

    const DocumentColumns = [
        {
            field: "DOC_DES",
            title: "شرح سند",
            width: 50
        },
        {
            field: "GAACTT_DES",
            title: "نوع پردازش",
            width: 50
        },
        {
            field: "DES",
            title: "شرح فعاليت",
            width: 50
        },

    ]

    const detailHandler = (item) => {

        console.log("detailitem", item);
        setDocSrl(item.SRL);

    }

    DocumentColumns.push({
        title: "عملیات",
        template: (item) => (
            <>
                <Btn variant="outlined" className="ml-1" size="small" onClick={() => detailHandler(item)} color="primary">جزئیات</Btn>
            </>
        ),
        width: 100
    });

    return (<>
        {console.log("DocSrl", DocSrl)}
        <Grid
            url="/Gatypot/Show_Gatypot"
            columns={DocumentColumns}
        />
        {DocSrl === 147 ?
            <div style={{ marginTop: 20 }}>
                <SaleInvoiceDocument gatypo_srl={DocSrl} />
            </div>
            : DocSrl === 148 ?
                <div style={{ marginTop: 20 }}>
                    <SaleCancleDocument gatypo_srl={DocSrl} />
                </div>
                : DocSrl === 149 ?
                    <div style={{ marginTop: 20 }}>
                        <SaleAmaniDocument gatypo_srl={DocSrl} />
                    </div>
                    : DocSrl === 227 ?
                        <div style={{ marginTop: 20 }}>
                            <SalePreReceiveDoc gatypo_srl={DocSrl} />
                        </div>
                        : DocSrl === 247 ?
                            <div style={{ marginTop: 20 }}>
                                <SaleConvertDoc gatypo_srl={DocSrl} />
                            </div>
                            : DocSrl === 267 ?
                                <div style={{ marginTop: 20 }}>
                                    <SaleReturnDoc gatypo_srl={DocSrl} />
                                </div>
                                : DocSrl === 287 ?
                                    <div style={{ marginTop: 20 }}>
                                        <SaleAmongDocument gatypo_srl={DocSrl} />
                                    </div>
                                    : DocSrl === 327 ?
                                        <div style={{ marginTop: 20 }}>
                                            <SaleExtraPayDoc gatypo_srl={DocSrl} />
                                        </div>
                                        : DocSrl === 347 ?
                                            <div style={{ marginTop: 20 }}>
                                                <SalePayDocument gatypo_srl={DocSrl} />
                                            </div>
                                            : DocSrl === 370 ?
                                                <div style={{ marginTop: 20 }}>
                                                    <SaleExportDocument gatypo_srl={DocSrl} />
                                                </div>
                                                : DocSrl === 371 ?
                                                    <div style={{ marginTop: 20 }}>
                                                        <SaleCustomerdoc gatypo_srl={DocSrl} />
                                                    </div>
                                                    : DocSrl === 372 ?
                                                        <div style={{ marginTop: 20 }}>
                                                            <SaleCancleAccDoc gatypo_srl={DocSrl} />
                                                        </div>
                                                        : DocSrl === 374 ?
                                                            <div style={{ marginTop: 20 }}>
                                                                <SaleCarDeliveryDoc gatypo_srl={DocSrl} />
                                                            </div>
                                                            : <></>}
    </>);
}

export default MainDocumentSale;