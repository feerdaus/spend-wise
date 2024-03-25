import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string | React.ReactNode;
  className: string;
}

export const Button: React.FC<ButtonProps> = ({ text, className }) => {
  const { pending } = useFormStatus();
  console.log(pending, "pending");
  return (
    <button type="submit" className={className || "btn btn-primary md:w-1/6"}>
      {pending ? (
        <div className="flex items-center gap-2 justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
        </div>
      ) : (
        text
      )}
    </button>
  );
};
