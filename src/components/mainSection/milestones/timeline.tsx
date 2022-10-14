import React from "react";
import dayjs from "dayjs";
import QuarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(QuarterOfYear);

const Timeline = () => {
  // TODO change for props deadline + createdAt
  const start = dayjs("2022-12-01");
  const end = dayjs("2023-12-12");
  const diff = Math.ceil(end.diff(start, "Q", true));
  // [Q1, Q2, Q3]

  const quorterArr: (number | string)[] = [];
  for (let i = 0; i < diff; i++) {
    const q = start.add(i, "Q").quarter();

    quorterArr.push(q);
    if (q === 4 && i + 1 < diff) {
      quorterArr.push(start.format("YYYY"));
    }
  }

  return (
    <div className="relative flex h-full">
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center">
          <span className="mx-3 text-lg font-semibold text-gray-500">
            10/2022
          </span>
          <div className=" h-0.5 w-8  bg-gray-400"></div>
        </div>
        <div className="absolute flex h-full w-0.5 flex-col items-end justify-around self-end bg-gray-400 py-16 text-gray-500">
          {quorterArr.map((q, index) => (
            <div key={`${index}${q}`} className="flex items-center gap-2">
              {q > 4 ? (
                <div className="font-semibold">{q}</div>
              ) : (
                <div className="text-xs">Q{q}</div>
              )}
              <div className="h-0.5 w-2 bg-gray-400"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <span className="mx-3 text-lg font-semibold text-gray-500">
            10/2023
          </span>
          <div className="h-0.5 w-8 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
