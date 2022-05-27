import React from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export default function PhotoModal(props) {
  return (
    <Modal {...props} centered size="xl">
      <Modal.Body>
        <Image fluid src={props.photo}></Image>
      </Modal.Body>
    </Modal>
  );
}
