import * as RepDataMap from 'app/utility/RepDataMap';
import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    PERCENT_LOSS_QUANTIFIER,
    FASTEST_EVER_QUANTIFIER,
    SLOWEST_EVER_QUANTIFIER,
    SET_LOSS_QUANTIFIER,
    PEAK_END_QUANTIFIER,
} from 'app/configs+constants/CollapsedMetricTypes';
import * as SetUtils from 'app/utility/SetUtils';

// unique metrics

const getMetrics = (set, metricFunction) => {
    const metrics = [];
    
    if (!SetUtils.isDeleted(set)) {
        set.reps.forEach((rep) => {                
            if (rep.isValid === true && rep.removed === false) {
                const repData = rep.data;
                const metric = Number(metricFunction(repData));
                metrics.push(metric);
            }
        });
    }

    return metrics;
};

export const getRPE = (set) => {
    return set.rpe;
};

export const getAvgVelocities = (set) => {
    return getMetrics(set, RepDataMap.averageVelocity);
};

export const getPKVs = (set) => {
    return getMetrics(set, RepDataMap.peakVelocity);
};

export const getPKHs = (set) => {
    return getMetrics(set, RepDataMap.peakVelocityLocation);
};

export const getROMs = (set) => {
    return getMetrics(set, RepDataMap.rangeOfMotion);
};

export const getDurations = (set) => {
    return getMetrics(set, RepDataMap.durationOfLift);
};

// Average Quantifiers

const getAvgOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const sum = metrics.reduce((previous, current) => current + previous);
    return Number((sum / metrics.length).toFixed(2));
};

export const getAvgOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getAvgOfMetrics(velocities);
};

export const getAvgPKV = (set) => {
    const pkvs = getPKVs(set);
    return getAvgOfMetrics(pkvs);
};

export const getAvgROM = (set) => {
    const roms = getROMs(set);
    return getAvgOfMetrics(roms);
};

export const getAvgDuration = (set) => {
    const durations = getDurations(set);
    return getAvgOfMetrics(durations);
};

// Absolute Loss Quantifiers

const getAbsLossOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const max = Math.max(...metrics);
    const min = Math.min(...metrics);
    
    return Number((max - min).toFixed(2));
};

export const getAbsLossOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getAbsLossOfMetrics(velocities);
};

export const getAbsLossOfPKVs = (set) => {
    const pkvs = getPKVs(set);
    return getAbsLossOfMetrics(pkvs);
};

export const getAbsLossOfROMs = (set) => {
    const roms = getROMs(set);
    return getAbsLossOfMetrics(roms);
};

export const getAbsLossOfDurations = (set) => {
    const durations = getDurations(set);
    return getAbsLossOfMetrics(durations);    
};

// Percent Loss Quantifiers

const getPercentLossOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    const max = Math.max(...metrics);
    const min = Math.min(...metrics);
    
    return Number((100*(max - min)/max).toFixed(2));
};

export const getPercentLossOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getPercentLossOfMetrics(velocities);
};

export const getPercentLossOfPKVs = (set) => {
    const pkvs = getPKVs(set);
    return getPercentLossOfMetrics(pkvs);
};

export const getPercentLossOfROMs = (set) => {
    const roms = getROMs(set);
    return getPercentLossOfMetrics(roms);
};

export const getPercentLossOfDurations = (set) => {
    const durations = getDurations(set);
    return getPercentLossOfMetrics(durations);    
};

// First Rep Quantifiers

const getFirstRepOfMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number((metrics[0]).toFixed(2));
};

export const getFirstAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getFirstRepOfMetrics(velocities);
};

export const getFirstPKV = (set) => {
    const pkvs = getPKVs(set);
    return getFirstRepOfMetrics(pkvs);
};

export const getFirstPKH = (set) => {
    const pkhs = getPKHs(set);
    return getFirstRepOfMetrics(pkhs);
};

export const getFirstROM = (set) => {
    const roms = getROMs(set);
    return getFirstRepOfMetrics(roms);
};

export const getFirstDuration = (set) => {
    const durations = getDurations(set);
    return getFirstRepOfMetrics(durations);
};

// Last Rep Quantifiers

const getLastRepMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number((metrics[metrics.length - 1]).toFixed(2));
};

export const getLastAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getLastRepMetrics(velocities);
};

export const getLastPKV = (set) => {
    const pkvs = getPKVs(set);
    return getLastRepMetrics(pkvs);
};

export const getLastPKH = (set) => {
    const pkhs = getPKHs(set);
    return getLastRepMetrics(pkhs);
};

export const getLastROM = (set) => {
    const roms = getROMs(set);
    return getLastRepMetrics(roms);
};

export const getLastDuration = (set) => {
    const durations = getDurations(set);
    return getLastRepMetrics(durations);
};

// Get Min Quantifiers

const getMinMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number(Math.min(...metrics).toFixed(2));
};

export const getMinAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getMinMetrics(velocities);
};

export const getMinPKV = (set) => {
    const pkvs = getPKVs(set);
    return getMinMetrics(pkvs);
};

export const getMinPKH = (set) => {
    const pkhs = getPKHs(set);
    return getMinMetrics(pkhs);
};

export const getMinROM = (set) => {
    const roms = getROMs(set);
    return getMinMetrics(roms);
};

export const getMinDuration = (set) => {
    const durations = getDurations(set);
    return getMinMetrics(durations);
};

// Get Max Quantifiers

const getMaxMetrics = (metrics) => {
    if (metrics.length <= 0) {
        return null;
    }

    return Number(Math.max(...metrics).toFixed(2));
};

export const getMaxAvgVelocity = (set) => {
    const velocities = getAvgVelocities(set);
    return getMaxMetrics(velocities);
};

export const getMaxPKV = (set) => {
    const pkvs = getPKVs(set);
    return getMaxMetrics(pkvs);
};

export const getMaxPKH = (set) => {
    const pkhs = getPKHs(set);
    return getMaxMetrics(pkhs);
};

export const getMaxROM = (set) => {
    const roms = getROMs(set);
    return getMaxMetrics(roms);
};

export const getMaxDuration = (set) => {
    const durations = getDurations(set);
    return getMaxMetrics(durations);
};

// Peak-End

const getPeakEndMetrics = (metrics) => {
    const min = getMinMetrics(metrics);
    const lastRepMetric = getLastRepMetrics(metrics);
    
    if (metrics.length > 0) {
        return Number(((lastRepMetric + min) / 2).toFixed(2));
    } else {
        return null;
    }
};

export const getPeakEndOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getPeakEndMetrics(velocities);
};

export const getPeakEndOfPKVs = (set) => {
    const pkvs = getPKVs(set);
    return getPeakEndMetrics(pkvs);
};

export const getPeakEndOfROMs = (set) => {
    const roms = getROMs(set);
    return getPeakEndMetrics(roms);
};

export const getPeakEndOfDurations = (set) => {
    const durations = getDurations(set);
    return getPeakEndMetrics(durations);
};

// Set Loss

const getSetLossMetrics = (metrics) => {
    const lastRepMetric = getLastRepMetrics(metrics);
    const firstRepMetric = getFirstRepOfMetrics(metrics);

    if (metrics.length > 0) {
        return Number((lastRepMetric - firstRepMetric).toFixed(2));
    } else {
        return null;
    }
};

export const getSetLossOfAvgVelocities = (set) => {
    const velocities = getAvgVelocities(set);
    return getSetLossMetrics(velocities);
};

export const getSetLossOfPKVs = (set) => {
    const pkvs = getPKVs(set);
    return getSetLossMetrics(pkvs);
};

export const getSetLossOfROMs = (set) => {
    const roms = getROMs(set);
    return getSetLossMetrics(roms);
};

export const getSetLossOfDurations = (set) => {
    const durations = getDurations(set);
    return getSetLossMetrics(durations);
};

export const canCalcRPE1RM = (set) => {
    let rpe = set.rpe;
    if (!rpe)
        return false;
    
    const rpeWithoutCommas = rpe.replace(',','.');
    if (isNaN(rpeWithoutCommas)) {
        return false;
    }

    if (rpeWithoutCommas === "6.5" || rpeWithoutCommas === "7" || rpeWithoutCommas === "7.5" || rpeWithoutCommas === "8" || rpeWithoutCommas === "8.5" || rpeWithoutCommas === "9" || rpeWithoutCommas === "9.5" || rpeWithoutCommas === "10") {
        return true;
    }

    return false;
};

export const getRPE1RM = (set, useLBs=false) => {
    // empty rpe / weight check
    if (!set.rpe || !set.weight) {
        return null;
    }

    // rep length
    const numReps = SetUtils.numValidUnremovedReps(set);
    if (numReps <= 0 || numReps > 10) {
        return null;
    }

    if (useLBs) {
        var weight = SetUtils.weightInLBs(set);
    } else {
        var weight = set.weight;
    }
    const rpe = Number(set.rpe.replace(',','.'));

    // RPE percentages of 1rm correlated to reps @ RPE values
    // "RPE":{"REP#": Percentage of 1rm, ...}
    const RPEIntensity = {
        '10':{'10':0.759,'9':0.7855,'8':0.812,'7':0.839,'6':0.8665,'5':0.8935,'4':0.92,'3':0.947,'2':0.9735,'1':1},
        '9.5':{'10':0.7395,'9':0.765,'8':0.7915,'7':0.819,'6':0.8455,'5':0.872,'4':0.899,'3':0.9255,'2':0.9525,'1':0.98},
        '9':{'10':0.7195,'9':0.746,'8':0.7725,'7':0.7995,'6':0.8255,'5':0.8515,'4':0.878,'3':0.905,'2':0.9315,'1':0.959},
        '8.5':{'10':0.6985,'9':0.726,'8':0.753,'7':0.7795,'6':0.8065,'5':0.833,'4':0.8595,'3':0.886,'2':0.9115,'1':0.9385},
        '8':{'10':0.6775,'9':0.705,'8':0.732,'7':0.759,'6':0.7855,'5':0.8125,'4':0.839,'3':0.866,'2':0.893,'1':0.9195},
        '7.5':{'10':0.659,'9':0.684,'8':0.711,'7':0.7375,'6':0.7645,'5':0.792,'4':0.819,'3':0.8455,'2':0.872,'1':0.899},
        '7':{'10':0.639,'9':0.6655,'8':0.692,'7':0.719,'6':0.745,'5':0.771,'4':0.798,'3':0.825,'2':0.851,'1':0.878},
        '6.5':{'10':0.6185,'9':0.645,'8':0.6715,'7':0.6985,'6':0.7255,'5':0.7525,'4':0.779,'3':0.806,'2':0.832,'1':0.8575},
        '6':{'10':0.5975,'9':0.6245,'8':0.6515,'7':0.6785,'6':0.705,'5':0.7315,'4':0.7585,'3':0.7855,'2':0.812,'1':0.839},
    };

    // rpe table lookup
    const rpeTable = RPEIntensity[rpe];
    if (!rpeTable) {
        return null;
    }

    // rpe percent lookup
    const rpePercent = rpeTable[numReps];
    if (!rpePercent) {
        return null;
    }

    // 1rm calculation by RPE percentage
    const result = weight / rpePercent;
    return Math.round(result);
};

// To String

export const metricAbbreviation = (metric) => {
    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'VEL';
        case RPE_METRIC:
            return 'RPE';
        case DURATION_METRIC:
            return 'DUR';
        case ROM_METRIC:
            return 'ROM';
        case PKH_METRIC:
            return 'PKH';
        case PKV_METRIC:
            return 'PKV';
        default:
            return null;
    };
};

export const metricString = (metric) => {
    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'Average Velocity';
        case RPE_METRIC:
            return 'RPE';
        case DURATION_METRIC:
            return 'Duration';
        case ROM_METRIC:
            return 'Range Of Motion';
        case PKH_METRIC:
            return 'Peak Height';
        case PKV_METRIC:
            return 'Peak Velocity';
        default:
            return null;
    };
};

export const metricUnit = (metric, quantifier) => {
    // some quantifiers override the units
    if (quantifier === PERCENT_LOSS_QUANTIFIER) {
        return '%';
    }

    switch (metric) {
        case EMPTY_METRIC:
            return '';
        case AVG_VELOCITY_METRIC:
            return 'm/s';
        case DURATION_METRIC:
            return 'sec';
        case ROM_METRIC:
            return 'mm';
        case PKH_METRIC:
            return '%';
        case PKV_METRIC:
            return 'm/s';
        default:
            return null;
    };
};

export const quantifierAbbreviation = (quantifier) => {
    switch (quantifier) {
        case EMPTY_QUANTIFIER:
            return '';
        case FIRST_REP_QUANTIFIER:
            return 'FIRST';
        case LAST_REP_QUANTIFIER:
            return 'LAST';
        case MIN_QUANTIFIER:
            return 'MIN SET';
        case MAX_QUANTIFIER:
            return 'MAX SET';
        case AVG_QUANTIFIER:
            return 'AVG SET';
        case ABS_LOSS_QUANTIFIER:
            return 'A. LOSS';
        case PERCENT_LOSS_QUANTIFIER:
            return '% LOSS';
        case FASTEST_EVER_QUANTIFIER:
            return 'FASTEST';
        case SLOWEST_EVER_QUANTIFIER:
            return 'SLOWEST';
        case SET_LOSS_QUANTIFIER:
            return 'S. LOSS';
        case PEAK_END_QUANTIFIER: 
            return 'PK-END';
        default:
            return null;
    };
};

export const quantifierString = (quantifier) => {
    switch (quantifier) {
        case EMPTY_QUANTIFIER:
            return '';
        case FIRST_REP_QUANTIFIER:
            return 'First Rep';
        case LAST_REP_QUANTIFIER:
            return 'Last Rep';
        case MIN_QUANTIFIER:
            return 'Minimum Set';
        case MAX_QUANTIFIER:
            return 'Maximum Set';
        case AVG_QUANTIFIER:
            return 'Average Set';
        case ABS_LOSS_QUANTIFIER:
            return 'Absolute Loss';
        case PERCENT_LOSS_QUANTIFIER:
            return 'Percent Loss';
        case FASTEST_EVER_QUANTIFIER:
            return 'Fastest Ever';
        case SLOWEST_EVER_QUANTIFIER:
            return 'Slowest Ever';
        case SET_LOSS_QUANTIFIER:
            return 'Set Loss';
        case PEAK_END_QUANTIFIER: 
            return 'Peak-End';
        default:
            return null;
    };
};
