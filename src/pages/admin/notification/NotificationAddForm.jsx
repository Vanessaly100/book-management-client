import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  socket  from "@/utils/socket";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const notificationTypes = [
  "Overdue",
  "Borrow",
  "Reservation",
  "Reminder",
  "Review",
  "General",
];

const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  user_id: Yup.string().required("User ID is required"),
  book_id: Yup.string().required("Book ID is required"),
  message: Yup.string().required("Message is required"),
});

const NotificationAddForm = () => {

  const formik = useFormik({
    initialValues: {
      type: "Overdue",
      user_id: "",
      book_id: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/notifications/create",
          values,{withCredentials: true}
        );

        socket.emit("notification", {
          user_id: values.user_id,
          message: response.data.data.message,
        });

        console.log("Notification created:", response.data);
        resetForm();
      } catch (error) {
        console.error("Error creating notification:", error);
      }
    },
  });

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto dark:bg-darkTealGreenish bg-white rounded-lg shadow-md dark:text-gray-200">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Notification Type</label>
          <Select
            value={formik.values.type}
            onValueChange={(val) => formik.setFieldValue("type", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type"  />
            </SelectTrigger>
            <SelectContent className="dark:bg-tealGreenish dark:text-white bg-white shadow-lg rounded-lg p-2">
              {notificationTypes.map((t) => (
                <SelectItem key={t} value={t} className="transition-all duration-200 hover:bg-tealGreenish dark:hover:bg-darkOffWhite hover:text-white focus:bg-tealGreenish focus:text-Gold">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* User ID */}
        <div>
          <label htmlFor="user_id" className="block text-sm font-medium mb-1">
            User ID
          </label>
          <Input
            id="user_id"
            name="user_id"
            value={formik.values.user_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="User ID"
          />
          {formik.touched.user_id && formik.errors.user_id && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.user_id}</p>
          )}
        </div>

        {/* Book ID */}
        <div>
          <label htmlFor="book_id" className="block text-sm font-medium mb-1">
            Book ID
          </label>
          <Input
            id="book_id"
            name="book_id"
            value={formik.values.book_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Book ID"
          />
          {formik.touched.book_id && formik.errors.book_id && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.book_id}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Input
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter notification message"
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
          )}
        </div>

        <Button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 w-full cursor-pointer">
          Create Notification
        </Button>
      </form>
    </div>
  );
};

export default NotificationAddForm;
