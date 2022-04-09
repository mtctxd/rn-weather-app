import { KELVIN } from "../constants";

const temperatureConverter = (units, measurment) => {
    let result = 0;
    switch (measurment) {
        case 'F':
            result = ((units - KELVIN) * 1.8) + 32;
            break;

        case 'C':
            result = units - KELVIN;
            break;
    
        default:
            result = units - KELVIN;
            break;
    }

    return Math.round(result * 10) / 10;
};

export default temperatureConverter;