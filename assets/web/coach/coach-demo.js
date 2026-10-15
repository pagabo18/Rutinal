/* Rutinal Coach — local prototype UI. No medical data or server sync. */
(function(){
'use strict';
const core=window.RutinalPlanCore;
const STORAGE='rutinal_coach_prototype_v1';
if(!core)return;
const $=id=>document.getElementById(id);
const read=()=>{try{return JSON.parse(localStorage.getItem(STORAGE))||{plans:[],assignments:[]};}catch{return {plans:[],assignments:[]};}};
const state=read();
const save=()=>localStorage.setItem(STORAGE,JSON.stringify(state));
const uid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'id-'+Date.now()+'-'+Math.random().toString(36).slice(2);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=p=>p.type==='workout'?'Entrenamiento':'Nutrición';
function render(){
 const list=$('coach-plan-list');
 if(!list)return;
 list.innerHTML=state.plans.length?state.plans.slice().reverse().map(p=>'<article class="coach-card"><strong>'+esc(p.title)+'</strong><small>'+fmt(p)+' · v'+p.version+' · '+p.days.length+' días</small><button type="button" data-plan="'+esc(p.id)+'">Asignar localmente</button></article>').join(''):'<p class="coach-muted">Aún no hay planes publicados.</p>';
 $('coach-assignment-list').innerHTML=state.assignments.length?state.assignments.slice().reverse().map(a=>'<p class="coach-muted">Atleta '+esc(a.athleteId)+' · Plan '+esc(a.planId)+' · versión '+a.version+'</p>').join(''):'<p class="coach-muted">No hay asignaciones locales.</p>';
 list.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>{
   const athlete=$('coach-athlete').value.trim();
   if(!athlete){status('Introduce el identificador del atleta de prueba.',true);return;}
   const p=state.plans.find(x=>x.id===b.dataset.plan);
   state.assignments.push(core.assignment(p,athlete,new Date().toISOString()));save();render();status('Asignación local guardada. No se envió a ningún atleta.');
 }));
}
function status(msg,error){const n=$('coach-status');n.textContent=msg;n.setAttribute('role',error?'alert':'status');}
$('coach-plan-form').addEventListener('submit',e=>{
 e.preventDefault();
 try{
  const type=$('coach-type').value,title=$('coach-title').value.trim();
  const raw=$('coach-items').value.trim().split('\n').map(x=>x.trim()).filter(Boolean);
  if(!raw.length)throw Error('Agrega al menos un ejercicio o alimento.');
  const draft=core.createDraft(type,title,[{items:raw.map(name=>({name}))}]);
  const prev=state.plans.filter(x=>x.planId===$('coach-plan-id').value&&x.type===type).sort((a,b)=>b.version-a.version)[0];
  const published=core.publish(draft,prev,{id:uid(),planId:prev?prev.planId:uid(),publishedAt:new Date().toISOString()});
  state.plans.push(published);save();render();status('Plan publicado localmente como versión '+published.version+'.');
  $('coach-plan-form').reset();
 }catch(err){status(err.message,true);}
});
$('coach-plan-id').addEventListener('change',()=>{const p=state.plans.find(x=>x.planId===$('coach-plan-id').value);if(p){$('coach-type').value=p.type;}});
function options(){const ids=[...new Set(state.plans.map(x=>x.planId))];$('coach-plan-id').innerHTML='<option value="">Nuevo plan</option>'+ids.map(id=>'<option value="'+esc(id)+'">'+esc(state.plans.find(p=>p.planId===id).title)+'</option>').join('');}
const oldRender=render;render=function(){options();oldRender();};
render();
})();
