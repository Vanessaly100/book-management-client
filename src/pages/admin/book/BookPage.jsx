import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { PencilIcon, TrashIcon } from "lucide-react";
import debounce from "lodash.debounce";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  EyeOff,
  Eye,
  Filter,
  ArrowUp,
  ArrowDown,
  X,
  LayoutGrid,
} from "lucide-react";
import BookEditForm from "./BookEditForm";
import { getAllBooks, deleteBook, updateBook } from "../../../api/book";
import { getAllAuthors } from "../../../api/author";
import { getAllCategories } from "../../../api/category";

const BookPage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // Debounced filter change
  const handleFilterChange = debounce((value) => {
    const searchValue = value.toLowerCase();
    setSearch(searchValue);
    setPageIndex(1);
  }, 300);

  // Update filter state
  const onFilterChange = (e) => {
    setFilter(e.target.value);
    handleFilterChange(e.target.value);
  };

  //  Fetch books
  const fetchBooks = async () => {
    const sort = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";
    const result = await getAllBooks({
      page: pageIndex,
      limit: 10,
      sort,
      order,
      filter: search,
    });
    console.log("Fetched books:", result.data);
    setData(result.data || []);
    setTotalPages(result.pagination?.totalPages || 1);
  };

  // useEffect that runs when sorting, filter, pageIndex, or search changes
  useEffect(() => {
    fetchBooks();
  }, [sorting, filter, pageIndex, search]);

  const handleDelete = async (book_id) => {
    await deleteBook(book_id);
    await fetchBooks(); //
  };

  // Fetch authors once
  useEffect(() => {
    const fetchAuthors = async () => {
      const result = await getAllAuthors();
      setAuthors(result.Authors || []);
    };
    fetchAuthors();
  }, []);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      setCategories(result.Categories || []);
    };
    fetchCategories();
  }, []);

  //  Edit handler
  const handleEdit = (book) => {
    setEditingBook({ ...book });
    setShowModal(true);
  };

  // Save handler
  const handleSaveBook = async (bookData) => {
    if (editingBook) {
      await updateBook(editingBook.id, bookData);
    }
    setShowModal(false);
    setEditingBook(null);
    fetchBooks();
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Book ID",
    },
    {
      accessorKey: "title",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span>Title</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-tealGreenish "
          >
            {/* Sorting */}
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.toggleSorting(true)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.clearSorting()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <X className="mr-2 h-4 w-4" /> Unsort
            </DropdownMenuItem>

            {/* Filter */}
            <DropdownMenuItem
              onClick={() => alert("Add filter logic here")}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Filter
            </DropdownMenuItem>

            {/* Toggle this column */}
            <DropdownMenuItem
              onClick={() => column.toggleVisibility()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              {column.getIsVisible() ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Hide Column
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Show Column
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Submenu for column visibility */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center data-[state=open]:!bg-darkTealGreenish data-[highlighted]:!bg-darkTealGreenish data-[highlighted]:!text-white">
                <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" />{" "}
                Show Columns
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-left bg-tealGreenish"
                >
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide() && col.id !== "_")
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                        className="capitalize hover:!bg-darkTealGreenish hover:!text-white"
                      >
                        {col.columnDef.header instanceof Function
                          ? col.id
                          : col.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    ))}
                </motion.div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },

    {
      accessorKey: "category",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span>Category</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-tealGreenish "
          >
            {/* Sorting */}
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.toggleSorting(true)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.clearSorting()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <X className="mr-2 h-4 w-4" /> Unsort
            </DropdownMenuItem>

            {/* Filter */}
            <DropdownMenuItem
              onClick={() => alert("Add filter logic here")}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Filter
            </DropdownMenuItem>

            {/* Toggle this column */}
            <DropdownMenuItem
              onClick={() => column.toggleVisibility()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              {column.getIsVisible() ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Hide Column
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Show Column
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Submenu for column visibility */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center data-[state=open]:!bg-darkTealGreenish data-[highlighted]:!bg-darkTealGreenish data-[highlighted]:!text-white">
                <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" />{" "}
                Show Columns
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-left bg-tealGreenish"
                >
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide() && col.id !== "_")
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                        className="capitalize hover:!bg-darkTealGreenish hover:!text-white"
                      >
                        {col.columnDef.header instanceof Function
                          ? col.id
                          : col.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    ))}
                </motion.div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "author",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span>Author</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-tealGreenish "
          >
            {/* Sorting */}
            <DropdownMenuItem
              onClick={() => column.toggleSorting(false)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.toggleSorting(true)}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => column.clearSorting()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <X className="mr-2 h-4 w-4" /> Unsort
            </DropdownMenuItem>

            {/* Filter */}
            <DropdownMenuItem
              onClick={() => alert("Add filter logic here")}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              <Filter className="mr-2 h-4 w-4" /> Filter
            </DropdownMenuItem>

            {/* Toggle this column */}
            <DropdownMenuItem
              onClick={() => column.toggleVisibility()}
              className="hover:!bg-darkTealGreenish hover:!text-white"
            >
              {column.getIsVisible() ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Hide Column
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Show Column
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Submenu for column visibility */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center data-[state=open]:!bg-darkTealGreenish data-[highlighted]:!bg-darkTealGreenish data-[highlighted]:!text-white">
                <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" />{" "}
                Show Columns
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="origin-top-left bg-tealGreenish"
                >
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide() && col.id !== "_")
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                        className="capitalize hover:!bg-darkTealGreenish hover:!text-white"
                      >
                        {col.columnDef.header instanceof Function
                          ? col.id
                          : col.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    ))}
                </motion.div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "CoverImage",
      header: "Cover Image",
      cell: ({ row }) => {
        const url = row.getValue("CoverImage") || "";

        return (
          <img
            src={url}
            alt="Cover"
            className="w-16 h-20 object-cover rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2014/09/08/05/06/book-438935_1280.png";
            }}
          />
        );
      },
    },
    {
      accessorKey: "genres",
      header: "Genre",
    },
    {
      accessorKey: "publishedYear",
      header: "Year",
    },
    {
      accessorKey: "totalCopies",
      header: "Total Copy",
    },
    {
      accessorKey: "availableCopies",
      header: "Available Copy",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const book = row.original; // Access the book data for the current row

        return (
          <div className="flex space-x-2">
            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(book)}
            >
              <PencilIcon size={16} />
              Edit
            </Button>

            {/* Delete Button */}
            <Button
              variant="outline"
              size="sm"
              className="text-red-500"
              // onClick={() =>  handleDelete(book.book_id)}
              onClick={() => {
                console.log("Book object:", book);
                handleDelete(book.id);
              }}
            >
              <TrashIcon size={16} />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex items-center py-4 ">
        <Input
          type="text"
          value={filter}
          onChange={onFilterChange}
          placeholder="Search by title, author, genre, or year"
          className="input-inside"
        />
      </div>
      <Table className="bg-white !text-center !px-3 rounded-2xl dark:bg-darkTealGreenish dark:text-white text-black overflow-x-scroll">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="!text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((p) => Math.max(p - 1, 1))}
          disabled={pageIndex === 1}
          className="!bg-tealGreenish !text-white !hover:bg-tealGreenish cursor-pointer"
        >
          Previous
        </Button>
        <span className="text-sm text-white">
          Page {pageIndex} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((p) => p + 1)}
          disabled={pageIndex >= totalPages}
          className="!bg-tealGreenish !text-white !hover:bg-tealGreenish cursor-pointer"
        >
          Next
        </Button>
      </div>

      {/* Modal for Adding & Editing book */}
      {showModal && editingBook && (
        <BookEditForm
          initialValues={editingBook}
          authors={authors}
          categories={categories}
          onClose={() => {
            setShowModal(false);
            setEditingBook(null);
          }}
          onSave={handleSaveBook}
        />
      )}
    </div>
  );
};

export default BookPage;
