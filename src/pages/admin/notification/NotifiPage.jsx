import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUp, ArrowDown, X, PencilIcon, TrashIcon, LayoutGrid,PlusIcon, } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import NotificationEditForm from "./NotificationEditForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getAllNotifications,
  updateNotification,
  deleteNotification,
} from "../../../api/notification";
// import NotificationAddForm from "./NotificationAddForm";
import NotifySingleForm from "./NotifySingleForm";
import NotifyAllForm from "./NotifyAllForm";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const columnHelper = createColumnHelper();

const NotifiPage = () => {
  const [data, setData] = useState([]);
   const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingNotifications, setEditingNotifications] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = debounce((value) => {
      const searchValue = value.toLowerCase();
      setFilter(searchValue);
      setPageIndex(1);
    }, 300);
  
    const fetchNotifications = useCallback(async () => {
      const sort = sorting[0]?.id;
      const order = sorting[0]?.desc ? "desc" : "asc";
      const result = await getAllNotifications({
        page: pageIndex,
        limit: 10,
        sort,
        order,
        filter,
      });
      console.log("Fetched notification:", result.notifications);
      setData(result.notifications || []);
       setTotalPages(result.pagination?.totalPages || 1);
    }, [sorting, filter, pageIndex]);
  
    
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);


  const handleEdit = (notification) => {
    setEditingNotifications({ ...notification });
    setShowModal(true);
  };

  const handleSaveNotification = async (updatedData) => {
    console.log("Updated data:", updatedData);
    if (editingNotifications) {
      await updateNotification(editingNotifications.notification_id, updatedData);
    }
    setShowModal(false);
    setEditingNotifications(null);
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  
  const columns = [
    columnHelper.accessor("notification_id", {
      header: "Notification ID",
    }),
    columnHelper.accessor((row) => row.user?.email, {
      id: "email",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white">
              <span className="text-center">Email</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="text-white bg-ActionMiniPurple">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="hover:!bg-darkTealGreenish hover:!text-white">
              <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="hover:!bg-darkTealGreenish hover:!text-white">
              <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.clearSorting()} className="hover:!bg-darkTealGreenish hover:!text-white">
              <X className="mr-2 h-4 w-4" /> Unsort
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LayoutGrid className="mr-2 h-4 w-4 hover:!bg-darkTealGreenish hover:!text-white" /> Show Columns
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent asChild>
                <motion.div className="origin-top-left bg-tealGreenish">
                  {table
                    .getAllColumns()
                    .filter((col) => col.getCanHide() && col.id !== "_")
                    .map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) => col.toggleVisibility(!!value)}
                        className=" hover:bg-ActionMiniPurple text-white"
                      >
                        {typeof col.columnDef.header === "function" ? col.id : col.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    ))}
                </motion.div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
    columnHelper.accessor((row) => row.user?.first_name, {
  id: 'user.first_name',
  header: 'User Name',
  cell: (info) => info.getValue() ?? '—',
}),
columnHelper.accessor((row) => row.book?.title, {
  id: 'book.title',
  header: 'Book',
  cell: (info) => info.getValue() ?? '—',
}),
    columnHelper.accessor("type", {
      header: "Type",
    }),
    columnHelper.accessor("message", {
      header: "Message",
    }),
    columnHelper.accessor("is_read", {
      header: "Status",
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(notification)}
              className="cursor-pointer"
            >
              <PencilIcon size={16} />
              Edit
            </Button>
             <ConfirmDeleteModal
                          title="Delete Book"
                          message="Are you sure you want to delete this book?"
                          onConfirm={() => handleDelete(notification.notification_id)}
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
    }),
  ];

  const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
    pagination: {
      pageIndex: pageIndex - 1,  // zero-based for the table
      pageSize: 10,
    },
  },
  manualPagination: true,
  pageCount: totalPages,
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});


  return (
    <div>
       <h1 className="text-ActionPurple font-bold text-3xl pb-5">Notification Table</h1>
       <div className="flex justify-between gap-4 items-center py-6">
       <div className="flex items-center py-4 w-[60%]  m-0 ">
         <Input
                  type="text"
                  placeholder="Search by name, email, etc."
                  className="input-inside m-0 border-black dark:border-white dark:text-white text-black placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  onChange={(e) => handleFilterChange(e.target.value)}
                />
        </div>
         <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-primary bg-ActionPurple text-white cursor-pointer">
                            <PlusIcon className="mr-2" />
                            Notify User
                          </Button>
                        </DialogTrigger>
              
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg">
                          <DialogTitle className="text-xl font-semibold mb-4">
                            Add Notification for Single User
                          </DialogTitle>
              
                          {/* Wrap the form in a scrollable container if it's too long */}
                          <div className="space-y-4 overflow-y-auto">
                            <NotifySingleForm
                              onSuccess={(handleAuthorSuccess) => {
                                fetchNotifications(); 
                                toast.success(
                                  `${handleAuthorSuccess.title} added successfully`
                                );
                              }}
                             
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
         <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-primary bg-ActionPurple text-white cursor-pointer">
                            <PlusIcon className="mr-2" />
                            Notify All User
                          </Button>
                        </DialogTrigger>
              
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-lg">
                          <DialogTitle className="text-xl font-semibold mb-4">
                            Add Notification for All User
                          </DialogTitle>
              
                          {/* Wrap the form in a scrollable container if it's too long */}
                          <div className="space-y-4 overflow-y-auto">
                            <NotifyAllForm
                              onSuccess={(handleAuthorSuccess) => {
                                fetchNotifications(); 
                                toast.success(
                                  `${handleAuthorSuccess.title} added successfully`
                                );
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
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
  {table.getRowModel().rows.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center">
        No notifications found.
      </TableCell>
    </TableRow>
  ) : (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  )}
</TableBody>

      </Table>

      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((p) => Math.max(p - 1, 1))}
          disabled={pageIndex === 1}
          className="!bg-tealGreenish !text-white"
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
          className="!bg-tealGreenish !text-white"
        >
          Next
        </Button>
      </div>

      {showModal && editingNotifications && (
        <NotificationEditForm
          initialValues={editingNotifications}
          onClose={() => {
            setShowModal(false);
            setEditingNotifications(null);
          }}
          onSave={handleSaveNotification}
        />
      )}
    </div>
  );
};

export default NotifiPage;
