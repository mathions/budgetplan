"use client"

import { useEffect, useState } from "react";
import { Student } from "./types";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { FooterCell } from "./FooterCell";
import useStudents from "./useStudents";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"

export const DataTable = () => {
  const { data: originalData, isValidating, addRow, updateRow, deleteRow } = useStudents();
  const [data, setData] = useState<Student[]>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});

  useEffect(() => {
    if (isValidating) return;
    setData([...originalData]);
  }, [isValidating]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].id, data[rowIndex]);
      },
      updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      addRow: () => {
        const id = Math.floor(Math.random() * 10000);
        const newRow: Student = {
          id,
          studentNumber: id,
          name: "",
          dateOfBirth: "",
          major: ""
        };
        addRow(newRow);
      },
      removeRow: (rowIndex: number) => {
        deleteRow(data[rowIndex].id);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          deleteRow(data[rowIndex].id);
        });
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>6023.EBB</TableCell>
            <TableCell>Layanan Sarana dan Prasarana Internal</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell>Rp 3,052,324,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6023.EBB.951</TableCell>
            <TableCell>Layanan Sarana Internal</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell>Rp 2,196,324,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>055</TableCell>
            <TableCell>Kendaraan Bermotor Perwakilan RI</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell>Rp 900,000,000</TableCell>
          </TableRow>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>056</TableCell>
            <TableCell>Perangkat Pengolah Data dan Komunikasi Perwakilan</TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell>Rp 268,000,000</TableCell>
          </TableRow>
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
        <TableFooter>
          <TableRow>
            <TableHead colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </div>

  );
};