//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


/**
 * Represents a CAN message.
 */
declare class ThriftCanMessage {
  Id: number;
  IsExtendedMessage: boolean;
  IsRemoteTransmissionRequest: boolean;
  Ticks: number;
  Content: string;

  constructor(args?: { Id: number; IsExtendedMessage: boolean; IsRemoteTransmissionRequest: boolean; Ticks: number; Content: string; });
}
