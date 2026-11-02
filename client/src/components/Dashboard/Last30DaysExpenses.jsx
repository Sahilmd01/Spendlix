import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import { ChartCardSkeleton } from "../Cards/Skeleton";

const Last30DaysExpenses = ({ data, loading }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  if (loading) {
    return <ChartCardSkeleton height={260} />;
  }

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};


export default Last30DaysExpenses;
