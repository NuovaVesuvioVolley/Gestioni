const $ = id => document.getElementById(id);

function getManagerToken() {
  return sessionStorage.getItem('vv_manager_token') || '';
}

function clearManagerToken() {
  sessionStorage.removeItem('vv_manager_token');
}

function show(logged) {
  $('loginCard').classList.toggle('d-none', logged);
  $('dashboard').classList.toggle('d-none', !logged);
}

async function login() {
  const id = $('loginId').value.trim();
  const password = $('loginPassword').value;

  try {
    const res = await fetch(
      'https://vesuvio-volley-api.ilterribilestefano.workers.dev/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'ID o password non corretti.');
    }

    sessionStorage.setItem('vv_manager_token', data.token);
    show(true);

  } catch (err) {
    $('loginMsg').innerHTML =
      '<span class="text-danger">ID o password non corretti.</span>';
  }
}

function init() {
  show(!!getManagerToken());

  $('login').onclick = login;

  $('logout').onclick = () => {
    clearManagerToken();
    show(false);
  };
}

init();
