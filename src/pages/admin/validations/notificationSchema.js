import * as Yup from "yup";

export const getSchema = (type) => {
  switch (type) {
    case "notification":
      return Yup.object().shape({
        user_id: Yup.string().when("$isAll", {
          is: false,
          then: Yup.string().required("User is required"),
        }),
        book_id: Yup.string(),
        type: Yup.string().required("Notification type is required"),
        message: Yup.string().required("Message is required"),
      });
    default:
      return Yup.object();
  }
};
