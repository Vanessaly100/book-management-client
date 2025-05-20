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
import {
  getAllReservations,
  deleteReservation,
  fulfillReservation,
  cancelReservationByAdmin,
} from "../../../api/reservationApi";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const ReservationPage = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState("");
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

  const fetchReservations = useCallback(async () => {
    const sort = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";
    const result = await getAllReservations({
      page: pageIndex,
      limit: 10,
      sort,
      order,
      filter,
      search,
      // status,
    });
    console.log("reservation", result.reservations);
    setData(result.reservations || []);
    setTotalPages(result.pagination?.totalPages || 1);
  }, [sorting, filter, search, pageIndex]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleFulfill = async (reservationId) => {
    try {
      const result = await fulfillReservation(reservationId);
      console.log("Reservation fulfilled:", result);
      // Optionally refresh list or show toast
    } catch (error) {
      console.error("Error fulfilling reservation:", error);
    }
  };

  const handleCancel = async (reservationId) => {
    try {
      const result = await cancelReservationByAdmin(reservationId);
      console.log("Reservation cancelled:", result);
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteReservation(id);
    fetchReservations();
  };

  const columns = [
    {
      accessorKey: "reservation_id",
      header: "Reservation Id",
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
      accessorKey: "book.title",
      header: ({ column, table }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center space-x-2 bg-transparent hover:bg-ActionPurple active:!bg-ActionPurple hover:text-white dark:hover:text-white  
             data-[state=open]:bg-ActionMiniPurple data-[state=open]:text-white"
            >
              <span>Book Name</span>
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
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "reservation_date",
      header: "Reservation Date",
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
        const reservation = row.original;

        return (
          <div className="flex space-x-2">
            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFulfill(reservation.reservation_id)}
              className="cursor-pointer"
            >
              <PencilIcon size={16} />
              Fulfill
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCancel(reservation.reservation_id)}
              className="cursor-pointer"
            >
              <PencilIcon size={16} />
              Cancel
            </Button>

            {/* Delete Button */}
            <ConfirmDeleteModal
              title="Delete Book"
              message="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(reservation.reservation_id)}
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
        Reservation Table
      </h1>
      <div className="flex items-center py-4 justify-between w-[-60%]">
        <div className="w-[-60%]">
          <Input
            type="text"
            value={filter}
            onChange={onFilterChange}
            placeholder="Search by Title, userName, genre, or Email"
            className=" w-[-60%] input-inside m-0 border-black dark:border-white dark:text-white text-black placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
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
      {/* {showModal && editingBorrows && (
        <BorrowEditForm
          initialValues={editingBorrows} 
          onClose={() => {
            setShowModal(false);
            setEditingBorrows(null);
          }}
          onSave={handleSaveBorrow}
        />
      )} */}
    </div>
  );
};

export default ReservationPage;
