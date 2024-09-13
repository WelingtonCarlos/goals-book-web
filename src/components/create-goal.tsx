import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    RadioGroup,
    RadioGroupIndicator,
    RadioGroupItem,
} from "./ui/radio-group";

const weekOptions = [
  { value: "1", label: "1x na semana", emoji: "🥱" },
  { value: "2", label: "2x na semana", emoji: "🙂" },
  { value: "3", label: "3x na semana", emoji: "😎" },
  { value: "4", label: "4x na semana", emoji: "😜" },
  { value: "5", label: "5x na semana", emoji: "🤨" },
  { value: "6", label: "6x na semana", emoji: "🤯" },
  { value: "7", label: "7x na semana", emoji: "🔥" },
];

export function CreateGoal() {
  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form action="" className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>
              <Input
                id="title"
                autoFocus
                placeholder="praticar exercícios, estudar, etc.."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana ?</Label>
              <RadioGroup>
                {weekOptions.map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    <RadioGroupIndicator />
                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      {option.label}
                    </span>
                    <span className="text-lg leading-none">{option.emoji}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
