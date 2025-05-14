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

const BorrowEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    title: Yup.string().required("Book title is required"),
    borrow_date: Yup.string(),
    return_date: Yup.string(),
    due_date: Yup.string(),
    status: Yup.string(),
  });

  console.log("initialValues", initialValues);
 const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0]; // returns YYYY-MM-DD
};

const fixedInitialValues = {
  first_name: initialValues?.user?.first_name || "",
  last_name: initialValues?.user?.last_name || "",
  email: initialValues?.user?.email || "",
  title: initialValues?.book?.title || "",
  borrow_date: formatDate(initialValues?.borrow_date),
  return_date: formatDate(initialValues?.return_date),
  due_date: formatDate(initialValues?.due_date),
  status: initialValues?.status || "Borrowed",
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
        <h2 className="text-2xl font-bold mb-4">Edit Borrow</h2>

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
                  <label>First Name</label>
                  <Field
                    name="first_name"
                    placeholder="First Name"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Title</label>
                <Field
                  name="title"
                  placeholder="Book Title"
                  type="text"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Borrow Date</label>
                  <Field
                    name="borrow_date"
                    type="date"
                    placeholder="Borrow Date"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="borrow_date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label>Return Date</label>
                  <Field
                    name="return_date"
                    type="date"
                    placeholder="Return Date"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="return_date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Due Date</label>
                <Field
                  name="due_date"
                  type="date"
                  placeholder="Due Date"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="due_date"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Status</label>
                  <Field name="status">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue(field.name, value); 
                        }}
                      >
                        <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-lg p-2">
                          <SelectItem
                            value="Borrowed"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Borrowed
                          </SelectItem>
                          <SelectItem
                            value="Returned"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Returned
                          </SelectItem>
                          <SelectItem
                            value="Overdue"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Overdue
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

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

export default BorrowEditForm;

