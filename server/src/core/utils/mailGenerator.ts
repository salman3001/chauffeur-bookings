import Mailgen from 'mailgen';

export const mailGenerator = new Mailgen({
  product: {
    name: 'Chauffeur Bookings',
    link: 'http://localhost:3000/',
    copyright: `Copyright © ${new Date(Date.now()).getFullYear()} Chauffuer Booking. All rights reserved.`,
  },
  theme: 'default',
});
