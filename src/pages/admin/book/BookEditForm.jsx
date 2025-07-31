import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GenreCheckBox from "@/components/form/GenreCheckBox";
import CreatableSelect from "react-select/creatable";
import { getAllCategoryNoFilter } from "../../../api/category";

const BookEditForm = ({ initialValues, onSave, onClose }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().nullable().notRequired(),
    author: Yup.string().required("Author is required"),
    genre: Yup.array().of(Yup.string()),
    cover_url: Yup.string().required("Image Cover is required").url("Invalid URL"),
    publishedYear: Yup.string(),
    totalCopies: Yup.number(),
    availableCopies: Yup.number(),
  });

  const fixedInitialValues = {
    title: initialValues?.title || "",
    category: initialValues?.category || "",
    author: initialValues?.author || "",
    genre: initialValues?.genre?.length ? initialValues.genre : [],
    cover_url: initialValues?.cover_url || "",
    publishedYear: initialValues?.publishedYear || "",
    totalCopies: initialValues?.totalCopies || "",
    availableCopies: initialValues?.availableCopies || "",
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const data = await getAllCategoryNoFilter();
        const options = data.categories.map((category) => ({
          value: category.category_id,
          label: category.name,
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchAllCategory();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://project-backend-7hi1.onrender.com/api/genres", { 
          withCredentials: true,
        });
        setGenres(res.data.genres);
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
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
            onSave({ ...values, genre: selectedGenres });
          }}
          enableReinitialize
        >
          {(formik) => (
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
                  <Label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <CreatableSelect
                    name="category"
                    isClearable
                    options={categoryOptions}
                    value={
                      formik.values.category
                        ? { label: formik.values.category, value: formik.values.category }
                        : null
                    }
                    onChange={(selectedOption) => {
                      formik.setFieldValue("category", selectedOption ? selectedOption.label : "");
                    }}
                    onCreateOption={(inputValue) => {
                      const newOption = { label: inputValue, value: inputValue };
                      setCategoryOptions((prev) => [...prev, newOption]);
                      formik.setFieldValue("category", inputValue);
                    }}
                    onBlur={() => formik.setFieldTouched("category", true)}
                    formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                    isValidNewOption={(inputValue, _, options) =>
                      !!inputValue &&
                      !options.some(
                        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
                      )
                    }
                    className="mt-1"
                  />
                  {formik.touched.category && formik.errors.category && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                  )}
                </div>
              </div>

              <div>
                <label>Author</label>
                <Field
                  name="author"
                  placeholder="Author"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Genre</label>
                <GenreCheckBox
                  genres={genres}
                  selectedGenres={selectedGenres}
                  onChange={setSelectedGenres}
                />
                <ErrorMessage
                  name="genre"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Cover Image</label>
                <Field
                  name="cover_url"
                  placeholder="Cover Image"
                  className="w-full p-2 border-none rounded-lg bg-gray-300"
                />
                <ErrorMessage
                  name="cover_url"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                  name="publishedYear"
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

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-ActionMiniPurple text-white py-2 rounded hover:bg-ActionMiniPurple cursor-pointer"
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
