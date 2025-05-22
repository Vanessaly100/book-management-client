import * as Yup from "yup";

export const bookValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").max(255),
  author: Yup.string().required("Author is required").max(255),
  category: Yup.string().required("Category is required").max(255),
  description: Yup.string().max(1000),
  cover_url: Yup.string()
    .url("Invalid URL")
    .required("Cover image URL is required"),
  publishedYear: Yup.number()
    .integer("Must be an integer")
    .min(1500, "Year must be later than 1500")
    .max(new Date().getFullYear(), `Year can't be in the future`)
    .nullable(),
  totalCopies: Yup.number().integer().min(1, "Must be at least 1").nullable(),
  availableCopies: Yup.number()
    .integer()
    .min(0)
    .nullable()
    .when("totalCopies", (totalCopies, schema) =>
      totalCopies
        ? schema.max(totalCopies, "Available copies cannot exceed total copies")
        : schema
    ),
  isAvailable: Yup.boolean(),
  genres: Yup.array().of(Yup.string().max(255)),
});
