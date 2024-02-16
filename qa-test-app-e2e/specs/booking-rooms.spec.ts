import { expect } from '@playwright/test';
import { test } from '../fixtures/test';

test.describe('Sample test suite for Network Intercept ', () => {

  test('Book a room with Safety is highlighted', async ({ page, bookingRoomPage, networkInterceptor }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Let me hack!' }).click();
    
    await bookingRoomPage.fillInBookingDetails({
      specialFeature: 'Safe',
      firstname: 'Nicholas',
      lastname: 'Perera',
      email: 'saman@gmail.com',
      phone: '1234567898086',
    });

    await bookingRoomPage.submit();
  });

  test('Book a room with Free cot avilable', async ({ page, bookingRoomPage, networkInterceptor }) => {

    /**
     * Intercept the response of rooms data
     */
    var filePath = '../test-data/json/rooms.json'
    var urlToIntercept = 'https://automationintesting.online/room/'; 
    networkInterceptor.InterceptResponseBody(urlToIntercept,filePath);
 
    await page.goto('');
    await page.getByRole('button', { name: 'Let me hack!' }).click();
    
    await bookingRoomPage.fillInBookingDetails({
      specialFeature: 'Free cot',
      firstname: 'Nicholas',
      lastname: 'Perera',
      email: 'saman@gmail.com',
      phone: '1234567898086',
    });
    
    /**
     * Intercept the booking request
     */
    var filePath = '../test-data/json/bookingSuccess.json'
    var urlToIntercept = 'https://automationintesting.online/booking/'; 
    await networkInterceptor.InterceptRequest(urlToIntercept,filePath);

    await bookingRoomPage.submit();
  });

});