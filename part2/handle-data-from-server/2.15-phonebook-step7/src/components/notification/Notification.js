import React from "react";
import "./Notification.css";

const Notification = ({ messageNotification }) => {
  const { message, type } = messageNotification;

  if (message === null) return null;

  return (
    <div
      className={`${
        type === "danger" ? "notification-danger" : "notification-success"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
