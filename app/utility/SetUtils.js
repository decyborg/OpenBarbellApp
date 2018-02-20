import * as RepDataMap from 'app/utility/RepDataMap';

// no data and no active reps
export const isEmpty = (set) => {
    return hasEmptyData(set) && hasEmptyReps(set);
};

// no data and no reps at all
export const isUntouched = (set) => {
    return hasEmptyData(set) && hasNoReps(set);
};

export const hasAllFields = (set) => {
    if (set.exercise && set.weight && set.rpe && set.tags && set.tags.length > 0) {
        return true;
    }
    return false;
};

export const hasEmptyFields = (set) => {
    return !set.exercise && (!set.weight || set.weight === '') && (!set.rpe || set.rpe === '') && (!set.tags || set.tags === undefined || set.tags.length === 0);
};

export const hasEmptyData = (set) => {
    return hasEmptyFields(set) && !set.videoFileURL;
};

export const hasNoReps = (set) => {
    if (set.reps === null || set.reps === undefined) {
        return true;
    }
    return set.reps.length === 0;
};

export const hasEmptyReps = (set) => {
    if (hasNoReps(set)) {
        return true;
    }

    let activeRep = set.reps.find((rep) => { return rep.removed === false; });
    return activeRep === undefined;
};

export const weightInLBs = (set) => {
    if (!set.hasOwnProperty('weight') || set.weight === null) {
        return null;
    } else if (set.metric === 'lbs') {
        return set.weight;
    } else if (set.metric === 'kgs') {
        return Number(set.weight) * 2.20462262;
    } else {
        // should never reach here
        return null;
    }
};

export const numFieldsEntered = (set) => {
    let fields = [set.exercise, set.weight, set.rpe, set.tags.length];
    let num_fields_entered = 0;

    fields.forEach((field) => {
        if (Boolean(field)) {
            num_fields_entered++;
        }
    });
    
    return num_fields_entered;
};

export const numValidUnremovedReps = (set) => {
    return set.reps.reduce((sum, rep) => {
        if (rep.isValid === false || rep.removed === true) {
            return sum;
        } else {
            return sum+1;
        }
    }, 0);
};

export const hasInvalidVelocity = (set) => {
    set.reps.map((rep) => {
        if (rep.isValid && !rep.removed && rep.data) {
            const velocity = RepDataMap.averageVelocity(rep.data); // this should always return a string
            if (!velocity || isNaN(velocity) || velocity.toLowerCase().includes('nf') || Number(velocity) <= 0) {
                return true;
            }
        }
    });
    return false;
};

export const getFirstValidUnremovedRep = (set) => {
    return set.reps.find((rep) => {
        return rep.isValid && !rep.removed;
    });
};

// this is here because of legacy issues
// originally, sets saved their start and end times
// however, once rep deletion was added, the rest calculation is off

export const startTime = (set) => {
    if (!set) {
        return null;
    } else if (set.startTime === undefined) {
        // time of first rep
        let validReps = set.reps.filter((rep) => !rep.removed && rep.isValid);        
        if (validReps.length > 0 && validReps[0].time !== undefined) {
            return validReps[0].time;
        } else if (set.initialStartTime !== undefined) {
            return set.initialStartTime;
        } else {
            return null;
        }
    } else {
        // legacy time of set itself
        return set.startTime;
    }
};

export const endTime = (set) => {
    if (set.endTime === undefined) {
        // time of last rep
        let validReps = set.reps.filter((rep) => !rep.removed && rep.isValid);        
        if (validReps.length > 0) {
            return validReps[validReps.length-1].time;
        } else {
            return null;
        }
    } else {
        // legacy time of set itself
        return set.endTime;
    }
};
