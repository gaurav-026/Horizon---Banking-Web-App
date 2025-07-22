import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";

//Dummy INteface
interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: "debit" | "credit";
  date: string;
  paymentChannel: string;
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;
  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)}></div>
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};
const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  //Dummy Data
  // const transactions: Transaction[] = [
  //   {
  //     id: "txn_001",
  //     name: "Starbucks Coffee",
  //     amount: 450,
  //     type: "debit",
  //     date: "2025-07-12T10:24:00Z",
  //     paymentChannel: "online",
  //     category: "Food & Drink",
  //   },
  //   {
  //     id: "txn_002",
  //     name: "Salary July",
  //     amount: 55000,
  //     type: "credit",
  //     date: "2025-07-01T09:00:00Z",
  //     paymentChannel: "direct_deposit",
  //     category: "Payment",
  //   },
  //   {
  //     id: "txn_003",
  //     name: "Amazon Purchase",
  //     amount: 1299,
  //     type: "debit",
  //     date: "2025-07-10T18:30:00Z",
  //     paymentChannel: "online",
  //     category: "default",
  //   },
  //   {
  //     id: "txn_004",
  //     name: "Rent Payment",
  //     amount: 12000,
  //     type: "debit",
  //     date: "2025-07-03T07:45:00Z",
  //     paymentChannel: "bank_transfer",
  //     category: "Bank Fees",
  //   },
  //   {
  //     id: "txn_005",
  //     name: "PhonePe Cashback",
  //     amount: 150,
  //     type: "credit",
  //     date: "2025-07-14T13:12:00Z",
  //     paymentChannel: "online",
  //     category: "Transfer",
  //   },
  //   {
  //     id: "txn_006",
  //     name: "Big Bazaar Groceries",
  //     amount: 2400,
  //     type: "debit",
  //     date: "2025-07-07T17:15:00Z",
  //     paymentChannel: "in_store",
  //     category: "Processing",
  //   },
  //   {
  //     id: "txn_007",
  //     name: "Big Bazaar",
  //     amount: 2400,
  //     type: "debit",
  //     date: "2025-07-07T17:15:00Z",
  //     paymentChannel: "in_store",
  //     category: "Success",
  //   },
  // ];
  console.log(transactions);
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2!">Transaction</TableHead>
          <TableHead className="px-2!">Amount</TableHead>
          <TableHead className="px-2!">Status</TableHead>
          <TableHead className="px-2!">Date</TableHead>
          <TableHead className="px-2! max-md:hidden">Channel</TableHead>
          <TableHead className="px-2! max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);
          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || amount[0] === "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]"
              } !over:bg-none !border-b-DEFAULT `}
            >
              <TableCell className="max-w-[250px] pl-2! pr-10!">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`${
                  isDebit || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                } pl-2! pr-10! font-semibold`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2! pr-10!">
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className="pl-2! pr-10! min-w-32">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className="max-md:hidden pl-2! pr-10! capitalize min-w-24">
                {t.paymentChannel}
              </TableCell>
              <TableCell className="max-md:hidden pl-2! pr-10!">
                <CategoryBadge category={t.category || 'Payment'} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
