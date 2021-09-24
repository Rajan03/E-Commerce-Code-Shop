import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function Message({ children, variant }) {
  return (
    <>
      <Alert variant={variant}>
        {children}
      </Alert>
    </>
  );
}

Message.defaultProps = {
  variant: "info",
};
