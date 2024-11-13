import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Chart } from 'chart.js/auto';

const PieCharts = forwardRef(({ labels, data }, ref) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useImperativeHandle(ref, () => ({
        getCanvas: () => chartRef.current,
    }));

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Valor Total de Servicios',
                    data: data,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    hoverOffset: 4
                }]
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data]); // Se actualiza cuando cambian las etiquetas o los datos

    return (
        <div>
            <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
        </div>
    );
});

export default PieCharts;
