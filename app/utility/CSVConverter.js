// TODO: split this into more functions that don't suck
// TODO: prime candidate for unit testing

import * as DateUtils from 'app/utility/DateUtils';
import * as RepDataMap from 'app/utility/RepDataMap';
import * as SetUtils from 'app/utility/SetUtils';

// pass this the history sets as a sorted array
// aka SetReducer's getHistorySets convenience function
export const convert = (sets) => {
    // output
    var output = "Exercise,Set,Rep,Weight,Metric,Set RPE,Tags,Workout Start Time,Rest Time,Avg Velocity (m/s),Range of Motion (mm),Peak Velocity (m/s),Peak Velocity Location (%),Duration of rep (sec)\n";

    // filter removed sets
    sets = sets.filter((set) => set.removed === false && set.reps.length > 0);

    // vars for calculation
    var lastExercise = null;
    var setCount = 1;
    var lastWorkout = null;
    var workoutStartTime = null;
    var lastSetEndTime = null;
    var rest = null;

    for (set of sets) {
        // calculate workoutstarttime
        if (lastWorkout === null || lastWorkout !== set.workoutID) {
            lastWorkout = set.workoutID;
            workoutStartTime = new Date(SetUtils.startTime(set)).toLocaleString();
            // reset vars for set count and rest time
            lastExercise = null;
            lastSetEndTime = null;
        }

        // calculate setcount
        if (lastExercise !== null && lastExercise === set.exercise) {
            setCount += 1;
        } else {
            setCount = 1;
        }
        lastExercise = set.exercise;

        // calculate rest time
        if (lastSetEndTime !== null) {
            var restInMS = new Date(SetUtils.startTime(set)).getTime() - new Date(lastSetEndTime).getTime();
            rest = DateUtils.restInClockFormat(restInMS);
        } else {
            rest = "00:00:00";
        }
        lastSetEndTime = SetUtils.endTime(set);

        // reps
        let reps = SetUtils.validUnremovedReps(set);
        if (set.tags) {
            var tags = set.tags.join();
        } else {
            var tags = '';
        }

        reps.forEach((rep, index, array) => {
            output += escapeDoubleQuote(set.exercise) + ',';
            output += setCount + ',';
            output += (index + 1) + ',';
            output += escapeDoubleQuote(set.weight) + ',';
            output += escapeDoubleQuote(set.metric) + ',';
            output += escapeDoubleQuote(set.rpe) + ',';
            output += escapeDoubleQuote(tags) + ',';
            output += escapeDoubleQuote(workoutStartTime) + ',';
            output += escapeDoubleQuote(rest) + ',';
            output += RepDataMap.averageVelocity(rep.data) + ',';
            output += RepDataMap.rangeOfMotion(rep.data) + ',';
            output += RepDataMap.peakVelocity(rep.data) + ',';
            output += RepDataMap.peakVelocityLocation(rep.data) + ',';
            output += (RepDataMap.durationOfLift(rep.data) / 1000000) + '\n';
        });
    }
    return output;
};

const escapeDoubleQuote = (value) => {
    if (typeof(value) === 'string' || value instanceof String) {
        return '"' + value.replace(/"/g, '""') + '"';
    } else {
        return value;
    }
};
