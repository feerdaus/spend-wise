"use client";
import { useRouter } from "next/navigation";
import { Input } from "./Input";

const startDate = new Date();
startDate.setDate(1);
const startOfMonth = startDate.toISOString().split("T")[0];
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 1);
endDate.setDate(0);
const endOfMonth = endDate.toISOString().split("T")[0];

export const FilterForm = () => {
  const router = useRouter();

  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const startFrom = formData.get("startFrom");
        const endAt = formData.get("endAt");
        router.push(
          `?startDate=${new Date(
            startFrom as string
          ).toISOString()}&endDate=${new Date(endAt as string).toISOString()}`
        );
      }}
    >
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
