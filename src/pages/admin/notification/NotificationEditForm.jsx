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

const NotificationEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    title: Yup.string().required("Book title is required"),
    message: Yup.string().required("Message title is required"),
    type: Yup.string().required("Type title is required"),
    is_read: Yup.string(),
  });

  console.log("initialValues", initialValues);
 

const fixedInitialValues = {
  first_name: initialValues?.user?.first_name || "",
  last_name: initialValues?.user?.last_name || "",
  email: initialValues?.user?.email || "",
  title: initialValues?.book?.title || "",
  message:initialValues?.message || "General",
  type: initialValues?.type || "",
  is_read: initialValues?.is_read || "Unread",
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
        <h2 className="text-2xl font-bold mb-4">Edit Notification</h2>

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
                  <label>Is Read</label>
                  <Field name="is_read">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue(field.name, value); 
                        }}
                      >
                        <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
                          <SelectValue placeholder="Select is_read"/>
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-lg p-2">
                          <SelectItem
                            value="Unread"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Unread
                          </SelectItem>
                          <SelectItem
                            value="Read"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Read
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="is_read"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>


              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Message</label>
                  <Field name="message">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue(field.name, value); 
                        }}
                      >
                        <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
                          <SelectValue placeholder="Select message" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-lg rounded-lg p-2">
                          <SelectItem
                            value="General"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            General
                          </SelectItem>
                          <SelectItem
                            value="Borrow"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Borrow
                          </SelectItem>
                          <SelectItem
                            value="Return"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Return
                          </SelectItem>
                          <SelectItem
                            value="Review"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Review
                          </SelectItem>
                          <SelectItem
                            value="Overdue"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Overdue
                          </SelectItem>
                          <SelectItem
                            value="Reminder"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Reminder
                          </SelectItem>
                          <SelectItem
                            value="Update"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Update
                          </SelectItem>
                          <SelectItem
                            value="Reservation"
                            className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                          >
                            Reservation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="message"
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

export default NotificationEditForm;


