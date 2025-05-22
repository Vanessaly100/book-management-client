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

const UserEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string(),
    phone_number: Yup.string(),
    points: Yup.number(),
    rewarded: Yup.string(),
    membership_type: Yup.string(),
    reading_preferences: Yup.array().of(Yup.string()),
  });

  const fixedInitialValues = {
    first_name: initialValues?.first_name || "",
    last_name: initialValues?.last_name || "",
    email: initialValues?.email || "",
    location: initialValues?.location || "",
    phone_number: initialValues?.phone_number || "",
    points: initialValues?.points || 0,
    rewarded:
      initialValues?.rewarded === true || initialValues?.rewarded === false
        ? initialValues.rewarded
        : false,

    membership_type: initialValues?.membership_type || "",
    reading_preferences: Array.isArray(initialValues?.reading_preferences)
      ? initialValues.reading_preferences
      : [],
    role: initialValues?.role || "user", 
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
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>

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
                <div className="w-full">
                  <label>Last Name</label>
                  <Field
                    name="last_name"
                    placeholder="Last Name"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="last_name"
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

              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Location</label>
                  <Field
                    name="location"
                    type="text"
                    placeholder="Location"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label>Phone Number</label>
                  <Field
                    name="phone_number"
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-2 border-none rounded-lg bg-gray-300"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Points</label>
                <Field
                  name="points"
                  type="number"
                  placeholder="Points"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="points"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label>Rewarded</label>

                  <Field name="rewarded">
                    {({ field, form }) => (
                      <BooleanSelect
                        value={field.value}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        placeholder="Select Rewarded"
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="rewarded"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-full">
                  <label>Membership Type</label>

                  <Field name="membership_type">
                    {({ field, form }) => (
                      <MembershipSelect
                        value={field.value}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        placeholder="Select Membership"
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="membership_type"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label>Reading Preferences</label>
                <Field
                  name="reading_preferences"
                  type="text"
                  placeholder="Reading Preferences"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="reading_preferences"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="w-full">
                <Field name="role">
                  {({ field, form }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        form.setFieldValue(field.name, value); 
                      }}
                    >
                      <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-lg rounded-lg p-2">
                        <SelectItem
                          value="user"
                          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                        >
                          User
                        </SelectItem>
                        <SelectItem
                          value="admin"
                          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
                        >
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
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

export default UserEditForm;
