import { vh } from "@/helpers/responsivesizes";
import { category } from "@/types/app";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { lightTheme } from "./Colors";
import { ReactNode } from "react";

// Income Categories
export const incomeCategories: category[] = [
  {
    name: "Salary",
    color: "#2A1456",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="money" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Business",
    color: "#3B1F72",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="building" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Freelance",
    color: "#512C91",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="laptop" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Investments",
    color: "#6A42AD",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="line-chart" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Gifts",
    color: "#845EC2",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="gift" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Refunds",
    color: "#B39CD0",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="undo" size={vh(2)} color={color} />
    ),
  },
];

// Expense Categories
export const expenseCategories: category[] = [
  {
    name: "Food",
    color: "#FF6F61",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="cutlery" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Transport",
    color: "#FF9671",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="car" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Housing",
    color: "#FFC75F",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="home" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Health",
    color: "#F9F871",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="heartbeat" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Shopping",
    color: "#D65DB1",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="shopping-bag" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Entertainment",
    color: "#FF9671",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="gamepad" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Finance",
    color: "#845EC2",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="credit-card" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Education",
    color: "#4B4453",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="book" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Family",
    color: "#2A1456",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="users" size={vh(2)} color={color} />
    ),
  },
  {
    name: "Others",
    color: "#C3C3C3",
    logo: (color = lightTheme.gray3) => (
      <FontAwesome name="asterisk" size={vh(2)} color={color} />
    ),
  },
];

interface logoProps {
  name: string;
  type: "Expense" | "Income";
}

export const ReturnCategoryLogo = ({ name, type }: logoProps) => {
  var logo:(color?: string) => ReactNode  = () => <Feather name="divide-circle"/>;
  var color = ""
  if (type == "Expense") {
    expenseCategories.forEach((category) => {
      if (category.name == name) {
        logo = category.logo;
        color = category.color
      }
    });
  } else {
    incomeCategories.forEach((category) => {
      if (category.name == name) {
        logo = category.logo;
        color = category.color
      }
    });
  }

  return {logo , color}
};
