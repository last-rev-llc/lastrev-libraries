export type Status = 'Up' | 'Down' | 'Partial' | 'Unknown';

export type StatusNode = {
  id: string;
  name: string;
  status: Status;
  message: string;
  timestamp: number;
  services?: StatusNode[];
};

export type FixStatus = 'Attempting to fix' | 'Nothing to fix' | 'Unrecoverable';
