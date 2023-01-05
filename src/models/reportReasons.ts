export interface reportReasonProps {
  reason: string;
  isSelected: boolean;
}

export const reportReasons: reportReasonProps[] = [
  {
    reason: 'Violence',
    isSelected: false,
  },
  {
    reason: 'Pornography',
    isSelected: false,
  },
  {
    reason: 'Offensive',
    isSelected: false,
  },
  {
    reason: 'Nudity',
    isSelected: false,
  },
  {
    reason: 'Intellectual Property violation',
    isSelected: false,
  },
  {
    reason: 'Hate speech or Racism',
    isSelected: false,
  },
  {
    reason: 'Threats of harm',
    isSelected: false,
  },
  {
    reason: 'False information',
    isSelected: false,
  },
  {
    reason: 'Scam or fraud',
    isSelected: false,
  },
];
