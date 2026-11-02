import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { ChartCardSkeleton } from "../Cards/Skeleton";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome, loading }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  if (loading) {
    return <ChartCardSkeleton height={260} />;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>


      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        // for formal indian currebcy use like this
        // totalAmount={new Intl.NumberFormat('en-IN', {    
        //   style: 'currency',
        //   currency: 'INR',
        // }).format(totalIncome)}
        showTextAnchor={true}
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
