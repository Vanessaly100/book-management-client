
import React from 'react'
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Shield, User,PencilIcon, TrashIcon } from "lucide-react";
import debounce from "lodash.debounce";

import  { useEffect, useState } from "react";

import {flexRender,getCoreRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
} from "../../../components/ui/table";

import { motion } from "framer-motion";

import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,
  DropdownMenuItem,DropdownMenuSeparator,DropdownMenuCheckboxItem,
  DropdownMenuSub,DropdownMenuSubTrigger,DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, EyeOff, Eye, Filter, ArrowUp, ArrowDown, X,LayoutGrid } from "lucide-react";
import {useCallback} from "react";
import AuthorEditForm from './AuthorEditForm';
import { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } from "../../../api/author";



const AuthorPage = () => {

 const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingAuthors, setEditingAuthors] = useState(null);

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
      limit: 10,
      sort,
      order,
      filter,
    });
    setData(result.Authors || []);
;
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
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>Name</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-tealGreenish '>
        {/* Sorting */}
        <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.clearSorting()} className="hover:!bg-darkTealGreenish hover:!text-white">
          <X className="mr-2 h-4 w-4" /> Unsort
        </DropdownMenuItem>

        {/* Filter */}
        <DropdownMenuItem onClick={() => alert("Add filter logic here")} className="hover:!bg-darkTealGreenish hover:!text-white">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </DropdownMenuItem>

        {/* Toggle this column */}
        <DropdownMenuItem onClick={() => column.toggleVisibility()} className="hover:!bg-darkTealGreenish hover:!text-white">
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
            <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" /> Show Columns
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
}

,
    {
  accessorKey: "bio",
  header: ({ column, table }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>BIO</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-tealGreenish '>
        {/* Sorting */}
        <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.clearSorting()} className="hover:!bg-darkTealGreenish hover:!text-white">
          <X className="mr-2 h-4 w-4" /> Unsort
        </DropdownMenuItem>

        {/* Filter */}
        <DropdownMenuItem onClick={() => alert("Add filter logic here")} className="hover:!bg-darkTealGreenish hover:!text-white">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </DropdownMenuItem>

        {/* Toggle this column */}
        <DropdownMenuItem onClick={() => column.toggleVisibility()} className="hover:!bg-darkTealGreenish hover:!text-white">
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
            <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" /> Show Columns
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
}
,
    {
  accessorKey: "social_media",
  header: ({ column, table }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>Social Media</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-tealGreenish '>
        {/* Sorting */}
        <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="hover:!bg-darkTealGreenish hover:!text-white">
          <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.clearSorting()} className="hover:!bg-darkTealGreenish hover:!text-white">
          <X className="mr-2 h-4 w-4" /> Unsort
        </DropdownMenuItem>

        {/* Filter */}
        <DropdownMenuItem onClick={() => alert("Add filter logic here")} className="hover:!bg-darkTealGreenish hover:!text-white">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </DropdownMenuItem>

        {/* Toggle this column */}
        <DropdownMenuItem onClick={() => column.toggleVisibility()} className="hover:!bg-darkTealGreenish hover:!text-white">
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
            <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" /> Show Columns
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
}
,

    
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
        >
          <PencilIcon size={16} />
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          variant="outline"
          size="sm"
          className="text-red-500"
          onClick={() => handleDelete(author.author_id)}
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
      <div className="flex items-center py-4 ">
<Input
  type="text"
  placeholder="Search by name, email, etc."
  className="max-w-sm input-inside"
  onChange={(e) => handleFilterChange(e.target.value)}
/>

      </div>
      <Table className='bg-white !text-center !px-3 rounded-2xl dark:bg-darkTealGreenish dark:text-white text-black overflow-x-scroll'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}  className="!text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
        >
          Previous
        </Button>
        <span className="text-sm">Page {pageIndex}</span>
        <Button variant="outline" size="sm" onClick={() => setPageIndex(pageIndex + 1)}>
          Next
        </Button>
      </div>
      
      {/* Modal for Adding & Editing author */}
{showModal && editingAuthors && (
  <AuthorEditForm
    initialValues={editingAuthors} // 👈 Now correct author data is passed
    onClose={() => {
      setShowModal(false);
      setEditingAuthors(null);
    }}
    onSave={handleSaveAuthor}
    
  />
)}

    </div>
  );
}


export default AuthorPage