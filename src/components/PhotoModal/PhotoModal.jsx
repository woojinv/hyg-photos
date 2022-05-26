import React from "react";

//bootstrap
import Modal from "react-bootstrap/Modal";

export default function PhotoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    ></Modal>
  );
}
