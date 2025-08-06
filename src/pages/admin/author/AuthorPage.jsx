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
// import { toast } from "react-toastify";

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
  ArrowUp,
  ArrowDown,
  X,
  LayoutGrid,
  PlusIcon,
} from "lucide-react";
import { useCallback } from "react";
import AuthorEditForm from "./AuthorEditForm";
import { getAllAuthors, updateAuthor, deleteAuthor } from "../../../api/author";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthorForm from "./AuthorAddForm";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const AuthorPage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingAuthors, setEditingAuthors] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = debounce((value) => {
    const searchValue = value.toLowerCase();
    setFilter(searchValue);
    setPageIndex(1);
  }, 300);

  const fetchAuthors = useCallback(async () => {
    const sort = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";
    const result = await getAllAuthors({
      page: pageIndex,
      limit: 5,
      sort,
      order,
      filter,
    });
    console.log(result);
    setData(result.authors || []);
    setTotalPages(result.pagination?.totalPages || 1);
  }, [sorting, filter, pageIndex]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleEdit = (author) => {
    setEditingAuthors({ ...author });
    setShowModal(true);
  };

  const handleSaveAuthor = async (updatedData) => {
    if (editingAuthors) {
      await updateAuthor(editingAuthors.author_id, updatedData);
    }
    setShowModal(false);
    setEditingAuthors(null);
    fetchAuthors();
  };

  const handleDelete = async (id) => {
    await deleteAuthor(id);
    fetchAuthors();
  };

  const columns = [
    {
      accessorKey: "author_id",
      header: "Author ID",
    },
    {
      accessorKey: "name",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white"
            >
              <span>Name</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-ActionMiniPurple "
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
                        className="capitalize hover:!bg-ActionMiniPurple hover:!text-white"
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
      accessorKey: "bio",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="!text-center">
            <Button
              className="flex !items-center !text-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white"
            >
              <span>BIO</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-ActionMiniPurple "
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
                        className="capitalize hover:!bg-ActionMiniPurple hover:!text-white"
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
      accessorKey: "social_media",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white"
            >
              <span>Social Media</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-ActionMiniPurple "
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

            {/* Submenu for column visibility */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center data-[state=open]:!bg-darkTealGreenish data-[highlighted]:!bg-darkTealGreenish data-[highlighted]:!text-white">
                <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-ActionMiniPurple hover:!text-white" />{" "}
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
                        className="capitalize hover:!bg-ActionMiniPurple hover:!text-white"
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
      accessorKey: "contact",
      header: "Contact",
    },
    {
      accessorKey: "email",
      header: "Email",
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
        const author = row.original;

        return (
          <div className="flex space-x-2">
            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(author)}
              className="cursor-pointer"
            >
              <PencilIcon size={16} />
              Edit
            </Button>

            {/* Delete Button */}
            <ConfirmDeleteModal
              title="Delete Author"
              message="Are you sure you want to delete this author?"
              onConfirm={() => handleDelete(author.author_id)}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 cursor-pointer"
                >
                  <TrashIcon size={16} />
                  Delete
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div>
      <h1 className="text-ActionPurple font-bold text-3xl pb-5">
        Author Table
      </h1>
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center py-4 w-[60%] m-0 ">
          <Input
            type="text"
            placeholder="Search by name, email, etc."
            className="max-w-sm input-inside  border-black dark:border-white dark:text-white text-black placeholder:text-slate-500 dark:placeholder:text-slate-400"
            onChange={(e) => handleFilterChange(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary bg-ActionPurple text-white cursor-pointer">
              <PlusIcon className="mr-2" />
              Add Author
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg">
            <DialogTitle className="text-xl font-semibold mb-4">
              Add New Author
            </DialogTitle>
            <div className="space-y-4 overflow-y-auto">
              <AuthorForm
                onSuccess={() => {
                  fetchAuthors();
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="bg-white !text-center !px-3 rounded-2xl !border border-slate-300 p-4 transition-colors dark:border-slate-700 dark:bg-darkMainCardBg dark:text-white text-black overflow-x-scroll">
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
        <span className="text-sm dark:text-white text-black">
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

      {/* Modal for Adding & Editing author */}
      {showModal && editingAuthors && (
        <AuthorEditForm
          initialValues={editingAuthors}
          onClose={() => {
            setShowModal(false);
            setEditingAuthors(null);
          }}
          onSave={handleSaveAuthor}
        />
      )}
    </div>
  );
};

export default AuthorPage;
