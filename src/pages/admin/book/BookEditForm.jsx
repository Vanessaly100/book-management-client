import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../../components/ui/button";
import * as Yup from "yup";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BooleanSelect from "@/components/form/BooleanSelect";
import MembershipSelect from "@/components/form/MembershipSelect";

const BookEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    author: Yup.string().required("Author is required"),
    genre:  Yup.array().of(Yup.string()),
    cover_url: Yup.string().required("Image Cover is required"),
    publishedYear: Yup.string(),
    totalCopies: Yup.number(),
    availableCopies: Yup.number(),
  });

  const fixedInitialValues = {
     title: initialValues?. title || "",
    category: initialValues?.Category || "",
    author: initialValues?.author || "",
    genre: initialValues?.genre || "",
    cover_url: initialValues?.cover_url || "",
    publishedYear: initialValues?.publishedYear || "",
    totalCopies: initialValues?.totalCopies || "",
    availableCopies: initialValues?.availableCopies || "",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black opacity-98"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>

        <Formik
          initialValues={fixedInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-4">
              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Title</label>
                  <Field
                    name="title"
                    placeholder="Title"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full">
                  <label>Category</label>
                  <Field
                    name="category"
                    placeholder="Category"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Author</label>
                <Field
                  name="author"
                  type="author"
                  placeholder="Author"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Genre</label>
                  <Field
                    name="genre"
                    type="text"
                    placeholder="Genre"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="genre"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label>Cover Image</label>
                  <Field
                    name="cover_url"
                    type="text"
                    placeholder="Cover Image"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="cover_url"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Published Year</label>
                <Field
                  name="publishedYear"
                  type="number"
                  placeholder="Published Year"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="Published Year"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Total Copies</label>
                <Field
                  name="totalCopies"
                  type="number"
                  placeholder="Total Copies"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="totalCopies"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Available Copies</label>
                <Field
                  name="availableCopies"
                  type="number"
                  placeholder="Available Copies"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="availableCopies"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* </div> */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookEditForm;



