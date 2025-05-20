import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import AuthorForm from '../../../pages/admin/author/AuthorAddForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import axios from "axios";


const AuthorSelect = ({ value, onChange, onAuthorCreated }) => {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    const loadAuthors = async () => {
      setIsLoading(true);
      try {
        const page = 1;
        const limit = 5;
        const sort = "createdAt";
        const order = "asc";
  
        const response = await axios.get(`http://localhost:4000/api/authors`, {
          params: {
            page,
            limit,
            sort,
            order,
            filter: searchQuery,
          },
          withCredentials: true,
        });
  
        const data = response.data;
        console.log("form data", data);
        setAuthors(data.authors); // not data directly

      } catch (error) {
        console.error("Failed to load authors:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const debounceTimer = setTimeout(() => {
      loadAuthors();
    }, 300);
  
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);
  const handleAuthorCreated = (newAuthor) => {
    setAuthors((prev) => [newAuthor, ...prev]);
    onChange(newAuthor.author_id);
    if (onAuthorCreated) {
      onAuthorCreated(newAuthor);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an author" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2 bg-white">
            <Input
              placeholder="Search authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2 bg-white"
            />
          </div>
          {isLoading ? (
            <div className="p-2 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : authors.length === 0 ? (
            <div className="p-2 text-center text-sm text-muted-foreground bg-white">
              No authors found
            </div>
          ) : (
            authors.map((author) => (
              <SelectItem key={author.author_id} value={author.author_id} className='bg-white'>
                {author.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Author</DialogTitle>
          </DialogHeader>
          <AuthorForm onSuccess={handleAuthorCreated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorSelect;
