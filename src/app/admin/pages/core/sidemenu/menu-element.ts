export const menus = [
  {
    'name': ' Dashboard',
    'icon': 'dashboard',
    'link': 'dashboard',
    'open': false,
    'url': 'https://img.icons8.com/ios/50/000000/speed.png',
  },
  {
    'name': 'Venue Profile',
    'icon': 'person_outline',
    'link': 'venue-profile/show',
    'open': false,
    'url': 'https://img.icons8.com/ios/50/000000/speed.png',
  },
  {
    'name': 'Content Management',
    'icon': 'work_outline',
    'link': false,
    'open': false,
    'url': 'https://img.icons8.com/ios/24/000000/settings.png',
    'sub': [
      {
        'name': 'Gallery',
        'link': 'gallery/show',
        'open': false,
      },
      {
        'name': 'Map Search Filters',
        'link': 'search/show',
        'open': false,
      },
      {
        'name': 'Overview',
        'link': 'content-management/about-us/show',
        'open': false,
      },
      {
        'name': 'Location',
        'link': 'contact-us/show',
        'open': false,
      },
      {
        'name': 'Highlights',
        'link': 'amenities/show',
        'open': false,
      },
      {
        'name': 'Facilities  ',
        'open': false,
        'link': 'facilities/show',
      },
      {
        'name': 'Decodes',
        'link': 'decode/show',
        'open': false,
      },
      {
        'name': 'Hall Information',
        'link': 'hall-details/show',
        'open': false,
      }]
  },
  {
    'name': 'Tariff Management',
    'icon': 'attach_money',
    'link': false,
    'open': false,
    'url': 'https://img.icons8.com/ios/24/000000/settings.png',
    'sub': [
      {
      
        'name': 'Map Event',
        'link': 'events/show',
        'open': false,
      },
      {
        'name': 'Map Session',
        'link': 'duration/show',
        'open': false,
      },
      {
        'name': 'Map Food Type',
        'open': false,
        'link': 'food-type/show'
      },
      {
        'name': 'Maintain Price',
        'open': false,
        'link': 'cost-map/show',
      },
      {
        'name': 'Maintain Reservation Price',
        'open': false,
        'link': 'reservation/show',
      },
      {
        'name': 'Maintain Hourly Tariff',
        'open': false,
        'link': 'hourly-tariff/show',
      },
      {
        'name': 'Maintain Buffet Count',
        'open': false,
        'link': 'pax-count/show',
      },
      {
        'name': 'Maintain Discount',
        'open': false,
        'link': 'discount/show',
      }]
    },
    {
      'name': 'Buffet Management',
      'icon': 'local_dining',
      'link': false,
      'open': false,
      'url': 'https://img.icons8.com/ios/24/000000/settings.png',
      'sub': [  
        
        {
          'name': 'Maintain Buffet Master',
          'open': false,
          'link': 'buffet-master/show',
        },
        {
          'name': 'Maintain Buffet Category',
          'open': false,
          'link': 'buffet-category/show',
        },
        {
          'name': 'Maintain Buffet Items',
          'open': false,
          'link': 'buffet-items/show',
        }
    ]
  },
  {
    'name': 'Booking',
    'icon': 'aspect_ratio',
    'link': false,
    'open': false,
    'url': 'https://img.icons8.com/ios/24/000000/settings.png',
    'target': '_self',
    'sub': [
      {
        'name': 'Check Availability',
        'link': 'booking/check-availability',
        'open': false,
        'target': '_self'
      },
      {
        'name': 'Quick Block',
        'link': '/venue-admin/offline/quick-block',
        'open': true,
        'target': '_blank'
      },
      {
        'name': 'Book/Reserve',
        'link': '/venue-admin/offline/book-reserve',
        'open': true,
        'target': '_blank'
      },
      {
        'name': 'Online-Booking',
        'open': false,
        'link': 'update-transaction/online-bookings',
      },
      {
        'name': 'Online-Reservation',
        'open': false,
        'link': 'update-transaction/online-reservations',
      },
      {
        'name': 'Offline-Booking',
        'open': false,
        'link': 'update-transaction/offline-transaction',
      }
    ]
  },
  {
    'name': 'Reports',
    'icon': 'report',
    'link': false,
    'open': false,
    'url': 'https://img.icons8.com/ios/24/000000/settings.png',
    'sub': [
      {
        'name': 'My Report',
        'open': false,
        'link': 'my-report',
      },
      {
        'name': 'Venue Details',
        'open': false,
        'link': 'offers/show',
      },
      {
        'name': 'Payments',
        'open': false,
        'link': 'offers/show',
      }
    ]
  },
  {
    'name': 'Add-Ons',
    'icon': 'report',
    'link': false,
    'open': false,
    'url': 'https://img.icons8.com/ios/24/000000/settings.png',
    'sub': [
      {
        'name': 'Help',
        'open': false,
        'link': 'decode/show',
      },
      {
        'name': 'Customer Support',
        'open': false,
        'link': 'offers/show',
      },
      {
        'name': 'Request for Training',
        'open': false,
        'link': 'offers/show',
      },
      {
        'name': 'Documents',
        'open': false,
        'link': 'offers/show',
      }
    ]
  }

];
