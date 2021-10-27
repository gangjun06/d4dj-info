//@ts-nocheck

// Original Source Code: https://girlbands.party/d4dj/chart-previewer/
var NoteType;
(function (NoteType) {
  NoteType["Tap1"] = "Tap1";
  NoteType["Tap2"] = "Tap2";
  NoteType["ScratchLeft"] = "ScratchLeft";
  NoteType["ScratchRight"] = "ScratchRight";
  NoteType["StopStart"] = "StopStart";
  NoteType["StopEnd"] = "StopEnd";
  NoteType["LongStart"] = "LongStart";
  NoteType["LongMiddle"] = "LongMiddle";
  NoteType["LongEnd"] = "LongEnd";
  NoteType["Slide"] = "Slide";
})(NoteType || (NoteType = {}));

export class D4DJChartRenderer {
  constructor(canvas: HTMLCanvasElement) {
    this.heightPerSec = 500;
    this.canvas = document.createElement("canvas");
    this.targetCanvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.targetCtx = canvas.getContext("2d");
  }
}
D4DJChartRenderer.prototype.clear = function () {
  this.ctx.fillStyle = "rgba(0,0,0,0)";
  this.ctx.fillRect(0, 0, this.width, this.height);
};
D4DJChartRenderer.prototype.getLaneWidth = function () {
  return (D4DJChartRenderer.TOTAL_WIDTH * D4DJChartRenderer.LANE_WIDTH) / 7;
};
D4DJChartRenderer.prototype.fillWithScaleAndOffset = function (
  x,
  y,
  width,
  height
) {
  x += D4DJChartRenderer.X_OFFSET;
  width *= D4DJChartRenderer.LANE_WIDTH;
  this.ctx.beginPath();
  this.ctx.moveTo(x - width / 2, y);
  this.ctx.lineTo(x - width / 2, y + height);
  this.ctx.lineTo(x + width / 2, y + height);
  this.ctx.lineTo(x + width / 2, y);
  this.ctx.lineTo(x - width / 2, y);
  this.ctx.fill();
};
D4DJChartRenderer.prototype.fillByTime = function (
  x,
  time,
  width,
  height,
  color
) {
  this.ctx.fillStyle = color;
  this.fillWithScaleAndOffset(
    x,
    this.heightPerSec * (this.totalDur - (time - this.startTime)) -
      height +
      this.offsetHeight,
    width,
    height
  );
};
D4DJChartRenderer.prototype.textByTime = function (
  x,
  time,
  height,
  text,
  color
) {
  this.ctx.fillStyle = color;
  this.ctx.font = height.toString() + "px Arial";
  this.ctx.fillText(
    text,
    x,
    this.heightPerSec * (this.totalDur - (time - this.startTime)) +
      this.offsetHeight
  );
};
D4DJChartRenderer.prototype.drawBarLines = function (barLines) {
  var _this = this;
  barLines.forEach(function (barLine) {
    _this.fillByTime(
      (D4DJChartRenderer.TOTAL_WIDTH / 2) * D4DJChartRenderer.LANE_WIDTH,
      barLine,
      D4DJChartRenderer.TOTAL_WIDTH,
      1,
      "#eeeeee"
    );
    _this.textByTime(4, barLine, 9, barLine.toString(), "#eeeeee");
  });
};
D4DJChartRenderer.prototype.drawLanes = function () {
  this.ctx.fillStyle = "#eeeeee";
  for (var i = 0; i < 8; i++) {
    this.fillWithScaleAndOffset(this.getLaneWidth() * i, 0, 1, this.height);
  }
};
D4DJChartRenderer.prototype.drawTapNote = function (note) {
  this.fillByTime(
    this.getLaneWidth() * (note.LaneId + 0.5),
    note.Time,
    this.getLaneWidth() * 0.8,
    D4DJChartRenderer.NOTE_HEIGHT,
    "#00cccc"
  );
};
D4DJChartRenderer.prototype.drawScratchNote = function (note) {
  this.fillByTime(
    this.getLaneWidth() * (note.LaneId + 0.5),
    note.Time,
    this.getLaneWidth() * 0.8,
    D4DJChartRenderer.NOTE_HEIGHT,
    "#ffcc00"
  );
};
D4DJChartRenderer.prototype.drawHoldNote = function (note) {
  this.fillByTime(
    this.getLaneWidth() * (note.LaneId + 0.5),
    note.Time,
    this.getLaneWidth() * 0.8,
    D4DJChartRenderer.NOTE_HEIGHT,
    "#eeee00"
  );
};
D4DJChartRenderer.prototype.drawStopNote = function (note) {
  this.fillByTime(
    this.getLaneWidth() * (note.LaneId + 0.5),
    note.Time,
    this.getLaneWidth() * 0.8,
    D4DJChartRenderer.NOTE_HEIGHT,
    "#ee0000"
  );
};
D4DJChartRenderer.prototype.drawLaserNodes = function (note) {
  this.fillByTime(
    this.getLaneWidth() * (note.LaneId + 0.5),
    note.Time,
    this.getLaneWidth() * 0.5,
    D4DJChartRenderer.NOTE_HEIGHT * 2,
    "rgb(245, 93, 159)"
  );
};
D4DJChartRenderer.prototype.drawLine = function (
  start,
  end,
  width,
  color,
  heightOffset
) {
  var sx =
    this.getLaneWidth() * (start.LaneId + 0.5) + D4DJChartRenderer.X_OFFSET;
  var ex =
    this.getLaneWidth() * (end.LaneId + 0.5) + D4DJChartRenderer.X_OFFSET;
  var sy =
    this.heightPerSec * (this.totalDur - (start.Time - this.startTime)) +
    this.offsetHeight -
    heightOffset;
  var ey =
    this.heightPerSec * (this.totalDur - (end.Time - this.startTime)) +
    this.offsetHeight;
  this.ctx.beginPath();
  this.ctx.moveTo(sx - width / 2, sy);
  this.ctx.lineTo(ex - width / 2, ey);
  this.ctx.lineTo(ex + width / 2, ey);
  this.ctx.lineTo(sx + width / 2, sy);
  this.ctx.lineTo(sx - width / 2, sy);
  this.ctx.fillStyle = color;
  this.ctx.fill();
};
D4DJChartRenderer.prototype.drawFlickArrow = function (note) {
  var x =
    this.getLaneWidth() * (note.LaneId + 0.5) + D4DJChartRenderer.X_OFFSET;
  var y =
    this.heightPerSec * (this.totalDur - (note.Time - this.startTime)) +
    this.offsetHeight -
    D4DJChartRenderer.NOTE_HEIGHT;
  var x1 =
    x +
    (Math.abs(note.Direction) - 1.5) *
      (note.Direction > 0 ? 1 : -1) *
      this.getLaneWidth();
  var x2 =
    x +
    (Math.abs(note.Direction) - 1) *
      (note.Direction > 0 ? 1 : -1) *
      this.getLaneWidth();
  var y1 = y + D4DJChartRenderer.NOTE_HEIGHT / 2;
  var y2 = y - D4DJChartRenderer.NOTE_HEIGHT / 2;
  this.ctx.beginPath();
  this.ctx.moveTo(x, y2);
  this.ctx.lineTo(x, y1);
  this.ctx.lineTo(x1, y1);
  this.ctx.lineTo(x2, y);
  this.ctx.lineTo(x1, y2);
  this.ctx.lineTo(x, y2);
  this.ctx.fillStyle = "rgba(245, 93, 159, 0.8)";
  this.ctx.fill();
};
/**
 * renderChart
 */
D4DJChartRenderer.prototype.renderChart = function (chart) {
  var _this = this;
  this.startTime = chart.BarLineList[0];
  this.endTime = chart.BarLineList[chart.BarLineList.length - 1];
  this.totalDur = this.endTime - this.startTime;
  this.heightPerSec =
    this.targetCanvas.height /
    (chart.BarLineList[1] - chart.BarLineList[0]) /
    4;
  this.width = D4DJChartRenderer.TOTAL_WIDTH;
  this.height = this.heightPerSec * (this.endTime - this.startTime);
  this.offsetHeight =
    this.targetCanvas.height - (this.height % this.targetCanvas.height);
  this.height += this.offsetHeight;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.clear();
  this.drawLanes();
  this.drawBarLines(chart.BarLineList);
  var longs = [];
  var lasers = [];
  var stops = [];
  // Collect long note data
  chart.NoteDataList.forEach(function (note, idx) {
    if (note.NextId != 0) {
      switch (note.Type) {
        case NoteType.LongMiddle:
        case NoteType.LongStart:
          longs.push([note, chart.NoteDataList[note.NextId]]);
          break;
        case NoteType.Slide:
          lasers.push([note, chart.NoteDataList[note.NextId]]);
          break;
        case NoteType.StopStart:
          stops.push([note, chart.NoteDataList[note.NextId]]);
      }
    }
  });
  // Draw lasers
  lasers.forEach(function (pair) {
    _this.drawLine(
      pair[0],
      pair[1],
      _this.getLaneWidth() * 0.1,
      "rgba(245, 93, 159, 0.8)",
      D4DJChartRenderer.NOTE_HEIGHT * 2
    );
  });
  // Draw holds
  longs.forEach(function (pair) {
    _this.drawLine(
      pair[0],
      pair[1],
      _this.getLaneWidth() * 0.5,
      "rgba(220, 220, 0, 0.8)",
      D4DJChartRenderer.NOTE_HEIGHT
    );
  });
  // Draw stop
  stops.forEach(function (pair) {
    _this.drawLine(
      pair[0],
      pair[1],
      _this.getLaneWidth() * 0.5,
      "rgba(220, 0, 0, 0.8)",
      D4DJChartRenderer.NOTE_HEIGHT
    );
  });
  // Draw notes
  chart.NoteDataList.forEach(function (note) {
    switch (note.Type) {
      case NoteType.Tap1:
      case NoteType.Tap2:
        _this.drawTapNote(note);
        break;
      case NoteType.ScratchLeft:
      case NoteType.ScratchRight:
        _this.drawScratchNote(note);
        break;
      case NoteType.LongEnd:
      case NoteType.LongMiddle:
      case NoteType.LongStart:
        _this.drawHoldNote(note);
        break;
      case NoteType.StopStart:
      case NoteType.StopEnd:
        _this.drawStopNote(note);
        break;
      case NoteType.Slide:
        if (note.Direction != 0) _this.drawFlickArrow(note);
        _this.drawLaserNodes(note);
        break;
    }
  });
  var clips = this.canvas.height / this.targetCanvas.height;
  this.targetCanvas.width = D4DJChartRenderer.TOTAL_WIDTH * clips;
  this.targetCtx.fillStyle = "rgba(0,0,0,0)";
  this.targetCtx.fillRect(
    0,
    0,
    this.targetCanvas.width,
    this.targetCanvas.height
  );
  for (var i = 0; i < clips; i++) {
    this.targetCtx.drawImage(
      this.canvas,
      0,
      this.height - (i + 1) * this.targetCanvas.height,
      D4DJChartRenderer.TOTAL_WIDTH,
      this.targetCanvas.height,
      i * D4DJChartRenderer.TOTAL_WIDTH,
      0,
      D4DJChartRenderer.TOTAL_WIDTH,
      this.targetCanvas.height
    );
  }
};
D4DJChartRenderer.TOTAL_WIDTH = 200;
D4DJChartRenderer.LANE_WIDTH = 0.7;
D4DJChartRenderer.X_OFFSET =
  (D4DJChartRenderer.TOTAL_WIDTH -
    D4DJChartRenderer.TOTAL_WIDTH * D4DJChartRenderer.LANE_WIDTH) /
  2;
D4DJChartRenderer.NOTE_HEIGHT = 5;
