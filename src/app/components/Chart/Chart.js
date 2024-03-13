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
                            label: "Minimum Value",
                            borderColor: "#3cba9f",
                            fill: false,
                        },
                        {
                            data: months[2],
                            label: "Maximum Value",
                            borderColor: "#e43202",
                            fill: false,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Chart JS Multiple Lines Example",
                        },
                    },
                },
            });

            return () => {
                lineChart.destroy();
            };
        }
    }, []);

    return (
        <div className={`${className}`}>
            <h1>Min max price value variation</h1>
            <div>
                <canvas className="w-full h-full" ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default ChartApp;
