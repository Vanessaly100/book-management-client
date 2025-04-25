import React from 'react'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Shield, User } from "lucide-react";
import debounce from "lodash.debounce";

import  { useEffect, useState } from "react";
import { getAllUsers } from "../../api/users";
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
} from "../../components/ui/table";

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

import { ChevronDown, EyeOff, Eye, Filter, ArrowUp, ArrowDown, X,LayoutGrid } from "lucide-react";

import {useCallback} from "react";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const handleFilterChange = debounce((value) => {
  setFilter(value);
  setPageIndex(1); // reset to page 1 when filtering
}, 300);

  const fetchUsers = useCallback(async () => {
  const sort = sorting[0]?.id;
  const order = sorting[0]?.desc ? "desc" : "asc";
  const result = await getAllUsers({
    page: pageIndex,
    limit: 10,
    sort,
    order,
    filter,
  });
  setData(result.users || []);
}, [sorting, filter, pageIndex]);

useEffect(() => {
  fetchUsers();
}, [fetchUsers]);

  const columns = [
    {
      accessorKey: "user_id",
      header: "User ID",
    },
    {
  accessorKey: "first_name",
  header: ({ column, table }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>FirstName</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='bg-tealGreenish '>
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
  accessorKey: "last_name",
  header: ({ column, table }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>LastName</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='bg-tealGreenish '>
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
  accessorKey: "email",
  header: ({ column, table }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
          <span>Email</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='bg-tealGreenish '>
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
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "reading_preferences",
      header: "Reading Preferences",
    },
    {
      accessorKey: "points",
      header: "Points",
    },
    {
      accessorKey: "membership_type",
      header: "Membership Type",
    },
    {
      accessorKey: "rewarded",
      header: "Rewarded",
    },
    {
      accessorKey: "profile_picture_url",
      header: "Profile Picture",
    },
    {
  accessorKey: "role",
  header: "Role",
  cell: ({ row }) => {
    const role = row.getValue("role");

    return (
      <Button
        variant="outline"
        className={`px-3 py-1 text-sm rounded-full flex items-center gap-2 pointer-events-none
          ${
            role === "admin"
              ? "bg-red-100 text-red-700 dark:bg-red-200/20 dark:text-red-400"
              : "bg-green-100 text-green-700 dark:bg-green-200/20 dark:text-green-400"
          }`}
      >
        {role === "admin" ? (
          <>
            <Shield className="w-4 h-4" />
            Admin
          </>
        ) : (
          <>
            <User className="w-4 h-4" />
            User
          </>
        )}
      </Button>
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
      <div className="flex items-center py-4">
        <Input
  placeholder="Filter by name/email..."
  onChange={(e) => handleFilterChange(e.target.value)}
  className="max-w-sm input-inside"
/>
      </div>
      <Table className='bg-white text-center !px-3 rounded-2xl dark:bg-darkTealGreenish dark:text-white text-black overflow-x-scroll'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
    </div>
  );
}


export default UserPage