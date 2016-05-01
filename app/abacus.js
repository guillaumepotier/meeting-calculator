module.exports = {
  // meetings/week, avg meeting duration, %unproductive
  global: [ 5.6, 1.07, 36 ],
  // meetings/week, avg meeting duration, %unproductive
  department: [
    [ 5.52, 1.16, 37.73 ], // HR
    [ 7.44, 1.76, 36.78 ], // Marketing
    [ 5.80, 0.95, 28.30 ], // Events and communications
    [ 7.71, 1.30, 23.04 ], // Legal
    [ 4.17, 0.93, 32.59 ], // Sales
    [ 6.98, 1.19, 39.75 ], // Technology, Digital and innovation
    [ 5.96, 1.15, 37.29 ], // IT
    [ 4.25, 0.81, 28.06 ], // Finance
    [ 5.19, 0.91, 40.62 ] // Operational service
  ],
  // meetings/week, avg meeting duration, %unproductive, % white collars, mean salary
  sector: [
    [ 8.75, 1.72, 48.75, 46, 19.56 ], // Publishers
    [ 8.14, 0.90, 67.29, 46, 16.03 ], // Aeronautics/Defence
    [ 6.95, 1.15, 29.54, 46, 21.16 ], // B2B Technology
    [ 6.52, 1.12, 28.00, 48, 26.27 ], // Banking and Insurance
    [ 6.33, 1.20, 34.34, 46, 21.16 ], // Consumer Technology
    [ 6.09, 1.01, 37.50, 46, 16.17 ], // Professional Services
    [ 5.57, 1.03, 50.07, 48, 20.99 ], // Energy
    [ 5.35, 1.11, 31.61, 48, 26.27 ], // Finance
    [ 5.18, 1.03, 30.35, 46, 15.66 ], // Travel and Leisure
    [ 5.05, 0.73, 47.24, 46, 15.70 ], // Industrial
    [ 5.00, 1.01, 28.81, 48, 15.28 ], // Food and Beverages
    [ 4.96, 0.96, 34.51, 48, 13.29 ], // Retail / eCommerce
    [ 4.93, 1.36, 31.67, 38, 15.34 ], // Construction
    [ 4.40, 1.30, 32.93, 45, 15.08 ], // Transportation
    [ 3.44, 0.98, 52.28, 48, 21.09 ] // Pharma and Biotech
  ],
  // meetings/week, avg meeting duration, %unproductive
  size: [
    [ 3.90, 0.95, 29 ], // 1 - 9 employees
    [ 4.32, 0.88, 39 ], // 10 - 49 employees
    [ 6.40, 1.06, 31 ], // 100 - 249 employees
    [ 5.99, 1.25, 38 ], // 250 - 500 employees
    [ 5.18, 1.22, 32 ], // 50 - 99 employees
    [ 6.24, 0.86, 43 ] // More than 500, please specify
  ],
  sizes: [9, 49, 99, 249, 500]
};
