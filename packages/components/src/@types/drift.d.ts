export interface DriftMessage {
  id?: number;
  orgId?: number;
  body: string;
  author?: DriftMessageAuthor;
  type: 'chat' | 'private_note';
  conversationId?: number;
  createdAt?: number;
  buttons?: (DriftButton | null)[];
  context?: DriftMessageContext;
  attributes?: Object; // additional information (see below)
}

export interface DriftMessageNew {
  body: string;
  type: 'chat' | 'private_note';
  buttons?: (DriftButton | null)[];
  attributes?: Object;
}

export interface DriftButton {
  label: string;
  value: string;
  type?: 'reply';
  style?: 'primary' | 'danger';
  reaction?: DriftButtonReaction;
}

export interface DriftButtonReaction {
  type: 'replace' | 'delete';
  message: string;
}

export interface DriftMessageContext {
  ip: string;
  userAgent: string;
}

export interface DriftMessageAuthor {
  type: 'contact' | 'user';
  id: number;
  bot: boolean;
}
