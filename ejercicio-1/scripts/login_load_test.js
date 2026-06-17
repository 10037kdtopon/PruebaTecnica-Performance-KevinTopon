import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const BASE_URL = __ENV.BASE_URL || 'https://fakestoreapi.com';
const TARGET_TPS = Number(__ENV.TARGET_TPS || 20);
const TEST_DURATION = __ENV.TEST_DURATION || '2m';

const users = new SharedArray('users', function () {
  const parsed = papaparse.parse(open('../data/users.csv'), { header: true });
  return parsed.data.filter((row) => row.user && row.passwd);
});

export const options = {
  scenarios: {
    login_load: {
      executor: 'constant-arrival-rate',
      rate: TARGET_TPS,
      timeUnit: '1s',
      duration: TEST_DURATION,
      preAllocatedVUs: 30,
      maxVUs: 80,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1500', 'max<1500'],
    http_req_failed: ['rate<0.03'],
    checks: ['rate>0.97'],
  },
};

export default function () {
  const credentials = users[__VU % users.length];
  const payload = JSON.stringify({
    username: credentials.user,
    password: credentials.passwd,
  });

  const response = http.post(`${BASE_URL}/auth/login`, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: '60s',
    tags: { name: 'POST /auth/login' },
  });

  check(response, {
    'status is 201 (login OK)': (r) => r.status === 201,
    'response time <= 1500ms': (r) => r.timings.duration <= 1500,
    'token present in body': (r) => {
      try {
        return Boolean(r.json('token'));
      } catch (error) {
        return false;
      }
    },
  });
}

export function handleSummary(data) {
  return {
    '../reports/summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: false }),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '';
  const lines = [];
  const metrics = data.metrics;

  lines.push('RESUMEN DE PRUEBA DE CARGA - LOGIN FAKE STORE API');
  lines.push('='.repeat(60));
  lines.push(`Escenario: ${TARGET_TPS} TPS durante ${TEST_DURATION}`);
  lines.push(`Endpoint: ${BASE_URL}/auth/login`);
  lines.push(`Usuarios parametrizados desde CSV: ${users.length}`);
  lines.push('');

  if (metrics.http_reqs) {
    const totalRequests = metrics.http_reqs.values.count;
    const tps = metrics.http_reqs.values.rate;
    lines.push('THROUGHPUT');
    lines.push(`${indent}Total peticiones: ${totalRequests}`);
    lines.push(`${indent}TPS promedio: ${tps.toFixed(2)}`);
    lines.push('');
  }

  if (metrics.http_req_duration) {
    const duration = metrics.http_req_duration.values;
    lines.push('TIEMPOS DE RESPUESTA (http_req_duration)');
    lines.push(`${indent}Promedio: ${duration.avg.toFixed(2)} ms`);
    lines.push(`${indent}Minimo: ${duration.min.toFixed(2)} ms`);
    lines.push(`${indent}Mediana (p50): ${duration.med.toFixed(2)} ms`);
    lines.push(`${indent}p90: ${duration['p(90)'].toFixed(2)} ms`);
    lines.push(`${indent}p95: ${duration['p(95)'].toFixed(2)} ms`);
    lines.push(`${indent}Maximo: ${duration.max.toFixed(2)} ms`);
    lines.push('');
  }

  if (metrics.http_req_failed) {
    const failedRate = metrics.http_req_failed.values.rate * 100;
    lines.push('TASA DE ERROR');
    lines.push(`${indent}Fallidas: ${(failedRate).toFixed(2)}%`);
    lines.push(`${indent}SLA aceptable: < 3.00%`);
    lines.push('');
  }

  if (metrics.checks) {
    const checksRate = metrics.checks.values.rate * 100;
    lines.push('VALIDACIONES (checks)');
    lines.push(`${indent}Checks exitosos: ${checksRate.toFixed(2)}%`);
    lines.push('');
  }

  lines.push('UMBRALES SLA CONFIGURADOS');
  lines.push(`${indent}- Tiempo de respuesta maximo: 1500 ms (p95 y max)`);
  lines.push(`${indent}- Tasa de error maxima: 3%`);
  lines.push(`${indent}- Throughput minimo: ${TARGET_TPS} TPS`);
  lines.push('');

  if (data.root_group && data.root_group.checks) {
    lines.push('DETALLE DE CHECKS');
    for (const checkItem of data.root_group.checks) {
      const passRate = ((checkItem.passes / (checkItem.passes + checkItem.fails)) * 100).toFixed(2);
      lines.push(`${indent}[${checkItem.passes}/${checkItem.passes + checkItem.fails}] ${checkItem.name} (${passRate}%)`);
    }
    lines.push('');
  }

  lines.push('RESULTADO GLOBAL');
  const thresholds = data.thresholds || {};
  for (const [name, result] of Object.entries(thresholds)) {
    lines.push(`${indent}${result.ok ? 'PASS' : 'FAIL'} - ${name}`);
  }

  return `${lines.join('\n')}\n`;
}
