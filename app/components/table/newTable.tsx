import { ReactNode, useState } from "react";
import { Loader } from "lucide-react";
import { Pagination, Table, TableBody, TableColumn, TableHeader } from "@heroui/react";

interface ColumnInterface {
    title: string;
    allowSort?: boolean;
}

export default function NewCustomTable(
    {
        totalPages,
        loadingState,
        columns,
        children,
        page,
        setPage,
    }: {
        totalPages: number,
        loadingState: any,
        columns: ColumnInterface[];
        children: ReactNode[] | any;
        page: number,
        setPage: (page: number) => void
    }) {

    return (
        <div className="z-0">
            <Table className="mt-6" aria-label="Example table with custom cells"
                classNames={{
                    base: "h-[68vh] overflow-y-auto w-screen md:w-full overflow-x-auto  shadow-none",
                    wrapper:
                        "dark:bg-default-50 bg-white vertical-scrollbar horizontal-scrollbar shadow-md  rounded-2xl dark:border border-white/20",
                    td: "font-nunito text-xs text-slate-500 dark:text-slate-200 ",
                }}
            >
                <TableHeader className="" >
                    {columns.map((column, index: number) => (
                        <TableColumn
                            key={index}
                            allowsSorting={column?.allowSort}
                            className="  font-montserrat font-semibold text-sm text-slate-500 dark:text-slate-200 text-left"
                        >
                            {column?.title}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody
                    loadingState={loadingState}
                    loadingContent={<Loader className="text-white" />}
                    emptyContent={
                        <div className="h-full flex  ">
                            <img className="h-[65vh]" src="" alt="" />
                        </div>
                    }
                >
                    {children}
                </TableBody>
            </Table>

            <div className="flex w-full mt-2">
                {totalPages > 1 && (
                    <Pagination
                        page={page}
                        total={totalPages}
                        onChange={(page: number) => setPage(page)}
                        color="primary"
                        showControls
                        showShadow
                        size="sm"
                        classNames={{
                            item: "font-montserrat font-semibold bg-white dark:bg-slate-800 dark:text-white",
                            next: "font-montserrat font-semibold bg-white dark:bg-slate-800 dark:text-white",
                            prev: "font-montserrat font-semibold bg-white dark:bg-slate-800 dark:text-white",
                        }}
                    />
                )}
            </div>

        </div>
    );
}
