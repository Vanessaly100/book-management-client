import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api/users";
import { create } from "../../../api/notification";
import { getSchema } from "../validations/notificationSchema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const NotifySingleForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllUsers("users?limit=1000");
        setUsers(Array.isArray(res.users) ? res.users : []);
      } catch (err) {
        console.log(err)
        toast.error("Failed to load users");
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      user_id: "",
      book_title: "",
      type: "",
      message: "",
    },
    validationSchema: getSchema("notification", { isAll: false }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await create("single", values);
        toast.success("Notification sent to user");
        resetForm();
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Failed to send notification");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label>User</Label>
        <Select
          value={formik.values.user_id}
          onValueChange={(val) => formik.setFieldValue("user_id", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent className="bg-darkMainCardBg text-white cursor-pointer">
            {users.map((u) => (
              <SelectItem key={u.user_id} value={u.user_id} className="hover:bg-ActionMiniPurple hover:text-white cursor-pointer">
                {u.first_name} {u.last_name} ({u.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.errors.user_id && (
          <div className="text-red-500 text-sm">{formik.errors.user_id}</div>
        )}
      </div>

      <div>
        <Label>Book Title (optional)</Label>
        <input
          type="text"
          name="book_title"
          className="w-full border p-2 rounded"
          placeholder="Enter book title"
          onChange={formik.handleChange}
          value={formik.values.book_title}
        />
      </div>

      <div>
        <Label>Type</Label>
        <select
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          className="w-full border p-2 rounded"
        >
          <option value="" className=" bg-darkMainCardBg text-white cursor-pointer">Select type</option>
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
        Notify User
      </Button>
    </form>
  );
};

export default NotifySingleForm;
