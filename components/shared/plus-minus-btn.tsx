import { MouseEventHandler } from "react";

import { Loader, LucideIcon } from "lucide-react";

import { Button } from "../ui/button";

type PlusMinusBtnPros = {
  Icon: LucideIcon;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isPending: boolean;
  isButtonPending: boolean | undefined;
};

const PlusMinusBtn = ({
  Icon,
  onClick,
  isPending,
  isButtonPending,
}: PlusMinusBtnPros) => {
  return (
    <Button type="button" variant="outline" onClick={onClick}>
      {isButtonPending && isPending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Icon className="size-4" />
      )}
    </Button>
  );
};

export default PlusMinusBtn;
