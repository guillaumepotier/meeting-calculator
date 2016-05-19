module.exports = {
  en: {
    // meetings/week, avg meeting duration, %unproductive
    global: [ 5.6, 1.07, 36 ],
    // meetings/week, avg meeting duration, %unproductive, mean salary
    department: [
      [ 5.52, 1.16, 37.73, 16.71 ], // HR
      [ 7.44, 1.76, 36.78, 16.39 ], // Marketing
      [ 5.80, 0.95, 28.30, 15.75 ], // Events and communications
      [ 7.71, 1.30, 23.04, 22.54 ], // Legal
      [ 4.17, 0.93, 32.59, 16.75 ], // Sales
      [ 6.98, 1.19, 39.75, 21.93 ], // Technology, Digital and innovation
      [ 5.96, 1.15, 37.29, 21.93 ], // IT
      [ 4.25, 0.81, 28.06, 22.62 ], // Finance
      [ 5.19, 0.91, 40.62, 16.33 ] // Operational service
    ],
    departments: ['HR', 'Marketing', 'Events and communications', 'Legal', 'Sales', 'Technology, Digital and innovation', 'IT', 'Finance', 'Operational service'],
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
    sectors: ['Publishers', 'Aeronautics/Defense', 'B2B Technology', 'Banking and Insurance', 'Consumer Technology', 'Professional Services', 'Energy', 'Finance', 'Travel and Leisure', 'Industrial', 'Food and Beverages', 'Retail / eCommerce', 'Construction', 'Transportation', 'Pharma and Biotech'],
    // meetings/week, avg meeting duration, %unproductive
    size: [
      [ 3.90, 0.95, 29 ], // 1 - 9 employees
      [ 4.32, 0.88, 39 ], // 10 - 49 employees
      [ 6.40, 1.06, 31 ], // 50 - 249 employees
      [ 5.99, 1.25, 38 ], // 250 - 500 employees
      [ 5.18, 1.22, 32 ], // 50 - 99 employees
      [ 6.24, 0.86, 43 ] // More than 500, please specify
    ],
    sizes: [9, 49, 99, 249, 500]
  },
  fr: {
    // meetings/week, avg meeting duration, %unproductive
    global: [ 3.2, 1.33, 42 ],
    // meetings/week, avg meeting duration, %unproductive, mean salary
    department: [
      [ 4.3, 1.13, 40.0, 24.92 ], // Achats
      [ 3.6, 1.45, 38.3, 24.68 ], // Direction
      [ 2.9, 1.35, 41.3, 25.11 ], // Commercial
      [ 2.9, 1.38, 43.0, 25.31 ], // Finance
      [ 3.0, 1.37, 39.0, 23.70 ], // RH
      [ 4.4, 1.28, 42.8, 24.54 ], // Service Informatique
      [ 3.7, 1.35, 40.5, 24.92 ], // Service opérationnel
      [ 3.8, 1.17, 41.3, 24.93 ] // Communication, marketing
    ],
    departments: ['Achats', 'Direction', 'Commercial', 'Finance', 'RH', 'Service Informatique', 'Service opérationnel', ' Communication, marketing'],
    // meetings/week, avg meeting duration, %unproductive, % white collars, mean salary
    sector: [
      [ 2.6, 1.70, 42.8, 33.5, 24.19 ], // Industrie agroalimentaire
      [ 5.7, 1.17, 42.0, 37.5, 27.39 ], // Industrie lourde automobile, aéronautique, chimie, ...
      [ 4.3, 1.16, 43.0, 40.0, 28.34 ], // Industries des biens de consommation ou d'équipement
      [ 3.9, 1.73, 41.0, 40.2, 28.46 ], // Energie, environnement
      [ 1.9, 1.24, 41.5, 33.7, 23.65 ], // Batiment, travaux publics
      [ 3.4, 1.30, 41.0, 31.8, 26.19 ], // Transports, logistique
      [ 2.5, 1.31, 39.5, 31.9, 25.18 ], // Commerce, de gros/de détail
      [ 2.8, 1.46, 47.0, 40.0, 24.18 ], // Grande distribution, distribution spécialisée
      [ 2.1, 1.08, 43.3, 40.0, 22.53 ], // Hôtellerie, restauration, tourisme, loisirs
      [ 3.5, 1.29, 43.3, 42.2, 25.73 ], // Banque, assurance, services financiers
      [ 3.7, 1.24, 35.5, 30.9, 23.68 ], // Information et communication
      [ 2.7, 1.26, 42.5, 32.3, 23.31 ], // Immobilier
      [ 3.9, 1.08, 44.3, 29.3, 25.10 ], // Services NTIC (Informatique, Internet, multimédia, télecoms)
      [ 3.3, 1.22, 43.0, 40.0, 24.74 ], // Services aux entreprises (conseil, assistance, ...)
      [ 1.8, 1.68, 31.5, 40.0, 22.07 ], // Services aux particuliers (services à domicile, coiffeur, jardinage, formation, services sociaux, sports, ...)
      [ 3.0, 1.60, 43.0, 40.0, 23.34 ], // Administration publique
      [ 2.5, 1.39, 38.8, 40.0, 24.15 ] // Enseignement, santé humaine et action sociale
    ],
    sectors: ['Industrie agroalimentaire', 'Industrie lourde', 'Industries des biens de consommation', 'Energie, environnement', 'Batiment, travaux publics', 'Transports, logistique', 'Commerce, de gros/de détail', 'Grande distribution', 'Hôtellerie, restauration, tourisme, loisirs', 'Banque, assurance, services financiers', 'Information et communication', 'Immobilier', 'Informatique, Internet, multimédia, télecoms', 'Services aux entreprises', 'Services aux particuliers', 'Administration publique', 'Enseignement, santé humaine et action sociale'],
    // meetings/week, avg meeting duration, %unproductive
    size: [
      [ 1.4, 1.12, 38.5 ], // 1 - 9 employees
      [ 1.8, 0.98, 35.3 ], // 10 - 19 employees
      [ 2.2, 1.23, 38.3 ], // 20 - 49 employees
      [ 3.2, 1.22, 40.5 ], // 50 - 99 employees
      [ 3.2, 1.32, 40.3 ], // 100 - 249 employees
      [ 3.5, 1.43, 40.5 ], // 250 - 499 employees
      [ 3.5, 1.45, 42.8 ], // 500 - 1999 employees
      [ 3.3, 1.38, 43.5 ], // 2000 - 4999 employees
      [ 4.0, 1.43, 43.3 ] // More than 5000, please specify
    ],
    sizes: [9, 19, 49, 99, 249, 499, 1999, 4999]
  }
};
