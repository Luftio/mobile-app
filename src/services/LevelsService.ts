import colors from "../../config/colors";

export const levels = {
  CO2: {
    totalRange: { from: 400, to: 3000 },
    ranges: [
      { type: "good", from: 400, to: 1100 },
      { type: "bad", from: 1100, to: 2000 },
      { type: "terrible", from: 2000, to: 3000 },
    ],
    labels: [1100, 2000],
  },
  temperature: {
    totalRange: { from: 14, to: 30 },
    ranges: [
      { type: "terrible", from: 14, to: 17 },
      { type: "bad", from: 17, to: 19 },
      { type: "good", from: 19, to: 24 },
      { type: "bad", from: 24, to: 27 },
      { type: "terrible", from: 27, to: 30 },
    ],
    labels: [17, 19, 24, 27],
  },
  humidity: {
    totalRange: { from: 0, to: 100 },
    ranges: [
      { type: "terrible", from: 0, to: 25 },
      { type: "bad", from: 25, to: 30 },
      { type: "good", from: 30, to: 60 },
      { type: "bad", from: 60, to: 70 },
      { type: "terrible", from: 70, to: 100 },
    ],
    labels: [0, 25, 30, 60, 70, 100],
  },
  pressure: {
    totalRange: { from: 950, to: 1050 },
    ranges: [
      { type: "bad", from: 950, to: 970 },
      { type: "good", from: 970, to: 1020 },
      { type: "bad", from: 1020, to: 1050 },
    ],
    labels: [950, 970, 1020, 1050],
  },
  tvoc: {
    totalRange: { from: 0, to: 2 },
    ranges: [
      { type: "good", from: 0, to: 0.5 },
      { type: "bad", from: 0.5, to: 1 },
      { type: "terrible", from: 1, to: 2 },
    ],
    labels: [0.5, 1],
  },
  iaq: {
    totalRange: { from: 0, to: 400 },
    ranges: [
      { type: "good", from: 0, to: 100 },
      { type: "bad", from: 100, to: 200 },
      { type: "terrible", from: 200, to: 400 },
    ],
    labels: [100, 200],
  },
  siaq: {
    totalRange: { from: 0, to: 400 },
    ranges: [
      { type: "good", from: 0, to: 100 },
      { type: "bad", from: 100, to: 200 },
      { type: "terrible", from: 200, to: 400 },
    ],
    labels: [100, 200],
  },
};

export const getRange = (type: keyof typeof levels, value: number) => {
  const level = levels[type];
  if (value < level.totalRange.from) {
    return level.ranges.filter((it) => it.from == level.totalRange.from)[0].type;
  }
  if (value >= level.totalRange.to) {
    return level.ranges.filter((it) => it.to == level.totalRange.to)[0].type;
  }
  var closestType = "terrible";
  var closestDistance = Infinity;
  for (let it of level.ranges) {
    if (value >= it.from && value < it.to) {
      return it.type;
    }
    if (Math.abs(value - it.from) < closestDistance) {
      closestDistance = Math.abs(value - it.from);
      closestType = it.type;
    }
    if (Math.abs(value - it.to) < closestDistance) {
      closestDistance = Math.abs(value - it.to);
      closestType = it.type;
    }
  }
  return closestType;
};

export const getRangeColor = (category: "good" | "bad" | "terrible") =>
  category == "good" ? colors.LEVEL_GOOD : category == "bad" ? colors.LEVEL_BAD : colors.LEVEL_TERRIBLE;

export default { levels, getRange, getRangeColor };
