export interface PhotoModel {
  uri: string;
  group_name: string;
  fileSize: number | string;
  filename: string;
  height: number;
  width: number;
  timestamp: number;
  type: string;
  isSelected?: boolean;
}
