"use client";
import { Input } from "./Input";

const startDate = new Date();
startDate.setDate(1);
const startOfMonth = startDate.toISOString().split("T")[0];
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 1);
endDate.setDate(0);
const endOfMonth = endDate.toISOString().split("T")[0];

export const FilterForm = () => {
  return (
    <form className="">
      <Input
        name="startFrom"
        label="Start Date"
        inputProps={{ type: "date", defaultValue: startOfMonth }}
        inputContainerProps={{ className: "mb-4" }}
      />
      <Input
        name="endAt"
        label="End Date"
        inputProps={{ type: "date", defaultValue: endOfMonth }}
        inputContainerProps={{ className: "mb-4" }}
      />
      <button className="btn btn-primary">Apply</button>
    </form>
  );
};
