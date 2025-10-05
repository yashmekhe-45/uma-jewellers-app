export const SHOP = {
  name: 'Uma Jewellers',
  city: 'Beed',
  state: 'Maharashtra',
  addressLine: 'Uma Jewellers, Sarafa street, Dhondipura, Beed, Maharashtra 431122',
  hours: '10:00 AM – 9:00 PM',
  weeklyOff: 'Wednesday',
  whatsappNumbers: ['9822670240', '9527506767', '9822874767']
};

export function whatsappLinks(prefill: string = 'Hello Uma Jewellers, I have an inquiry.') {
  return SHOP.whatsappNumbers.map((n) => {
    const num = n.replace(/\D/g, '');
    const text = encodeURIComponent(prefill);
    return `https://wa.me/91${num}?text=${text}`;
  });
}