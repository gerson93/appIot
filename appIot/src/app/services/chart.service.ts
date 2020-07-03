import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { dataChart } from "../interface/message.interface";

import { Chart } from "chart.js";

@Injectable({
    providedIn: 'root'
})
export class ChartGenerator {
    private lineChart: Chart;

    constructor() {
    }

    generate(lineCanvas, data: dataChart) {
        console.log(data)
        this.lineChart = new Chart(lineCanvas.nativeElement, {
            type: "line",
            data: {
                labels: data.time,
                datasets: [
                    {
                        label: "Measurement",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data.value,
                        spanGaps: false
                    }
                ]
            }
        })
    }

    addRandomDataToChart() {
        this.lineChart.data.labels.push(Math.trunc(Math.random() * 10))
        this.lineChart.data.datasets.forEach((dataset) => {
            dataset.data.push(Math.trunc(Math.random() * 10));
        });
        this.lineChart.update({ duration: 0 })
    }

    addDataToChart(data: dataChart) {
        this.lineChart.data.labels.push(data.time)
        this.lineChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data.value);
        });
        this.lineChart.update({ duration: 0 })
    }

}
