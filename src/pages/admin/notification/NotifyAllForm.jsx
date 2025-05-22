import { useFormik } from "formik";
import { create } from "../../../api/notification";
import { getSchema } from "../validations/notificationSchema";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const NotifyAllForm = () => {
  const formik = useFormik({
    initialValues: {
      type: "",
      message: "",
    },
    validationSchema: getSchema("notification", { isAll: true }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await create("all", values);
        toast.success("Notification sent to all users");
        resetForm();
      } catch (error) {
        console.error("Error sending to all:", error);
        toast.error("Failed to send to all users");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label>Type</Label>
        <select
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          className="w-full border p-2 rounded"
        >
          <option value="">Select type</option>
          {["Reminder", "Borrow", "Return", "Overdue", "General"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {formik.errors.type && (
          <div className="text-red-500 text-sm">{formik.errors.type}</div>
        )}
      </div>

      <div>
        <Label>Message</Label>
        <Textarea
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        {formik.errors.message && (
          <div className="text-red-500 text-sm">{formik.errors.message}</div>
        )}
      </div>

      <Button type="submit" className="bg-ActionMiniPurple text-white">
        Notify All Users
      </Button>
    </form>
  );
};

export default NotifyAllForm;
