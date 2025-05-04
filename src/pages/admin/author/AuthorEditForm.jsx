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

const AuthorEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string(),
  });

  const fixedInitialValues = {
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    contact: initialValues?.contact || "",
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
        <h2 className="text-2xl font-bold mb-4">Edit Author</h2>

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
              {/* <div className="flex w-full gap-4"> */}
                <div className="w-full">
                  <label> Name</label>
                  <Field
                    name="name"
                    placeholder=" Name"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
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

                {/* <div className="flex w-full gap-4"> */}
                  <div className="w-full">
                    <label>Contact</label>
                    <Field
                      name="contact"
                      type="text"
                      placeholder="contact"
                      className="w-full p-2 border-none rounded-lg bg-gray-300"
                    />
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  
              {/* </div> */}
              {/* </div> */}

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

export default AuthorEditForm;
