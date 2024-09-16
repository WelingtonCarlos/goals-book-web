import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { CheckCircle2, Plus } from "lucide-react";
import { getSummary } from "../http/get-summary";
import { InOrbitIcon } from "./icons/in-orbit-icon";
import { PendingGoals } from "./pending-goals";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";

dayjs.locale(ptBR);

export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf("week").format("DD MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("DD MMM");

  const completedPercentage = Math.round((data.completed * 100) / data.total)

  console.log(completedPercentage);

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size={"sm"} type="button">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> das{" "}
            <span className="text-zinc-100">{data?.total}</span> metas dessa
            semana!
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Metas da semana:</h2>

        {data.goalsPerDay &&
          Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format("dddd");
            const formattedDate = dayjs(date).format("D [de] MMMM");
            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} - </span>
                  <span className="text-zinc-400 text-sx">{formattedDate}</span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    const getTime = dayjs(goal.completedAt).format("HH:MM");
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou{" "}
                          <span className="text-zinc-100">{goal.title}</span> às{" "}
                          <span className="text-zinc-100">{getTime}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}
