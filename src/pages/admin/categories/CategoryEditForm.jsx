import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../../components/ui/button";
import * as Yup from "yup";
import CategorySelect from "@/components/form/CategorySelect";

const CategoryEditForm = ({ initialValues, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const fixedInitialValues = {
    name: initialValues?.name || "",
    description: initialValues?.description || "",
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
        <h2 className="text-2xl font-bold mb-4">Edit Description</h2>

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
                <label>Category Name</label>

                <Field name="name">
                  {({ field, form }) => (
                    <CategorySelect
                      value={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                      placeholder="Select-Category"
                    />
                  )}
                </Field>

                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Description</label>
                <Field
                  name="description"
                  type="description"
                  placeholder="Description"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
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

export default CategoryEditForm;
