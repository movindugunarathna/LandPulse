import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

function ChartApp({ className, dataObj }) {
    const chartRef = useRef(null);
    const months = useMemo(() => {
        const result = Object.entries(dataObj)
            .filter(([key, value]) => !isNaN(parseInt(key)))
            .sort((a, b) => {
                console.log(a);
                if (a[1].year === b[1].year) {
                    return a[0] - b[0];
                }
                return a[1].year - b[1].year;
            });
        const months = result.map((item) => item[0]);
        const min_next = result.map((item) => item[1].min_next);
        const max_next = result.map((item) => item[1].max_next);

        return [months, min_next, max_next];
    }, [dataObj]);

    console.log(months);

    useEffect(() => {
        if (chartRef.current) {
            const lineChart = new Chart(chartRef.current, {
                type: "line",
                data: {
                    labels: months[0],
                    datasets: [
                        {
                            data: months[1],
                            label: "Min Price Variation",
                            borderColor: "#3cba9f",
                            fill: false,
                        },
                        {
                            data: months[2],
                            label: "Max Price Variation",
                            borderColor: "#e43202",
                            fill: false,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Min max price value variation",
                        },
                    },
                },
            });

            return () => {
                lineChart.destroy();
            };
        }
    }, [months]);

    return (
        <div className={`${className}`}>
            <canvas className="w-full h-full " ref={chartRef}></canvas>
        </div>
    );
}

export default ChartApp;
