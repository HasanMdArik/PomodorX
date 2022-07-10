// Though color changing moved to CSS, keeped these for reference and some rare use cases
export const componentBackgrounds = [
  "#3dfc66",
  "#e65543",
  "#2aa1db",
  "#9868fa",
];
export const primaryColors = ["#136d27", "#591e16", "#0c364b", "#372063"];

// classNames that change depending on the state(state number used as index)
// Also, step-type className(string) depending on the timeStepTypes enum(used as index adding one to it)
export const stateBasedClassName = ["idle", "work", "short", "long"];

// Time period of different time step types
export const timePeriods = [15, 8, 1800];

// classNames depending on the stepState value(to be used as it's index)
// if the index is 0, it means nor active nor finished (means pending)
// if the index is 1, it means active
// if the index is 2, it means finished
export const timeStepStateClassNames = ["", " active", " finished"];
