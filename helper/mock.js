import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, {delayResponse: 500});

mock.onGet('https://api.example.com/login').reply(200, {
  message: 'Login successful',
   token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
     fullname: "Dipak",
      email: "Dipak@mailinator.com",
      phone: "9876543210",
});

mock.onPost('https://api.example.com/register').reply(config => {
  const requestData = JSON.parse(config.data);
  return [
    200,
    {
      message: 'Registered successfully',
      fullname: requestData.fullname,
      email: requestData.email,
      phone: requestData.phone,
      token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  ];
});

mock.onPost('https://api.example.com/payment').reply(config => {
  return [
    200,
    {
      message: 'Payment successful',
    },
  ];
});

mock.onPost('https://api.example.com/placeOrder').reply(config => {
  return [
    200,
    {
      message: 'Order placed successful',
    },
  ];
});

export default mock;
