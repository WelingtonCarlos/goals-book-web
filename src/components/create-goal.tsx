import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createGoal } from "../http/create-goal";
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

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar!"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset();
  }

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

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>
              <Input
                id="title"
                autoFocus
                placeholder="praticar exercícios, estudar, etc.."
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana ?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        {weekOptions.map((option) => (
                          <RadioGroupItem
                            key={option.value}
                            value={option.value}
                          >
                            <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                              {option.label}
                            </span>
                            <span className="text-lg leading-none">
                              {option.emoji}
                            </span>
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                      {formState.errors.desiredWeeklyFrequency && (
                        <p className="text-red-400 text-sm">
                          {formState.errors.desiredWeeklyFrequency.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
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
