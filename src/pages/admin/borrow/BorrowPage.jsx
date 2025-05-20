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
import { useCallback } from "react";
// import AuthorEditForm from "./AuthorEditForm";
import { getAllBorrows, updateBorrow, deleteBorrow } from "../../../api/borrow";
import BorrowEditForm from "./BorrowEditForm";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const BorrowPage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingBorrows, setEditingBorrows] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);

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

  const fetchBorrows = useCallback(async () => {
    const sort = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";
    const result = await getAllBorrows({
      page: pageIndex,
      limit: 10,
      sort,
      order,
      filter,
      search,
      status,
    });
    console.log(result);
    setData(result.borrows || []);
    setTotalPages(result.pagination?.totalPages || 1);
  }, [sorting, filter, search, status, pageIndex]);

  useEffect(() => {
    fetchBorrows();
  }, [fetchBorrows]);

  const handleEdit = (borrow) => {
    setEditingBorrows({ ...borrow });
    setShowModal(true);
  };

  const handleSaveBorrow = async (updatedData) => {
    if (editingBorrows) {
      await updateBorrow(editingBorrows.borrow_id, updatedData);
    }
    setShowModal(false);
    setEditingBorrows(null);
    fetchBorrows();
  };

  const handleDelete = async (id) => {
    await deleteBorrow(id);
    fetchBorrows();
  };

  const columns = [
    {
      accessorKey: "borrow_id",
      header: "Author ID",
    },
    {
      accessorKey: "user.first_name",
      header: "First Name",
    },

    {
      accessorKey: "user.email",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span className="text-center">Email</span>
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
      accessorKey: "book.title",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span>Book Name</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="text-white bg-ActionMiniPurple"
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
      accessorKey: "borrow_date",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white"
            >
              <span>Borrow Date</span>
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
      accessorKey: "return_date",
      header: "Return Date",
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
    },
    {
      accessorKey: "status",
      header: "Status",
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
            <ConfirmDeleteModal
              title="Delete Book"
              message="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(author.borrow_id)}
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
      <h1 className="text-ActionPurple font-bold text-3xl pb-5">Borrow Table</h1>
      <div className="flex items-center py-4 justify-between ">
        
        <div className="w-[60%]">
          <Input
            type="text"
            value={filter}
            onChange={onFilterChange}
            placeholder="Search by Title, userName, genre, or Email"
            className="input-inside m-0border-black dark:border-white dark:text-white text-black placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
        </div>
        <div className="items-center input-inside bg-transparent border-none">
          <label htmlFor="status" className="font-medium">
            Filter by Status:
          </label>
          <select
  id="status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="
     w-full p-2 rounded-lg border border-gray-300 
  bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200
  focus:outline-none focus:ring-2 focus:ring-ActionMiniPurple
  transition-colors duration-200
  "
>
<option value="">All</option>
  <option 
    value="borrowed" 
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-ActionMiniPurple hover:text-white">
    Borrowed
  </option>
  <option 
    value="overdue" 
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white">
    Overdue
  </option>
  <option 
    value="returned" 
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-green-500 hover:text-white">
    Returned
  </option>
</select>

        </div>
        
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
      {showModal && editingBorrows && (
        <BorrowEditForm
          initialValues={editingBorrows}
          onClose={() => {
            setShowModal(false);
            setEditingBorrows(null);
          }}
          onSave={handleSaveBorrow}
        />
      )}
    </div>
  );
};

export default BorrowPage;
