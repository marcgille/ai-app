import { useState } from 'react';
import { SpinButton, Position } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { Text } from '@fluentui/react/lib/Text';
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";
import Chart from "react-apexcharts";

const fileTypes = ["CSV"];

const useStyles = makeStyles({
    flex: {
        display: 'flex',
        gap: '10px',
    },
    line: {
        display: 'flex',
        alignItems: 'end',
        marginBottom: '15px',
        gap: '10px',
    },
});

const applyModel = (series: any, windowWidth: number, predictionLength: number): any => {
    const prediction = [];

    for (let n = 0; n < predictionLength; ++n) {
        let sum = 0;

        for (let i = windowWidth; i >= 0; --i) {
            sum += series[series.length - 1 - i].value;
        }

        series.push({ time: series[series.length - 1].time, value: sum / 20 })
        prediction.push({ time: series[series.length - 1].time, value: sum / 20 });
    }

    return prediction;
}

export function MovingAverageTimeSeries() {
    const styles = useStyles();
    const [options, setOptions] = useState({
        xaxis: {
            categories: [0]
        }
    });
    const [series, setSeries] = useState([
        {
            name: "Training Data",
            data: [0]
        },
        {
            name: "Prediction",
            data: [0]
        }
    ]);
    const [file, setFile] = useState(null);
    const [windowWidth, setWindowWidth] = useState(20);
    const [predictionLength, setPredictionLength] = useState(50);

    const handleChange = (file: any) => {
        setFile(file);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                console.log(results.data);

                const series = results.data.map((x: any) => { return { time: parseFloat(x.time), value: parseFloat(x.value) } });
                const originalSeries = results.data.map((x: any) => { return { time: parseFloat(x.time), value: parseFloat(x.value) } });
                const predictedSeries = applyModel(series, windowWidth, predictionLength);

                const xAxis = series.map((x: any) => x.time);
                const trainingData = [...originalSeries.map((x: any) => x.value), ...predictedSeries.map((x: any) => null)];
                const predictionData = [...originalSeries.map((x: any) => null), ...predictedSeries.map((x: any) => x.value)];

                setOptions({
                    xaxis: {
                        categories: xAxis
                    }
                });
                setSeries([
                    {
                        name: "Training Data",
                        data: trainingData
                    },
                    {
                        name: "Prediction Data",
                        data: predictionData
                    }
                ]);
            },
        });
    };

    return (
        <div>
            <div>
                <div className={styles.line}>
                    <Text variant="xLarge" nowrap block>
                        Moving Average Prediction Time Series
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="large" nowrap block>
                        Model
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="medium" nowrap block>
                        The training data time series is the model.
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="large" nowrap block>
                        Prediction
                    </Text>
                </div>
                <div className={styles.flex}>
                    <div>
                    <div className={styles.flex}>
                            <SpinButton
                                label="Window Width"
                                labelPosition={Position.top}
                                defaultValue="20"
                                value={`${windowWidth}`}
                                min={0}
                                max={100}
                                step={1}
                                styles={{ spinButtonWrapper: { width: 100 } }}
                            />
                        </div>
                        <div className={styles.flex}>
                            <SpinButton
                                label="Prediction Length"
                                labelPosition={Position.top}
                                defaultValue="50"
                                value={`${predictionLength}`}
                                min={0}
                                max={100}
                                step={1}
                                styles={{ spinButtonWrapper: { width: 100 } }}
                            />
                        </div>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </div>
                    <div>
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="1200"
                        />
                    </div>
                </div>
            </div>
        </div >);
};