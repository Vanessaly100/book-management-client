import * as Yup from "yup";

export const authorSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  bio: Yup.string()
    .required("Bio is required")
    .min(10, "Bio must be at least 10 characters"),

  contact: Yup.string()
    .max(100, "Contact must be at most 100 characters")
    .notRequired(),

  social_media: Yup.string().url("Enter a valid URL").nullable().notRequired(),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),

  profile_picture: Yup.string()
    .url("Enter a valid URL")
    .nullable()
    .notRequired(),
});
