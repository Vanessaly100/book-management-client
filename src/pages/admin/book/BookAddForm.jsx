import React from 'react';
import { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { createBook } from '../../../api/book';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { bookValidationSchema } from '../validations/bookSchema';
import CreatableSelect from 'react-select/creatable';
import { getAllAuthorsNoFilter} from "../../../api/author";
import { getAllCategories} from "../../../api/category";
  

const BookAddForm = ({ onSuccess = () => {}, setError = () => {}, initialValues = {} }) => {
    const [authorOptions, setAuthorOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);


  useEffect(() => {
    const fetchAllAuthors = async () => {
      try {
        const data = await getAllAuthorsNoFilter();
        console.log("Categories responsesss:", data);
        const options = data.authors.map(author => ({
          value: author.author_id,
          label: author.name,
        }));
        setAuthorOptions(options);
      } catch (error) {
        console.error('Failed to fetch authors', error);
      }
    };

    fetchAllAuthors();
  }, []);
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getAllCategories("categories?limit=1000"); // your backend route
          console.log("Categories responsesss:", response);
          const options = response.categories.map((category) => ({
            
            value: category.category_id,
            label: category.name,
          }));
          setCategoryOptions(options);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
    
      fetchCategories();
    }, []);
    
    const genreOptions = [
        { value: 'Thriller', label: 'Thriller' },
        { value: 'Science', label: 'Science' },
        { value: 'Fantasy', label: 'Fantasy' },
      ];
    const formik = useFormik({
      initialValues: {
        title: '',
        author: '',
        category: '',
        CoverImage: '',
        publishedYear: '',
        totalCopies: '',
        availableCopies: '',
        description: '',
        genres: [],
        ...initialValues
      },
  
      validationSchema: bookValidationSchema,
  
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        const payload = {
          // title: values.title,
          // author: values.author,
          // category: values.category,
          // description: values.description,
          // CoverImage: values.CoverImage,
          // publishedYear: parseInt(values.publishedYear),
          // totalCopies: parseInt(values.totalCopies),
          // availableCopies: parseInt(values.availableCopies),
          // genres: Array.isArray(values.genres)
          //   ? values.genres
          //   : values.genres
          //       ?.split(',')
          //       .map((g) => g.trim())
          //       .filter((g) => g.length > 0),
          title: values.title,
  author: values.author,
  category: values.category,
  description: values.description,
  cover_url: values.cover_url,
  publishedYear: values.publishedYear,
  totalCopies: values.totalCopies,
  availableCopies: values.availableCopies,
  isAvailable: values.isAvailable,
  genres: values.genres,  // array of genre names
        };
  
        console.log('Submitting payload:', payload);
  
        // Only submit if no errors
        if (Object.keys(formik.errors).length > 0) {
          console.log('Validation errors:', formik.errors);
          return;
        }
  
        try {
          const response = await createBook(payload);
          const newBook = response.book;
          console.log("Book created:", newBook);
          toast.success("Book created successfully!");
          resetForm();
          onSuccess(newBook);
        } catch (error) {
          console.error("Error adding book:", error.response?.data || error.message);
          toast.error("Failed to create book.");
          setError(error);
        } finally {
          setSubmitting(false);
        }
      }
    });

  
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 bg-lightMainCardBg text-black rounded-2xl p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Title <span className='text-red-500'>*</span></Label>
        <Input
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder='Enter Title'
          className='w-full p-2 border-none rounded-lg   placeholder:text-gray-600 bg-lightInput'
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-sm text-red-500">{formik.errors.title}</p>
        )}
      </div>

      <div className="mb-4">
  <Label htmlFor="author" className="block text-sm font-medium text-gray-700">
    Author <span className="text-red-500">*</span>
  </Label>
  <CreatableSelect
  name="author"
  isClearable
  options={authorOptions}
  value={
    formik.values.author
      ? { label: formik.values.author, value: formik.values.author }
      : null
  }
  onChange={(selectedOption) => {
    formik.setFieldValue("author", selectedOption ? selectedOption.label : "");
  }}
  onCreateOption={(inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setAuthorOptions((prev) => [...prev, newOption]);
    formik.setFieldValue("author", inputValue);
  }}
  onBlur={() => formik.setFieldTouched("author", true)}
  formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
  isValidNewOption={(inputValue, _, options) =>
    !!inputValue &&
    !options.some((option) => option.label.toLowerCase() === inputValue.toLowerCase())
  }
  className="mt-1"
/>

  {formik.touched.author && formik.errors.author && (
    <div className="text-red-500 text-sm mt-1">{formik.errors.author}</div>
  )}
</div>


<div className="mb-4">
  <Label
    htmlFor="category"
    className="block text-sm font-medium text-gray-700"
  >
    Category <span className="text-red-500">*</span>
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
      !options.some((option) => option.label.toLowerCase() === inputValue.toLowerCase())
    }
    className="mt-1"
  />
  {formik.touched.category && formik.errors.category && (
    <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
  )}
</div>

<div className="space-y-2">
  <Label htmlFor="cover_url">Cover Image</Label>
  <Input
    id="cover_url"
    name="cover_url"
    value={formik.values.cover_url}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="https://example.com/image.jpg"
          className='w-full p-2 border-none rounded-lg   placeholder:text-gray-600 bg-lightInput'
  />
  {formik.touched.cover_url && formik.errors.cover_url && (
    <p className="text-sm text-red-500">{formik.errors.cover_url}</p>
  )}

{formik.values.cover_url && (
  <>
    <p className="text-sm text-gray-500 break-words">Preview URL: {formik.values.cover_url}</p>
    <img
      src={formik.values.cover_url}
      alt="Cover Preview"
      className="w-24 h-32 object-cover rounded-md mt-2 border"
      onError={(e) => {
        console.log("Image failed to load:", formik.values.cover_url);
        e.target.onerror = null;
        e.target.src =
          "https://cdn.pixabay.com/photo/2014/09/08/05/06/book-438935_1280.png";
      }}
    />
  </>
)}

</div>

      <div className="space-y-2">
        <Label htmlFor="publishedYear">PublishedYear</Label>
        <Input
          id="publishedYear"
          name="publishedYear"
          value={formik.values.publishedYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="publishedYear"
          className='w-full p-2 border-none rounded-lg bg-lightInput text-black'
        />
        {formik.touched.publishedYear && formik.errors.publishedYear && (
          <p className="text-sm text-red-500">{formik.errors.publishedYear}</p>
        )}
      </div>

      {/*  */}
      <div className="flex justify-between gap-6">
      <div className="space-y-2">
        <Label htmlFor="totalCopies">TotalCopies</Label>
        <Input
          id="totalCopies"
          name="totalCopies"
          value={formik.values.totalCopies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="TotalCopies"
          className='w-full p-2 border-none rounded-lg bg-lightInput text-black'
        />
        {formik.touched.totalCopies && formik.errors.totalCopies && (
          <p className="text-sm text-red-500">{formik.errors.totalCopies}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="availableCopies">availableCopies</Label>
        <Input
          id="availableCopies"
          name="availableCopies"
          value={formik.values.availableCopies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="AvailableCopies"
           className='w-full p-2 border-none rounded-lg bg-lightInput text-black'
        />
        {formik.touched.availableCopies && formik.errors.availableCopies&& (
          <p className="text-sm text-red-500">{formik.errors.availableCopies}</p>
        )}
      </div>
      </div>


<div className="mb-4">
  <label htmlFor="genres" className="block text-sm font-medium text-gray-700">
    Genres
  </label>

  <CreatableSelect
    isMulti
    name="genres"
    options={genreOptions}
    value={formik.values.genres.map((genre) => ({
      label: genre,
      value: genre,
    }))}
    onChange={(selectedOptions) => {
      const selectedGenres = selectedOptions.map((option) => option.value);
      formik.setFieldValue('genres', selectedGenres);
    }}
    onBlur={() => formik.setFieldTouched('genres', true)}
    className="mt-1"
  />

  {formik.touched.genres && formik.errors.genres && (
    <div className="text-red-500 text-sm mt-1">{formik.errors.genres}</div>
  )}
</div>
<div className="mb-4">
  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
    Description
  </label>
  <textarea
    id="description"
    name="description"
    value={formik.values.description}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    rows={4}
    className="mt-1 block w-full rounded-md bg-lightInput text-black p-2"
    placeholder="Enter a brief description of the book"
  />
  {formik.touched.description && formik.errors.description && (
    <p className="text-sm text-red-500">{formik.errors.description}</p>
  )}
</div>

<div className="flex justify-center gap-10 items-center">
    <Button 
        type="submit" 
        className=" bg-ActionPurple text-white cursor-pointer" 
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Saving...' : 'Save Book'}
      </Button>
      
      <Button 
    type="button" 
    variant="outline"
    className="cursor-pointer" 
    onClick={() => formik.resetForm()}
  >
    Cancel
  </Button>
      
      </div>
      
    </form>
  );
};

export default BookAddForm;