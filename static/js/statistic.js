//  // Data statistik dari Flask
//         const stats = {{ stats | tojson }};
        
//         const ctx = document.getElementById('stressChart').getContext('2d');
//         const stressChart = new Chart(ctx, {
//             type: 'doughnut',  // Bisa juga 'bar' atau 'pie'
//             data: {
//                 labels: ['Zona Tenang', 'Zona Stres Ringan', 'Zona Tanda Awal'],
//                 datasets: [{
//                     label: 'Distribusi Zona Stres',
//                     data: [stats["Zona Tenang"], stats["Zona Stres Ringan"], stats["Zona Tanda Awal"]],
//                     backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
//                     borderColor: ['#4CAF50', '#FFC107', '#F44336'],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'top',
//                     }
//                 }
//             }
//         });