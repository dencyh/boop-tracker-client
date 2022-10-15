import React from "react";
import dayjs, { Dayjs } from "dayjs";
import QuarterOfYear from "dayjs/plugin/quarterOfYear";
import { IProject } from "../../../../models/IProject";
dayjs.extend(QuarterOfYear);

const Timeline = (project: IProject) => {
  const start = dayjs(project.createdAt);
  const end = dayjs(project.deadline);
  const diff = Math.ceil(end.diff(start, "Q", true));

  const quorterArr: (string | Dayjs)[] = [];
  for (let i = 0; i < diff; i++) {
    const newDate = start.add(i, "Q");
    const q = newDate.quarter();

    quorterArr.push(newDate);
    if (q === 4 && i + 1 < diff) {
      quorterArr.push(newDate.add(1, "year").format("YYYY"));
    }
  }

  return (
    <div className="group relative flex h-full">
      <div className="flex flex-col items-end justify-between">
        <div className="flex translate-y-7 items-center">
          <span className="mx-3 text-lg font-semibold text-gray-500">
            {start.format("MM/YYYY")}
          </span>
          <div className=" h-0.5 w-8  bg-gray-400"></div>
        </div>
        <div className="flex h-full w-0.5 flex-col items-end justify-around self-end bg-gray-400 py-8 text-gray-500">
          {quorterArr.map((q, index) => (
            <div
              key={`${index}${q}`}
              className="my-0.5 flex items-center gap-2"
            >
              {typeof q === "string" ? (
                <div className="font-semibold">{q}</div>
              ) : (
                <div
                  className={`${
                    q.quarter() === dayjs().quarter() &&
                    q.year() === dayjs().year()
                      ? "text-md border-b-2 border-indigo-500 font-bold text-indigo-500"
                      : "text-xs"
                  }`}
                >
                  Q{q.quarter()}
                </div>
              )}
              <div className="h-0.5 w-2 bg-gray-400"></div>
            </div>
          ))}
        </div>
        <div className="flex -translate-y-7 items-center">
          <span className="mx-3 text-lg font-semibold text-gray-500">
            {end.format("MM/YYYY")}
          </span>
          <div className="h-0.5 w-8 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
