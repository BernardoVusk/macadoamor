export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  photo?: string;
  timestamp: string;
  isSelf: boolean;
  status?: 'sent' | 'received' | 'read';
}

export interface TestimonialChat {
  studentName: string;
  studentStatus: string;
  avatarUrl: string;
  messages: ChatMessage[];
}

export interface GuideModule {
  id: string;
  title: string;
  iconName: 'apple' | 'candy' | 'shield' | 'trending' | 'box';
  description: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'credit_card';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
}
