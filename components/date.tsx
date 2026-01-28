// // src/app/components/date.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";

// interface DateRangeProps {
//   onDateChange: (start: string, end: string) => void;
//   defaultStart?: string;
//   defaultEnd?: string;
// }

// export default function DateRangePicker({
//   onDateChange,
//   defaultStart = "",
//   defaultEnd = "",
// }: DateRangeProps) {
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }

//     const timeout = setTimeout(() => {
//       onDateChange(startDate, endDate);
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [startDate, endDate, onDateChange]);

//   return (
//     <div className="flex flex-wrap items-center gap-2 mb-4">
//       <div className="flex flex-col">
//         <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1">
//           Start Date
//         </label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1">
//           End Date
//         </label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
//         />
//       </div>

//       {/* Clear Button - helpful for UX */}
//       {(startDate || endDate) && (
//         <button
//           onClick={() => {
//             setStartDate("");
//             setEndDate("");
//           }}
//           className="mt-5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
//         >
//           Clear Dates
//         </button>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";

interface DateRangeProps {
  onDateChange: (start: string, end: string) => void;
  defaultStart?: string;
  defaultEnd?: string;
}

export default function DateRangePicker({
  onDateChange,
  defaultStart = "",
  defaultEnd = "",
}: DateRangeProps) {
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // if (startDate === defaultStart && endDate === defaultEnd) {
    //   return;
    // }

    const timeout = setTimeout(() => {
      onDateChange(startDate, endDate);
    }, 500);

    return () => clearTimeout(timeout);
  }, [startDate, endDate, onDateChange]);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex flex-col">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 mb-1">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
        />
      </div>

      {(startDate || endDate) && (
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="mt-5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Clear Dates
        </button>
      )}
    </div>
  );
}
