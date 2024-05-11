import { useState } from 'react';
import { TextField } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { Text } from '@fluentui/react/lib/Text';
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";

const fileTypes = ["CSV"];

const useStyles = makeStyles({
    line: {
        display: 'flex',
        alignItems: 'end',
        marginBottom: '15px',
        gap: '10px',
    },
});

const options = { multi: true };

const modelParameters = {
    a: 0.5,
    b: 0.2,
}

const applyModel = (bedRooms: number): number => {
    return modelParameters.a + modelParameters.b * bedRooms;
}

export function LinearRegressionTimeSeries() {
    const styles = useStyles();
    const [bedRooms, setBedRooms] = useState(1);
    const [prediction, setPrediction] = useState(applyModel(1));
    const [file, setFile] = useState(null);

    const handleChange = (file: any) => {
        setFile(file);

        console.log('File >>>', file);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                console.log(results.data)
            },
        });
    };

    return (
        <div>
            <div>
                <div className={styles.line}>
                    <Text variant="large" nowrap block>
                        Linear Regression Time Series
                    </Text>
                </div>
                <div>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                </div>
                <div className={styles.line}>
                    <Text variant="medium" nowrap block>
                        Sales Price = {modelParameters.a} + {modelParameters.a} * Number of Bedrooms
                    </Text>
                </div>
                <div className={styles.line}>
                    <TextField label="#Bedrooms"
                        value={bedRooms ? `${bedRooms}` : ''}
                        onChange={(event: any, newValue?: string) => {
                            if (!newValue) {
                                return;
                            }

                            try {
                                const bedRooms = parseInt(newValue);

                                setBedRooms(bedRooms);
                                setPrediction(applyModel(bedRooms));
                            } catch (error) {
                                console.error(error);
                            }
                        }} />
                    <Text variant="medium" nowrap block>
                        €{prediction}
                    </Text>
                </div>
            </div>
        </div >);
};