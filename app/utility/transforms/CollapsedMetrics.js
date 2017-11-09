import * as RepDataMap from 'app/utility/transforms/RepDataMap';

export const getAvgVelocities = (set) => {
    let velocities = [];
    
    for (let i = 0; i < set.reps.length; i++) {
        let rep = set.reps[i];
                
        if (rep.isValid === true && rep.removed === false) {
            let repData = rep.data;
        
            velocities.push(Number(RepDataMap.averageVelocity(repData)));
        }            
    };

    return velocities;
};

export const getAvgofAvgVelocities = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let sum = avgVs.reduce((previous, current) => current += previous);
        return (sum / avgVs.length).toFixed(2);
    } else {
        return null;
    }  
};

export const getAbsLossVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        let maxV = Math.max(...avgVs);
        let minV = Math.min(...avgVs);
        
        return maxV - minV;
    } else {
        return null;
    }
};

export const getFirstRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[0];
    } else {
        return null;
    }
};

export const getLastRepAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return avgVs[avgVs.length - 1];
    } else {
        return null;
    }
};

export const getMinAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);

    if (avgVs.length > 0) {
        return Math.min(...avgVs);
    } else {
        return null;
    }
};

export const getMaxAvgVelocity = (set) => {
    let avgVs = getAvgVelocities(set);
    
    if (avgVs.length > 0) {
        return Math.max(...avgVs);    
    } else {
        return null;
    }
};