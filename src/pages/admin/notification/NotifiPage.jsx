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
import { ChevronDown, ArrowUp, ArrowDown, X, PencilIcon, TrashIcon, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import NotificationEditForm from "./NotificationEditForm";

import {
  getAllNotifications,
  updateNotification,
  deleteNotification,
} from "../../../api/notification";

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

  // const handleSearch = debounce((value) => {
  //   setPageIndex(1);
  //   setSearch(value.toLowerCase());
  // }, 300);

  const columns = [
    columnHelper.accessor("notification_id", {
      header: "Notification ID",
    }),
    columnHelper.accessor((row) => row.user?.email, {
      id: "email",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-tealGreenish active:bg-gray-700 hover:text-white dark:hover:text-white">
              <span className="text-center">Email</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="text-white bg-tealGreenish">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUp className="mr-2 h-4 w-4" /> Sort Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDown className="mr-2 h-4 w-4" /> Sort Desc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <X className="mr-2 h-4 w-4" /> Unsort
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <LayoutGrid className="mr-2 h-4 w-4" /> Show Columns
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
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(notification.notification_id)}
            >
              <TrashIcon size={16} />
              Delete
            </Button>
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
      <div className="flex items-center py-4">
         <Input
                  type="text"
                  placeholder="Search by name, email, etc."
                  className="max-w-sm input-inside"
                  onChange={(e) => handleFilterChange(e.target.value)}
                />
        
      </div>

      <Table className="bg-white !text-center !px-3 rounded-2xl dark:bg-darkTealGreenish dark:text-white text-black overflow-x-scroll">
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
        <span className="text-sm text-white">
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
