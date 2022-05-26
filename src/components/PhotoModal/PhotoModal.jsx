import React from "react";

//bootstrap
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export default function PhotoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Image fluid src={props.photo}></Image>
      </Modal.Body>
    </Modal>
  );
}
