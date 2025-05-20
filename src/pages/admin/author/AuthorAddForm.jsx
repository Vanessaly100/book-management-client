import React from 'react';
import { useFormik } from 'formik';
import { createAuthor } from '../../../api/author';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { authorSchema } from '../validations/authorSchema';

const AuthorForm = ({ onSuccess, initialValues = {} }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      bio: '',
      social_media: '',
      profile_picture: '',
      contact: '',
      email: '',
      ...initialValues 
    },
    validationSchema: authorSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      console.log("Submitting author values:", values);
        try {
          const newAuthor = await createAuthor(values);
          toast.success('Author created successfully!');
      
          resetForm({
            values: {
              name: '',
              bio: '',
              social_media: '',
              profile_picture: '',
              contact: '',
              email: '',
            }
          });
      
            onSuccess(newAuthor);
          }  catch (error) {
            if (error.response?.data?.errors) {
              if (error.response.data.errors.email && 
                  error.response.data.errors.email.includes('already exists')) {
                toast.error('This email is already in use');
                setErrors({ email: 'This email is already in use' });
              } else {
                setErrors(error.response.data.errors);
              }
            } else {
              toast.error('Failed to create author. Please try again.');
            }
          } finally {
            setSubmitting(false);
          }
        },
    
    })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 bg-lightMainCardBg text-black rounded-2xl p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name <span className='text-red-500'>*</span></Label>
        <Input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='w-full p-2 border-none rounded-lg bg-lightInput dark:placeholder:text-white placeholder:text-black'
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-500">{formik.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email<span className='text-red-500'>*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='w-full p-2 border-none rounded-lg bg-lightInput'
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio <span className='text-red-500'>*</span></Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='w-full p-2 border-none rounded-lg bg-lightInput'
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="social_media">Social Media</Label>
        <Input
          id="social_media"
          name="social_media"
          value={formik.values.social_media}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://twitter.com/username"
          className='w-full text-black  p-2 border-none rounded-lg bg-lightInput placeholder:text-gray-500'
        />
        {formik.touched.social_media && formik.errors.social_media && (
          <p className="text-sm text-red-500">{formik.errors.social_media}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile_picture">Profile Picture</Label>
        <Input
          id="profile_picture"
          name="profile_picture"
          value={formik.values.profile_picture}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="https://profile.com"
          className='w-full text-black  p-2 border-none rounded-lg bg-lightInput placeholder:text-gray-500'
        />
        {formik.touched.profile_picture && formik.errors.profile_picture && (
          <p className="text-sm text-red-500">{formik.errors.profile_picture}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          name="contact"
          value={formik.values.contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone or other contact info"
          className='w-full p-2 border-none rounded-lg bg-lightInput'
        />
        {formik.touched.contact && formik.errors.contact && (
          <p className="text-sm text-red-500">{formik.errors.contact}</p>
        )}
      </div>
<div className="flex justify-center gap-10 items-center">
    <Button 
        type="submit" 
        className=" bg-ActionPurple text-white cursor-pointer" 
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Saving...' : 'Save Author'}
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

export default AuthorForm;