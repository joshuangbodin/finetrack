import { expenseCategories } from "@/constants/data";
import { transaction } from "@/types/app";

export const CalculateExpenseSummary = (list: transaction[]) => {
  let total = 0;
  let income = 0;
  let expense = 0;

  list.forEach((transaction) => {
    if (transaction.type == "Expense") {
      expense = expense + transaction.amount;
    } else {
      income = income + transaction.amount;
    }
  });

  total = income - expense;

  return { total, expense, income };
};

export const GetChartData = (list: transaction[]) => {
  let CategorySum: any[] = [];

  expenseCategories.forEach((category) => {
    let sum = 0;
    list.forEach((transaction) => {
      if (category.name == transaction.category) {
        sum = sum + transaction.amount;
      }
    });

    CategorySum = [
      ...CategorySum,
      { value: sum, text: category.name, color: category.color },
    ];
  });

  CategorySum = [
    ...CategorySum,
    {
      value: CalculateExpenseSummary(list).income,
      text: "income",
      color: "black",
    },
  ];

  return CategorySum;
};

export const GetTransactionAnalytics = (list: transaction[]) => {
  const profit = CalculateExpenseSummary(list).total;
  let highestSum = 0;
  let highestCategory = "";

  const CategoryList = GetChartData(list);

  CategoryList.forEach((category) => {
    if (category.value > highestSum && category.text !== "income") {
      highestSum = category.value;
      highestCategory = category.text;
    }
  });

  const NumberOfTransactions = list.length;

  return { profit, highestCategory, NumberOfTransactions, highestSum };
};
