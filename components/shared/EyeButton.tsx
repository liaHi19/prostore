import { SetStateAction } from "react";

import { Eye, EyeOff } from "lucide-react";

const EyeButton = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: SetStateAction<boolean>) => void;
}) => {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setShow((prev) => !prev)}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer z-5"
    >
      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
};

export default EyeButton;
