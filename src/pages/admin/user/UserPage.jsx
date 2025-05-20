import React from 'react'
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Shield, User,PencilIcon, TrashIcon } from "lucide-react";
import debounce from "lodash.debounce";
import  { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserByAdmin } from "../../../api/users";
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
import UserEditForm from './UserEditForm';
import UserDetailsModal from './UserDetialModal';



const UserPage = () => {

 const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  //user details modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleFilterChange = debounce((value) => {
    const searchValue = value.toLowerCase();
    setFilter(searchValue);
    setPageIndex(1);
  }, 300);

  const fetchUsers = useCallback(async () => {
    const sort = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";
    const result = await getAllUsers({
      page: pageIndex,
      limit: 5,
      sort,
      order,
      filter,
    });
    setData(result.users || []);
     setTotalPages(result.pagination?.totalPages || 1);
  }, [sorting, filter, pageIndex]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user) => {
  setEditingUser({ ...user });
  setShowModal(true);
};


  const handleSaveUser = async (updatedData) => {
    if (editingUser) {
      await updateUserByAdmin(editingUser.user_id, updatedData);
    }
    setShowModal(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

 const handleViewUser = async (userId) => {
  try {
    const res = await fetch(`http://localhost:4000/api/user/${userId}/details`, {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok) {
      console.error("Failed to fetch user details:", res.statusText);
      return;
    }

    const data = await res.json();
    setSelectedUser(data); 
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};


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
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white">
          <span>FirstName</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-ActionMiniPurple '>
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
                    className="capitalize  hover:!bg-ActionMiniPurple !text-white"
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
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white">
          <span>LastName</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-ActionMiniPurple '>
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
                    className="capitalize hover:!bg-ActionMiniPurple !text-white"
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
        <Button className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white">
          <span>Email</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='text-white bg-ActionMiniPurple'>
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
                    className="capitalize hover:!bg-ActionMiniPurple !text-white"
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
      accessorKey: "phone_number",
      header: "PhoneNumber",
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
  accessorKey: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const user = row.original; 

    return (
      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={() => handleViewUser(user.user_id)}
          className=' !text-black !bg-Gold !hover:bg-tealGreenish cursor-pointer'
        >
          <Eye size={16} />
          View
        </Button>
        {/* Edit Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(user)}
          className='cursor-pointer'
        >
          <PencilIcon size={16} />
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 cursor-pointer"
          onClick={() => handleDelete(user.user_id)}
        >
          <TrashIcon size={16} />
          Delete
        </Button>
      </div>
    );
  },
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
       <h1 className="text-ActionPurple font-bold text-3xl pb-5">User Table</h1>
      <div className="flex items-center py-6 mb-8 w-[60%]">
<Input
  type="text"
  placeholder="Search by name, email, etc."
  className="input-inside m-0 border-black dark:border-white dark:text-white text-black placeholder:text-slate-900 dark:placeholder:text-white"
  onChange={(e) => handleFilterChange(e.target.value)}
/>

      </div>
      <Table className='!text-center !px-3  dark:text-white text-black overflow-x-scroll  !border border-slate-300 bg-white p-4 transition-colors dark:border-slate-700 dark:bg-darkMainCardBg'>
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
            className='!bg-tealGreenish !text-white !hover:bg-tealGreenish cursor-pointer'
        >
          Previous
        </Button>
        <span className="text-sm dark:text-white text-black">Page {pageIndex} of {totalPages}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((p) => p + 1)}
          disabled={pageIndex >= totalPages}
          className='!bg-tealGreenish !text-white !hover:bg-tealGreenish cursor-pointer'
        >
          Next
        </Button>
      </div>
      
      {/* Modal for Adding & Editing user */}
{showModal && editingUser && (
  <UserEditForm
    initialValues={editingUser} 
    onClose={() => {
      setShowModal(false);
      setEditingUser(null);
    }}
    onSave={handleSaveUser}
    
  />
)}

 <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}


export default UserPage