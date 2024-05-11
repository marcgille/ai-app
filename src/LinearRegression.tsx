import { useState } from 'react';
import { TextField } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { Text } from '@fluentui/react/lib/Text';

const useStyles = makeStyles({
    line: {
        display: 'flex',
        alignItems: 'end',
        marginBottom: '15px',
        gap: '10px',
    },
});

const modelParameters = {
    a: 200000,
    b: 150000,
    c: 100000,
}

const applyModel = (bedRooms: number, bathRooms: number): number => {
    return modelParameters.a + modelParameters.b * bedRooms + + modelParameters.c * bathRooms;
}

export function LinearRegression() {
    const styles = useStyles();
    const [bedRooms, setBedRooms] = useState(1);
    const [bathRooms, setBathRooms] = useState(1);
    const [prediction, setPrediction] = useState(applyModel(1, 1));

    return (
        <div>
            <div>
                <div className={styles.line}>
                    <Text variant="xLarge" nowrap block>
                        Linear Regression
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="large" nowrap block>
                        Model
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="medium" nowrap block>
                        Sales Price = {modelParameters.a} + {modelParameters.b} × Number of Bedrooms + {modelParameters.c} × Number of Bathrooms
                    </Text>
                </div>
                <div className={styles.line}>
                    <Text variant="large" nowrap block>
                        Prediction
                    </Text>
                </div>
                <div className={styles.line}>
                    <TextField label="# Bedrooms"
                        value={bedRooms ? `${bedRooms}` : ''}
                        onChange={(event: any, newValue?: string) => {
                            if (!newValue) {
                                return;
                            }

                            try {
                                const newBedRooms = parseInt(newValue);

                                setBedRooms(newBedRooms);
                                setPrediction(applyModel(newBedRooms, bathRooms));
                            } catch (error) {
                                console.error(error);
                            }
                        }} />
                    <TextField label="# Bathrooms"
                        value={bathRooms ? `${bathRooms}` : ''}
                        onChange={(event: any, newValue?: string) => {
                            if (!newValue) {
                                return;
                            }

                            try {
                                const newBathRooms = parseInt(newValue);

                                setBathRooms(newBathRooms);
                                setPrediction(applyModel(bedRooms, newBathRooms));
                            } catch (error) {
                                console.error(error);
                            }
                        }} />
                    <Text variant="large" nowrap block>
                        €{prediction}
                    </Text>
                </div>
            </div>
        </div >);
};