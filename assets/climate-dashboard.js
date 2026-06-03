/**
 * climate-dashboard.js
 * Lightweight ECharts rendering for the climate dashboard section.
 * Safe for Shopify section reloads + theme editor.
 */
(function () {
  'use strict';

  var ROOT_ID = 'upcube-climate-embed';

  var DATA = {
    arcticMin: {
      years: [1979, 1985, 1990, 1995, 2000, 2005, 2010, 2012, 2015, 2020, 2024],
      millionKm2: [7.5, 7.2, 6.9, 6.4, 6.1, 5.7, 4.8, 4.4, 4.7, 4.5, 4.3]
    },
    seaIcePct: {
      years: [1979, 1985, 1990, 1995, 2000, 2005, 2010, 2012, 2015, 2020, 2024],
      percentDiff: [0.0, -2.0, -4.5, -7.0, -10.0, -15.0, -28.0, -34.0, -30.0, -28.0, -26.0]
    },
    co2Atm: {
      years: [1958, 1965, 1975, 1985, 1995, 2005, 2015, 2024],
      ppm: [315.7, 320.0, 331.0, 346.0, 361.0, 379.8, 400.8, 422.0]
    },
    co2DeepTime: {
      yearsBeforePresent: [800000, 600000, 400000, 200000, 100000, 50000, 20000, 10000, 0],
      ppm: [190, 200, 210, 220, 240, 260, 280, 300, 420]
    },
    glacier: {
      years: [1945, 1955, 1965, 1975, 1985, 1995, 2005, 2015, 2024],
      cumulative: [0, -2, -6, -12, -20, -32, -50, -72, -90]
    }
  };

  function byId(id, root) {
    return (root || document).getElementById(id);
  }

  function ensureECharts() {
    return new Promise(function (resolve, reject) {
      if (window.echarts) return resolve(window.echarts);
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';
      s.onload = function () { resolve(window.echarts); };
      s.onerror = function () { reject(new Error('Failed to load ECharts')); };
      document.head.appendChild(s);
    });
  }

  function renderLine(echarts, el, x, y, yLabel, unit) {
    if (!el) return;
    var chart = echarts.init(el);
    chart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 50, right: 20, top: 20, bottom: 40 },
      xAxis: { type: 'category', data: x },
      yAxis: { type: 'value', name: yLabel },
      series: [{ type: 'line', data: y, smooth: true }]
    });
    return chart;
  }

  function init(root) {
    ensureECharts().then(function (echarts) {
      renderLine(echarts, byId('chartSeaIceMin', root), DATA.arcticMin.years, DATA.arcticMin.millionKm2, 'Million km²');
      renderLine(echarts, byId('chartSeaIcePct', root), DATA.seaIcePct.years, DATA.seaIcePct.percentDiff, '% vs avg');
      renderLine(echarts, byId('chartCO2Atm', root), DATA.co2Atm.years, DATA.co2Atm.ppm, 'ppm');
      renderLine(echarts, byId('chartCO2Deep', root), DATA.co2DeepTime.yearsBeforePresent, DATA.co2DeepTime.ppm, 'ppm');
      renderLine(echarts, byId('chartGlacier', root), DATA.glacier.years, DATA.glacier.cumulative, 'm w.e.');
    });
  }

  function boot() {
    var root = document.getElementById(ROOT_ID);
    if (!root) return;
    init(root);
  }

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('shopify:section:load', function (e) {
    var root = e.target.querySelector('#' + ROOT_ID);
    if (root) init(root);
  });
})();



