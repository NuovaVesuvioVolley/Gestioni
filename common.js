function getManagerToken(){return sessionStorage.getItem('vv_manager_token')||'';}
function clearManagerToken(){sessionStorage.removeItem('vv_manager_token');}
async function apiFetch(path,options={}){const headers={'Content-Type':'application/json',...(options.headers||{})};const token=getManagerToken();if(token)headers.Authorization=`Bearer ${token}`;const res=await fetch(`${VV_API_BASE}${path}`,{...options,headers});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||`Errore HTTP ${res.status}`);return data;}
const $=id=>document.getElementById(id);
function show(session){$('loginCard').classList.toggle('d-none',!!session);$('dashboard').classList.toggle('d-none',!session);}
async function init(){show(!!getManagerToken());$('login').onclick=login;$('logout').onclick=()=>{clearManagerToken();show(false);};}
async function login(){const id=$('loginId').value.trim(),password=$('loginPassword').value;try{const data=await apiFetch('/api/login',{method:'POST',body:JSON.stringify({id,password})});sessionStorage.setItem('vv_manager_token',data.token);$('loginPassword').value='';$('loginMsg').innerHTML='';show(true);}catch(e){$('loginMsg').innerHTML='<span class="text-danger">ID o password non corretti.</span>';}}
init();
