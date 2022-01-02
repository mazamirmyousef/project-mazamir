import React from "react"
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
//generic modal
const GenModal = props => {

    const { isShow, size, onDismiss, title, onConfirm, confirmText, classes } = props
    return (
        <Modal
            dialogClassName={classes || ""}
            size={size || "lg"}
            show={isShow}
            onHide={onDismiss}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                {onConfirm &&
                    <Button variant="primary" onClick={onConfirm}>
                        {confirmText || 'تایید'}
                    </Button>
                }
                <Button variant="secondary" onClick={onDismiss}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GenModal;