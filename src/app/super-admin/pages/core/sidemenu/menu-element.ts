export const menus = [
  {
    'name': 'Dashboard',
    'icon': 'dashboard',
    'link': 'dashboard',
    'open': false,
  },
  {
    'name': 'Master',
    'icon': 'work',
    'link': false,
    'open': false,
    'sub': [
      {
        'name': 'Venue Category',
        'icon': 'location_city',
        'link': 'venue-category/show',
        'open': false,
      },
      {
        'name': 'Search Category',
        'icon': 'search',
        'link': 'search-category/show',
        'open': false,
      },
      {
        'name': 'Help Management  ',
        'icon': 'help_outline',
        'open': false,
        'link': 'help-management/show',
      },
      {
        'name': ' Facilities Management',
        'icon': 'bar_chart',
        'link': 'facilities-category/show',
        'open': false,
      }
    ]
  },
  {
    'name': 'Transaction',
    'icon': 'assessment',
    'link': false,
    'open': false,
    'sub': [
      {
        'name': 'Venue Details',
        'icon': 'location_city',
        'link': 'venue-details/show',
        'open': false,
      },
      {
        'name': 'Search Details',
        'icon': 'search',
        'link': 'search-details/show',
        'open': false,
      },
      {
        'name': 'Muhurtham Dates',
        'open': false,
        'link': 'muhurtham-dates/create',
        'icon': 'grade',
      },
      {
        'name': 'User Admin',
        'icon': 'account_circle',
        'open': false,
        'link': 'user-admin/show',
      }
    ]
  },
  {
    'name': 'Tools',
    'icon': 'settings',
    'link': false,
    'open': false,
    'sub': [
      {
        'name': 'Process Reviews',
        'icon': 'mode_edit',
        'open': false,
        'link': 'process-reviews/show',
      },
      {
        'name': ' Purge Data',
        'icon': 'data_usage',
        'open': false,
        'link': 'purge-data',
      },
      {
        'name': 'Purge Unapproved Entry',
        'icon': 'done_all',
        'open': false,
        'link': 'purge-unapproved-entry',
      },
      {
        'name': 'Purge Unpaid Entry',
        'icon': 'money_off',
        'open': false,
        'link': 'purge-unpaid-entry',
      },
      {
        'name': 'Remove Test Bookings',
        'icon': 'remove_from_queue',
        'open': false,
        'link': 'remove-test-bookings/show',
      },
      {
        'name': 'Send Reminder',
        'icon': 'send',
        'open': false,
        'link': 'venue-admin-reminder/show'
      }
    ]
  },

  {
    'name': 'Report',
    'icon': 'report',
    'link': false,
    'open': false,
    'sub': [
      {
        'name': 'Business Report',
        'icon': 'map',
        'open': false,
        'link': 'report/show',
      },
      {
        'name': ' Reconcile Report',
        'icon': 'map',
        'open': false,
        'link': 'reconcile-report/show',
      },

    ]
  }
];
