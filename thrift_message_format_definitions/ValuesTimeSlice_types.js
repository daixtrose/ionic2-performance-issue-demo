//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
Value = module.exports.Value = function(args) {
  this.Double = null;
  this.Bool = null;
  this.Integer = null;
  this.Long = null;
  this.String = null;
  if (args) {
    if (args.Double !== undefined && args.Double !== null) {
      this.Double = args.Double;
    }
    if (args.Bool !== undefined && args.Bool !== null) {
      this.Bool = args.Bool;
    }
    if (args.Integer !== undefined && args.Integer !== null) {
      this.Integer = args.Integer;
    }
    if (args.Long !== undefined && args.Long !== null) {
      this.Long = args.Long;
    }
    if (args.String !== undefined && args.String !== null) {
      this.String = args.String;
    }
  }
};
Value.prototype = {};
Value.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.DOUBLE) {
        this.Double = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.BOOL) {
        this.Bool = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.Integer = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I64) {
        this.Long = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.String = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Value.prototype.write = function(output) {
  output.writeStructBegin('Value');
  if (this.Double !== null && this.Double !== undefined) {
    output.writeFieldBegin('Double', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.Double);
    output.writeFieldEnd();
  }
  if (this.Bool !== null && this.Bool !== undefined) {
    output.writeFieldBegin('Bool', Thrift.Type.BOOL, 2);
    output.writeBool(this.Bool);
    output.writeFieldEnd();
  }
  if (this.Integer !== null && this.Integer !== undefined) {
    output.writeFieldBegin('Integer', Thrift.Type.I32, 3);
    output.writeI32(this.Integer);
    output.writeFieldEnd();
  }
  if (this.Long !== null && this.Long !== undefined) {
    output.writeFieldBegin('Long', Thrift.Type.I64, 4);
    output.writeI64(this.Long);
    output.writeFieldEnd();
  }
  if (this.String !== null && this.String !== undefined) {
    output.writeFieldBegin('String', Thrift.Type.STRING, 5);
    output.writeString(this.String);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ValueWithUnit = module.exports.ValueWithUnit = function(args) {
  this.Value = null;
  this.Unit = null;
  if (args) {
    if (args.Value !== undefined && args.Value !== null) {
      this.Value = new ttypes.Value(args.Value);
    }
    if (args.Unit !== undefined && args.Unit !== null) {
      this.Unit = args.Unit;
    }
  }
};
ValueWithUnit.prototype = {};
ValueWithUnit.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.Value = new ttypes.Value();
        this.Value.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.Unit = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ValueWithUnit.prototype.write = function(output) {
  output.writeStructBegin('ValueWithUnit');
  if (this.Value !== null && this.Value !== undefined) {
    output.writeFieldBegin('Value', Thrift.Type.STRUCT, 1);
    this.Value.write(output);
    output.writeFieldEnd();
  }
  if (this.Unit !== null && this.Unit !== undefined) {
    output.writeFieldBegin('Unit', Thrift.Type.STRING, 2);
    output.writeString(this.Unit);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ValuesTimeSlice = module.exports.ValuesTimeSlice = function(args) {
  this.Ticks = null;
  this.Values = null;
  if (args) {
    if (args.Ticks !== undefined && args.Ticks !== null) {
      this.Ticks = args.Ticks;
    }
    if (args.Values !== undefined && args.Values !== null) {
      this.Values = Thrift.copyMap(args.Values, [ttypes.ValueWithUnit]);
    }
  }
};
ValuesTimeSlice.prototype = {};
ValuesTimeSlice.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.Ticks = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.MAP) {
        var _size0 = 0;
        var _rtmp34;
        this.Values = {};
        var _ktype1 = 0;
        var _vtype2 = 0;
        _rtmp34 = input.readMapBegin();
        _ktype1 = _rtmp34.ktype;
        _vtype2 = _rtmp34.vtype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var key6 = null;
          var val7 = null;
          key6 = input.readString();
          val7 = new ttypes.ValueWithUnit();
          val7.read(input);
          this.Values[key6] = val7;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ValuesTimeSlice.prototype.write = function(output) {
  output.writeStructBegin('ValuesTimeSlice');
  if (this.Ticks !== null && this.Ticks !== undefined) {
    output.writeFieldBegin('Ticks', Thrift.Type.I64, 1);
    output.writeI64(this.Ticks);
    output.writeFieldEnd();
  }
  if (this.Values !== null && this.Values !== undefined) {
    output.writeFieldBegin('Values', Thrift.Type.MAP, 2);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, Thrift.objectLength(this.Values));
    for (var kiter8 in this.Values)
    {
      if (this.Values.hasOwnProperty(kiter8))
      {
        var viter9 = this.Values[kiter8];
        output.writeString(kiter8);
        viter9.write(output);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

